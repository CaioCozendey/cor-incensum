import { useRef, useCallback } from 'react';
import {
  Bold, AlignLeft, AlignCenter, CaseSensitive,
  Heading1, Heading2, Type, Minus
} from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
}

// Format tokens used in text:
//  **texto**       → negrito
//  ^^TEXTO^^       → capslock (uppercase visual)
//  {center}linha   → centralizado
//  {large}linha    → texto grande
//  {small}linha    → texto pequeno
//  {title}linha    → título (maior ainda)
//  ---             → linha divisória

type FormatAction =
  | 'bold'
  | 'caps'
  | 'center'
  | 'large'
  | 'small'
  | 'title'
  | 'divider';

export default function RichEditor({ value, onChange, placeholder, rows = 12, label }: RichEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = useCallback((action: FormatAction) => {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);
    const before = value.slice(0, start);
    const after = value.slice(end);

    let newText = value;
    let newStart = start;
    let newEnd = end;

    if (action === 'bold') {
      if (selected) {
        // Toggle: if already bold, remove markers
        if (selected.startsWith('**') && selected.endsWith('**')) {
          const inner = selected.slice(2, -2);
          newText = before + inner + after;
          newEnd = start + inner.length;
        } else {
          newText = before + `**${selected}**` + after;
          newEnd = end + 4;
        }
      } else {
        newText = before + `****` + after;
        newStart = start + 2;
        newEnd = start + 2;
      }
    }

    if (action === 'caps') {
      if (selected) {
        const inner = selected.replace(/^\^\^/, '').replace(/\^\^$/, '');
        if (selected.startsWith('^^') && selected.endsWith('^^')) {
          newText = before + inner + after;
          newEnd = start + inner.length;
        } else {
          const capped = inner.toUpperCase();
          newText = before + `^^${capped}^^` + after;
          newEnd = end + 4;
        }
      } else {
        newText = before + `^^^^` + after;
        newStart = start + 2;
        newEnd = start + 2;
      }
    }

    if (action === 'center' || action === 'large' || action === 'small' || action === 'title') {
      const tag = `{${action}}`;
      // Apply to selected lines or current line
      const lines = selected ? selected.split('\n') : [getCurrentLine(value, start)];
      const processed = lines.map(line => {
        // Toggle: remove existing tag if same
        const stripped = line.replace(/^\{(center|large|small|title)\}/, '');
        const existingTag = line.match(/^\{(center|large|small|title)\}/)?.[0];
        if (existingTag === tag) return stripped;
        return tag + stripped;
      });
      if (selected) {
        newText = before + processed.join('\n') + after;
        newEnd = start + processed.join('\n').length;
      } else {
        // Replace current line
        const lineStart = getLineStart(value, start);
        const lineEnd = getLineEnd(value, start);
        const currentLine = value.slice(lineStart, lineEnd);
        const strippedLine = currentLine.replace(/^\{(center|large|small|title)\}/, '');
        const existingTag = currentLine.match(/^\{(center|large|small|title)\}/)?.[0];
        const newLine = existingTag === tag ? strippedLine : tag + strippedLine;
        newText = value.slice(0, lineStart) + newLine + value.slice(lineEnd);
        newStart = lineStart + newLine.length;
        newEnd = newStart;
      }
    }

    if (action === 'divider') {
      newText = before + '\n---\n' + after;
      newStart = start + 5;
      newEnd = newStart;
    }

    onChange(newText);
    // Restore cursor after state update
    requestAnimationFrame(() => {
      if (ta) {
        ta.focus();
        ta.setSelectionRange(newStart, newEnd);
      }
    });
  }, [value, onChange]);

  const toolbarButtons: Array<{
    action: FormatAction;
    icon: React.ReactNode;
    label: string;
    title: string;
  }> = [
    { action: 'bold', icon: <Bold size={15} />, label: 'N', title: 'Negrito (**texto**)' },
    { action: 'caps', icon: <CaseSensitive size={15} />, label: 'AA', title: 'Capslock (^^TEXTO^^)' },
    { action: 'title', icon: <Heading1 size={15} />, label: 'T1', title: 'Título grande ({title})' },
    { action: 'large', icon: <Heading2 size={15} />, label: 'T2', title: 'Texto grande ({large})' },
    { action: 'small', icon: <Type size={15} />, label: 'T↓', title: 'Texto pequeno ({small})' },
    { action: 'center', icon: <AlignCenter size={15} />, label: '≡', title: 'Centralizar ({center})' },
    { action: 'divider', icon: <Minus size={15} />, label: '—', title: 'Linha divisória (---)' },
  ];

  return (
    <div>
      {label && (
        <label className="block font-sans text-xs uppercase tracking-wider text-gold-600 dark:text-gold-500 mb-1">
          {label}
        </label>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 mb-1 p-2 rounded-t-xl border border-gold-500/30 border-b-0
        bg-parchment-200 dark:bg-marian-600">
        {toolbarButtons.map(btn => (
          <button
            key={btn.action}
            type="button"
            title={btn.title}
            onClick={() => applyFormat(btn.action)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-sans text-xs font-bold
              text-marian-700 dark:text-parchment-300
              bg-parchment-100 dark:bg-marian-700 border border-gold-500/30
              hover:border-gold-500 hover:text-crimson-700 dark:hover:text-gold-400
              active:scale-95 transition-all duration-100 select-none"
          >
            {btn.icon}
            <span className="hidden sm:inline">{btn.label}</span>
          </button>
        ))}

        {/* Legend toggle */}
        <div className="ml-auto">
          <span className="font-body text-[10px] text-marian-400 dark:text-parchment-600 italic self-center">
            Selecione texto e clique
          </span>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-b-xl border border-gold-500/30
          bg-parchment-50 dark:bg-marian-600 text-marian-800 dark:text-parchment-200
          placeholder-marian-400 dark:placeholder-parchment-500
          focus:outline-none focus:ring-2 focus:ring-gold-500/40
          font-mono text-sm resize-y leading-relaxed"
      />

      {/* Cheat sheet */}
      <div className="mt-1 grid grid-cols-2 sm:grid-cols-4 gap-1">
        {[
          { mark: '**texto**', desc: 'Negrito' },
          { mark: '^^TEXTO^^', desc: 'Maiúsculas' },
          { mark: '{center}linha', desc: 'Centralizar' },
          { mark: '{large}linha', desc: 'Texto grande' },
          { mark: '{small}linha', desc: 'Texto pequeno' },
          { mark: '{title}linha', desc: 'Título' },
          { mark: '---', desc: 'Divisória' },
        ].map(item => (
          <div key={item.mark} className="flex items-center gap-1.5 px-2 py-1 rounded-lg
            bg-parchment-200/50 dark:bg-marian-600/30">
            <code className="font-mono text-[10px] text-gold-700 dark:text-gold-500 truncate">{item.mark}</code>
            <span className="font-body text-[10px] text-marian-400 dark:text-parchment-600 shrink-0">→ {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helpers
function getLineStart(text: string, pos: number): number {
  const idx = text.lastIndexOf('\n', pos - 1);
  return idx === -1 ? 0 : idx + 1;
}
function getLineEnd(text: string, pos: number): number {
  const idx = text.indexOf('\n', pos);
  return idx === -1 ? text.length : idx;
}
function getCurrentLine(text: string, pos: number): string {
  return text.slice(getLineStart(text, pos), getLineEnd(text, pos));
}
