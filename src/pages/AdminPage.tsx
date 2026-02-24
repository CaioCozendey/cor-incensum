import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Prayer, Novena, NovenaDay, PrayerCategory, CATEGORY_LABELS } from '../types';
import { generateSlug } from '../utils/helpers';
import RichEditor from '../components/ui/RichEditor';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'cor-incensum-admin-2024';

type AdminTab = 'prayers' | 'novenas';
type ModalMode = 'create-prayer' | 'edit-prayer' | 'create-novena' | 'edit-novena' | null;

interface PrayerForm {
  title: string; slug: string; subtitle: string;
  category: PrayerCategory; text: string; image_url: string; featured: boolean;
}

interface NovenaForm {
  title: string; slug: string; description: string; purpose: string; days: NovenaDay[];
}

const emptyPrayerForm: PrayerForm = {
  title: '', slug: '', subtitle: '', category: 'daily', text: '', image_url: '', featured: false,
};

const makeEmptyNovenaForm = (): NovenaForm => ({
  title: '', slug: '', description: '', purpose: '',
  days: Array.from({ length: 9 }, (_, i) => ({ day: i + 1, title: `${i + 1}º Dia`, text: '' })),
});

let lastSubmitTime = 0;
const COOLDOWN = 3000;

export default function AdminPage() {
  const { prayers, novenas, addPrayer, updatePrayer, deletePrayer, addNovena, updateNovena, deleteNovena } = useApp();

  // Auth
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('cor-admin-auth') === 'true');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authAttempts, setAuthAttempts] = useState(0);
  const [lockedOut, setLockedOut] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // UI
  const [tab, setTab] = useState<AdminTab>('prayers');
  const [modal, setModal] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [prayerForm, setPrayerForm] = useState<PrayerForm>(emptyPrayerForm);
  const [novenaForm, setNovenaForm] = useState<NovenaForm>(makeEmptyNovenaForm());
  const [activeDay, setActiveDay] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypotRef.current?.value) { setAuthError('Erro.'); return; }
    const now = Date.now();
    if (now - lastSubmitTime < COOLDOWN) { setAuthError('Aguarde um momento.'); return; }
    lastSubmitTime = now;
    if (lockedOut) { setAuthError('Conta bloqueada. Tente em alguns minutos.'); return; }
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('cor-admin-auth', 'true');
      setAuthError(''); setAuthAttempts(0);
    } else {
      const a = authAttempts + 1;
      setAuthAttempts(a);
      if (a >= 5) {
        setLockedOut(true);
        setTimeout(() => { setLockedOut(false); setAuthAttempts(0); }, 5 * 60 * 1000);
        setAuthError('Muitas tentativas. Bloqueado por 5 minutos.');
      } else {
        setAuthError(`Senha incorreta. Tentativa ${a}/5.`);
      }
    }
  };

  // Prayer handlers
  const openCreatePrayer = () => { setPrayerForm(emptyPrayerForm); setEditingId(null); setModal('create-prayer'); setError(''); };
  const openEditPrayer = (p: Prayer) => {
    setPrayerForm({ title: p.title, slug: p.slug, subtitle: p.subtitle || '', category: p.category, text: p.text, image_url: p.image_url || '', featured: p.featured });
    setEditingId(p.id); setModal('edit-prayer'); setError('');
  };
  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerForm.title.trim() || !prayerForm.text.trim()) { setError('Título e texto são obrigatórios.'); return; }
    setSaving(true); setError('');
    try {
      const data = { ...prayerForm, slug: prayerForm.slug || generateSlug(prayerForm.title) };
      if (modal === 'create-prayer') { await addPrayer(data); setSuccess('Oração criada!'); }
      else if (editingId) { await updatePrayer(editingId, data); setSuccess('Oração atualizada!'); }
      setModal(null); setTimeout(() => setSuccess(''), 3000);
    } catch { setError('Erro ao salvar.'); }
    finally { setSaving(false); }
  };
  const handleDeletePrayer = async (id: string) => {
    try { await deletePrayer(id); setDeleteConfirm(null); setSuccess('Oração removida.'); setTimeout(() => setSuccess(''), 2000); }
    catch { setError('Erro ao remover.'); }
  };

  // Novena handlers
  const openCreateNovena = () => { setNovenaForm(makeEmptyNovenaForm()); setEditingId(null); setActiveDay(0); setModal('create-novena'); setError(''); };
  const openEditNovena = (n: Novena) => {
    const days: NovenaDay[] = Array.from({ length: 9 }, (_, i) => {
      const ex = n.days.find(d => d.day === i + 1);
      return ex || { day: i + 1, title: `${i + 1}º Dia`, text: '' };
    });
    setNovenaForm({ title: n.title, slug: n.slug, description: n.description || '', purpose: n.purpose || '', days });
    setEditingId(n.id); setActiveDay(0); setModal('edit-novena'); setError('');
  };
  const updateNovenaDay = (idx: number, field: 'title' | 'text', val: string) => {
    setNovenaForm(f => {
      const days = [...f.days];
      days[idx] = { ...days[idx], [field]: val };
      return { ...f, days };
    });
  };
  const handleNovenaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novenaForm.title.trim()) { setError('O título é obrigatório.'); return; }
    const empty = novenaForm.days.filter(d => !d.text.trim());
    if (empty.length > 0) { setError(`Preencha o texto dos dias: ${empty.map(d => d.day).join(', ')}`); return; }
    setSaving(true); setError('');
    try {
      const data = { ...novenaForm, slug: novenaForm.slug || generateSlug(novenaForm.title) };
      if (modal === 'create-novena') { await addNovena(data); setSuccess('Novena criada!'); }
      else if (editingId) { await updateNovena(editingId, data); setSuccess('Novena atualizada!'); }
      setModal(null); setTimeout(() => setSuccess(''), 3000);
    } catch { setError('Erro ao salvar.'); }
    finally { setSaving(false); }
  };
  const handleDeleteNovena = async (id: string) => {
    try { await deleteNovena(id); setDeleteConfirm(null); setSuccess('Novena removida.'); setTimeout(() => setSuccess(''), 2000); }
    catch { setError('Erro ao remover.'); }
  };

  const dayFilled = (idx: number) => novenaForm.days[idx]?.text.trim().length > 0;
  const filledCount = novenaForm.days.filter(d => d.text.trim()).length;

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gold-500/30 bg-parchment-50 dark:bg-marian-600 text-marian-800 dark:text-parchment-200 placeholder-marian-400 dark:placeholder-parchment-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 font-body text-sm";
  const labelCls = "block font-sans text-xs uppercase tracking-wider text-gold-600 dark:text-gold-500 mb-1";

  // ══ LOGIN ══════════════════════════════════════════════════════════════
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment-200 dark:bg-marian-800 px-4">
        <div className="w-full max-w-md">
          <div className="bg-parchment-100 dark:bg-marian-700 rounded-2xl border border-gold-500/20 shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-crimson-700/10 dark:bg-crimson-900/30 flex items-center justify-center border border-crimson-700/20">
                <Shield size={28} className="text-crimson-700 dark:text-crimson-400" />
              </div>
            </div>
            <h2 className="font-serif text-2xl text-crimson-800 dark:text-parchment-100 text-center mb-1">Área Restrita</h2>
            <p className="font-body text-sm text-marian-500 dark:text-parchment-500 text-center mb-8">Administração do Cor Incensum</p>
            <form onSubmit={handleLogin} noValidate>
              <input ref={honeypotRef} type="text" name="website" tabIndex={-1}
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }} autoComplete="off" />
              <div className="relative mb-4">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-marian-400 dark:text-parchment-500" />
                <input type={showPassword ? 'text' : 'password'} placeholder="Senha de administrador"
                  value={passwordInput} onChange={e => setPasswordInput(e.target.value)} disabled={lockedOut}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gold-500/30 bg-parchment-50 dark:bg-marian-600 text-marian-800 dark:text-parchment-200 placeholder-marian-400 dark:placeholder-parchment-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 font-body text-sm disabled:opacity-50" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-marian-400 dark:text-parchment-500">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {authError && <p className="font-body text-sm text-crimson-600 dark:text-crimson-400 mb-4 text-center">{authError}</p>}
              <button type="submit" disabled={lockedOut || !passwordInput}
                className="w-full py-3 rounded-xl bg-crimson-700 hover:bg-crimson-800 text-parchment-100 font-body tracking-wide shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {lockedOut ? 'Acesso Bloqueado' : 'Entrar'}
              </button>
            </form>
            <p className="font-body text-xs text-marian-400 dark:text-parchment-600 text-center mt-6">
              Área protegida contra acesso não autorizado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ══ DASHBOARD ══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen">
      <div className="relative py-12 bg-parchment-300/40 dark:bg-marian-700/30 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-500 mb-1">✦ Administração ✦</p>
            <h1 className="font-serif text-3xl text-crimson-800 dark:text-parchment-100">Painel Admin</h1>
          </div>
          <button onClick={() => { setAuthenticated(false); sessionStorage.removeItem('cor-admin-auth'); }}
            className="px-4 py-2 rounded-lg border border-gold-500/30 font-body text-sm text-marian-600 dark:text-parchment-400 hover:border-crimson-600 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors">
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {success && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-500/30 font-body text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
            <CheckCircle size={16} /> {success}
          </div>
        )}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-crimson-50 dark:bg-crimson-900/20 border border-crimson-500/30 font-body text-sm text-crimson-700 dark:text-crimson-400">
            ✗ {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Orações', value: prayers.length },
            { label: 'Novenas', value: novenas.length },
            { label: 'Em Destaque', value: prayers.filter(p => p.featured).length },
            { label: 'Categorias', value: new Set(prayers.map(p => p.category)).size },
          ].map(s => (
            <div key={s.label} className="bg-parchment-100 dark:bg-marian-700 rounded-xl border border-gold-500/20 p-4 text-center">
              <p className="font-serif text-3xl text-crimson-800 dark:text-gold-400">{s.value}</p>
              <p className="font-body text-xs text-marian-500 dark:text-parchment-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['prayers', 'novenas'] as AdminTab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-xl font-body text-sm tracking-wide transition-all
                ${tab === t ? 'bg-crimson-700 text-white shadow-md' : 'bg-parchment-100 dark:bg-marian-700 text-marian-600 dark:text-parchment-400 border border-gold-500/20 hover:border-gold-500/50'}`}>
              {t === 'prayers' ? '📿 Orações' : '📖 Novenas'}
            </button>
          ))}
        </div>

        {/* Orações */}
        {tab === 'prayers' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-crimson-800 dark:text-parchment-100">Orações ({prayers.length})</h2>
              <button onClick={openCreatePrayer}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson-700 hover:bg-crimson-800 text-parchment-100 font-body text-sm shadow-md transition-all">
                <Plus size={16} /> Nova Oração
              </button>
            </div>
            <div className="space-y-3">
              {prayers.map(prayer => (
                <div key={prayer.id} className="bg-parchment-100 dark:bg-marian-700 rounded-xl border border-gold-500/20 p-4 hover:border-gold-500/40 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-serif text-base text-crimson-800 dark:text-parchment-100 truncate">{prayer.title}</h3>
                        {prayer.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 font-sans">✦ Destaque</span>}
                      </div>
                      <p className="font-body text-xs text-marian-500 dark:text-parchment-500">{CATEGORY_LABELS[prayer.category]} · /{prayer.slug}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => openEditPrayer(prayer)}
                        className="p-2 rounded-lg text-marian-500 dark:text-parchment-500 hover:bg-gold-50 dark:hover:bg-marian-600 hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                        <Pencil size={15} />
                      </button>
                      {deleteConfirm === prayer.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDeletePrayer(prayer.id)} className="px-3 py-1 rounded-lg bg-crimson-700 text-white font-body text-xs">Confirmar</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 rounded-lg border border-gold-500/30 font-body text-xs text-marian-500 dark:text-parchment-500">Cancelar</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(prayer.id)}
                          className="p-2 rounded-lg text-marian-500 dark:text-parchment-500 hover:bg-crimson-50 dark:hover:bg-crimson-900/20 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {prayers.length === 0 && <p className="text-center font-body text-sm text-marian-400 dark:text-parchment-600 py-10">Nenhuma oração cadastrada ainda.</p>}
            </div>
          </div>
        )}

        {/* Novenas */}
        {tab === 'novenas' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-crimson-800 dark:text-parchment-100">Novenas ({novenas.length})</h2>
              <button onClick={openCreateNovena}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-marian-600 hover:bg-marian-700 dark:bg-marian-500 dark:hover:bg-marian-600 text-parchment-100 font-body text-sm shadow-md transition-all">
                <Plus size={16} /> Nova Novena
              </button>
            </div>
            <div className="space-y-3">
              {novenas.map(novena => (
                <div key={novena.id} className="bg-parchment-100 dark:bg-marian-700 rounded-xl border border-gold-500/20 p-4 hover:border-gold-500/40 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base text-crimson-800 dark:text-parchment-100 mb-1">{novena.title}</h3>
                      <p className="font-body text-xs text-marian-500 dark:text-parchment-500">{novena.days.length} dias · {novena.purpose || 'sem finalidade definida'}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => openEditNovena(novena)}
                        className="p-2 rounded-lg text-marian-500 dark:text-parchment-500 hover:bg-gold-50 dark:hover:bg-marian-600 hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                        <Pencil size={15} />
                      </button>
                      {deleteConfirm === novena.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDeleteNovena(novena.id)} className="px-3 py-1 rounded-lg bg-crimson-700 text-white font-body text-xs">Confirmar</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 rounded-lg border border-gold-500/30 font-body text-xs text-marian-500 dark:text-parchment-500">Cancelar</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(novena.id)}
                          className="p-2 rounded-lg text-marian-500 dark:text-parchment-500 hover:bg-crimson-50 dark:hover:bg-crimson-900/20 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {novenas.length === 0 && <p className="text-center font-body text-sm text-marian-400 dark:text-parchment-600 py-10">Nenhuma novena cadastrada ainda.</p>}
            </div>
          </div>
        )}
      </div>

      {/* ══ MODAL ORAÇÃO ══════════════════════════════════════════════════ */}
      {(modal === 'create-prayer' || modal === 'edit-prayer') && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-10 flex items-start justify-center">
            <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" onClick={() => setModal(null)} />
            <div className="relative z-10 w-full max-w-2xl bg-parchment-100 dark:bg-marian-700 rounded-2xl shadow-2xl border border-gold-500/30">
              <div className="flex items-center justify-between p-6 border-b border-gold-500/20">
                <h2 className="font-serif text-xl text-crimson-800 dark:text-parchment-100">
                  {modal === 'create-prayer' ? '✦ Nova Oração' : '✦ Editar Oração'}
                </h2>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg text-marian-400 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors text-xl leading-none">✕</button>
              </div>
              <form onSubmit={handlePrayerSubmit} className="p-6 space-y-5">
                <div>
                  <label className={labelCls}>Título *</label>
                  <input type="text" value={prayerForm.title}
                    onChange={e => setPrayerForm(f => ({ ...f, title: e.target.value, slug: generateSlug(e.target.value) }))}
                    className={inputCls} required placeholder="Ex: Oração ao Sagrado Coração" />
                </div>
                <div>
                  <label className={labelCls}>Slug (gerado automaticamente)</label>
                  <input type="text" value={prayerForm.slug}
                    onChange={e => setPrayerForm(f => ({ ...f, slug: e.target.value }))}
                    className={`${inputCls} font-mono`} />
                </div>
                <div>
                  <label className={labelCls}>Subtítulo (opcional)</label>
                  <input type="text" value={prayerForm.subtitle}
                    onChange={e => setPrayerForm(f => ({ ...f, subtitle: e.target.value }))}
                    className={inputCls} placeholder="Ex: Uma prece de consagração e amor" />
                </div>
                <div>
                  <label className={labelCls}>Categoria *</label>
                  <select value={prayerForm.category}
                    onChange={e => setPrayerForm(f => ({ ...f, category: e.target.value as PrayerCategory }))}
                    className={`${inputCls} cursor-pointer`}>
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>

                <RichEditor
                  label="Texto da Oração *"
                  value={prayerForm.text}
                  onChange={val => setPrayerForm(f => ({ ...f, text: val }))}
                  placeholder="Digite o texto completo da oração..."
                  rows={12}
                />

                <div>
                  <label className={labelCls}>URL da Imagem (opcional)</label>
                  <input type="url" value={prayerForm.image_url}
                    onChange={e => setPrayerForm(f => ({ ...f, image_url: e.target.value }))}
                    className={inputCls} placeholder="https://..." />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={prayerForm.featured}
                    onChange={e => setPrayerForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 accent-crimson-700 rounded" />
                  <span className="font-body text-sm text-marian-700 dark:text-parchment-300">Destacar na página inicial</span>
                </label>
                {error && <p className="font-body text-sm text-crimson-600 dark:text-crimson-400">{error}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 py-3 rounded-xl bg-crimson-700 hover:bg-crimson-800 text-parchment-100 font-body tracking-wide shadow-md transition-all disabled:opacity-50">
                    {saving ? 'Salvando...' : modal === 'create-prayer' ? 'Criar Oração' : 'Salvar Alterações'}
                  </button>
                  <button type="button" onClick={() => setModal(null)}
                    className="px-6 py-3 rounded-xl border border-gold-500/30 font-body text-sm text-marian-600 dark:text-parchment-400 hover:border-gold-500/60 transition-colors">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL NOVENA ══════════════════════════════════════════════════ */}
      {(modal === 'create-novena' || modal === 'edit-novena') && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-10 flex items-start justify-center">
            <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" onClick={() => setModal(null)} />
            <div className="relative z-10 w-full max-w-3xl bg-parchment-100 dark:bg-marian-700 rounded-2xl shadow-2xl border border-gold-500/30">

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold-500/20">
                <h2 className="font-serif text-xl text-crimson-800 dark:text-parchment-100">
                  {modal === 'create-novena' ? '✦ Nova Novena' : '✦ Editar Novena'}
                </h2>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg text-marian-400 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors text-xl leading-none">✕</button>
              </div>

              <form onSubmit={handleNovenaSubmit}>
                {/* Info geral */}
                <div className="p-6 space-y-4 border-b border-gold-500/20">
                  <p className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">Informações Gerais</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Título *</label>
                      <input type="text" value={novenaForm.title}
                        onChange={e => setNovenaForm(f => ({ ...f, title: e.target.value, slug: generateSlug(e.target.value) }))}
                        className={inputCls} required placeholder="Ex: Novena ao Sagrado Coração" />
                    </div>
                    <div>
                      <label className={labelCls}>Slug (URL)</label>
                      <input type="text" value={novenaForm.slug}
                        onChange={e => setNovenaForm(f => ({ ...f, slug: e.target.value }))}
                        className={`${inputCls} font-mono`} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Finalidade</label>
                    <input type="text" value={novenaForm.purpose}
                      onChange={e => setNovenaForm(f => ({ ...f, purpose: e.target.value }))}
                      className={inputCls} placeholder="Ex: Consagração, cura, proteção..." />
                  </div>
                  <div>
                    <label className={labelCls}>Descrição curta</label>
                    <textarea value={novenaForm.description} rows={2}
                      onChange={e => setNovenaForm(f => ({ ...f, description: e.target.value }))}
                      className={`${inputCls} resize-none`} placeholder="Breve descrição exibida no card..." />
                  </div>
                </div>

                {/* Seletor de dias */}
                <div className="p-6 border-b border-gold-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">Dias da Novena</p>
                    <span className="font-body text-xs text-marian-500 dark:text-parchment-500">{filledCount}/9 preenchidos</span>
                  </div>
                  <div className="h-1.5 bg-parchment-300 dark:bg-marian-600 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-500 to-crimson-600 rounded-full transition-all duration-500"
                      style={{ width: `${(filledCount / 9) * 100}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 9 }, (_, i) => (
                      <button key={i} type="button" onClick={() => setActiveDay(i)}
                        className={`relative w-10 h-10 rounded-full font-sans text-sm font-bold border-2 transition-all
                          ${activeDay === i
                            ? 'bg-crimson-700 border-crimson-700 text-white shadow-md'
                            : dayFilled(i)
                              ? 'bg-gold-100 dark:bg-gold-900/30 border-gold-500 text-gold-700 dark:text-gold-400'
                              : 'border-gold-500/30 text-marian-500 dark:text-parchment-500 hover:border-gold-500/60'
                          }`}>
                        {i + 1}
                        {dayFilled(i) && activeDay !== i && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full border-2 border-parchment-100 dark:border-marian-700" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor do dia */}
                <div className="p-6 space-y-4 border-b border-gold-500/20">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-crimson-700/10 dark:bg-crimson-900/30 border border-crimson-700/20 flex items-center justify-center">
                      <span className="font-serif text-sm font-bold text-crimson-700 dark:text-crimson-400">{activeDay + 1}</span>
                    </div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gold-600 dark:text-gold-500">
                      Editando o {activeDay + 1}º Dia
                    </p>
                  </div>
                  <div>
                    <label className={labelCls}>Título do {activeDay + 1}º Dia</label>
                    <input type="text" value={novenaForm.days[activeDay]?.title || ''}
                      onChange={e => updateNovenaDay(activeDay, 'title', e.target.value)}
                      className={inputCls} placeholder={`Ex: ${activeDay + 1}º Dia — Fé e Esperança`} />
                  </div>

                  <RichEditor
                    label={`Texto do ${activeDay + 1}º Dia *`}
                    value={novenaForm.days[activeDay]?.text || ''}
                    onChange={val => updateNovenaDay(activeDay, 'text', val)}
                    placeholder={`Escreva a oração do ${activeDay + 1}º dia...`}
                    rows={10}
                  />

                  <div className="flex gap-2 pt-1">
                    {activeDay > 0 && (
                      <button type="button" onClick={() => setActiveDay(activeDay - 1)}
                        className="flex-1 py-2 rounded-xl border border-gold-500/30 font-body text-sm text-marian-600 dark:text-parchment-400 hover:border-gold-500/60 transition-colors">
                        ← Dia {activeDay}
                      </button>
                    )}
                    {activeDay < 8 && (
                      <button type="button" onClick={() => setActiveDay(activeDay + 1)}
                        className="flex-1 py-2 rounded-xl bg-gold-500/10 border border-gold-500/40 font-body text-sm text-gold-700 dark:text-gold-400 hover:bg-gold-500/20 transition-colors">
                        Dia {activeDay + 2} →
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 space-y-3">
                  {error && <p className="font-body text-sm text-crimson-600 dark:text-crimson-400">{error}</p>}
                  {filledCount < 9 && (
                    <p className="font-body text-xs text-marian-400 dark:text-parchment-600 italic">
                      ⚠ Faltam {9 - filledCount} {9 - filledCount === 1 ? 'dia' : 'dias'} sem texto.
                    </p>
                  )}
                  <div className="flex gap-3">
                    <button type="submit" disabled={saving}
                      className="flex-1 py-3 rounded-xl bg-crimson-700 hover:bg-crimson-800 text-parchment-100 font-body tracking-wide shadow-md transition-all disabled:opacity-50">
                      {saving ? 'Salvando...' : modal === 'create-novena' ? `Criar Novena (${filledCount}/9)` : `Salvar (${filledCount}/9)`}
                    </button>
                    <button type="button" onClick={() => setModal(null)}
                      className="px-6 py-3 rounded-xl border border-gold-500/30 font-body text-sm text-marian-600 dark:text-parchment-400 hover:border-gold-500/60 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
