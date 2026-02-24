import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Prayer, Novena, NovenaProgress } from '../types';
import { SEED_PRAYERS, SEED_NOVENAS } from '../data/seed';
import { supabase, isSupabaseConfigured } from '../utils/supabase';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  prayers: Prayer[];
  novenas: Novena[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addPrayer: (prayer: Omit<Prayer, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePrayer: (id: string, prayer: Partial<Prayer>) => Promise<void>;
  deletePrayer: (id: string) => Promise<void>;
  addNovena: (novena: Omit<Novena, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateNovena: (id: string, novena: Partial<Novena>) => Promise<void>;
  deleteNovena: (id: string) => Promise<void>;
  getNovenaProgress: (novenaId: string) => NovenaProgress | null;
  markDayComplete: (novenaId: string, day: number) => void;
  resetNovenaProgress: (novenaId: string) => void;
  loading: boolean;
  usingSupabase: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cor-incensum-darkmode');
    return saved === 'true';
  });
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [novenas, setNovenas] = useState<Novena[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('cor-incensum-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const usingSupabase = isSupabaseConfigured();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cor-incensum-darkmode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    if (usingSupabase) {
      try {
        const [{ data: prayersData }, { data: novenasData }] = await Promise.all([
          supabase.from('prayers').select('*').order('created_at', { ascending: false }),
          supabase.from('novenas').select('*').order('created_at', { ascending: false }),
        ]);
        if (prayersData) setPrayers(prayersData);
        if (novenasData) setNovenas(novenasData);
      } catch (e) {
        console.error('Supabase error, falling back to seed data', e);
        setPrayers(SEED_PRAYERS);
        setNovenas(SEED_NOVENAS);
      }
    } else {
      // Use local storage with seed data fallback
      const savedPrayers = localStorage.getItem('cor-incensum-prayers');
      const savedNovenas = localStorage.getItem('cor-incensum-novenas');
      setPrayers(savedPrayers ? JSON.parse(savedPrayers) : SEED_PRAYERS);
      setNovenas(savedNovenas ? JSON.parse(savedNovenas) : SEED_NOVENAS);
    }
    setLoading(false);
  }

  function savePrayersLocally(data: Prayer[]) {
    localStorage.setItem('cor-incensum-prayers', JSON.stringify(data));
  }

  function saveNovenasLocally(data: Novena[]) {
    localStorage.setItem('cor-incensum-novenas', JSON.stringify(data));
  }

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('cor-incensum-favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addPrayer = async (prayerData: Omit<Prayer, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();
    if (usingSupabase) {
      const { data, error } = await supabase.from('prayers').insert([prayerData]).select().single();
      if (error) throw error;
      setPrayers(prev => [data, ...prev]);
    } else {
      const prayer: Prayer = { ...prayerData, id: Date.now().toString(), created_at: now, updated_at: now };
      const next = [prayer, ...prayers];
      setPrayers(next);
      savePrayersLocally(next);
    }
  };

  const updatePrayer = async (id: string, prayerData: Partial<Prayer>) => {
    if (usingSupabase) {
      const { error } = await supabase.from('prayers').update(prayerData).eq('id', id);
      if (error) throw error;
      setPrayers(prev => prev.map(p => p.id === id ? { ...p, ...prayerData } : p));
    } else {
      const next = prayers.map(p => p.id === id ? { ...p, ...prayerData, updated_at: new Date().toISOString() } : p);
      setPrayers(next);
      savePrayersLocally(next);
    }
  };

  const deletePrayer = async (id: string) => {
    if (usingSupabase) {
      const { error } = await supabase.from('prayers').delete().eq('id', id);
      if (error) throw error;
    }
    const next = prayers.filter(p => p.id !== id);
    setPrayers(next);
    if (!usingSupabase) savePrayersLocally(next);
  };

  const addNovena = async (novenaData: Omit<Novena, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();
    if (usingSupabase) {
      const { data, error } = await supabase.from('novenas').insert([novenaData]).select().single();
      if (error) throw error;
      setNovenas(prev => [data, ...prev]);
    } else {
      const novena: Novena = { ...novenaData, id: Date.now().toString(), created_at: now, updated_at: now };
      const next = [novena, ...novenas];
      setNovenas(next);
      saveNovenasLocally(next);
    }
  };

  const updateNovena = async (id: string, novenaData: Partial<Novena>) => {
    if (usingSupabase) {
      const { error } = await supabase.from('novenas').update(novenaData).eq('id', id);
      if (error) throw error;
    }
    const next = novenas.map(n => n.id === id ? { ...n, ...novenaData, updated_at: new Date().toISOString() } : n);
    setNovenas(next);
    if (!usingSupabase) saveNovenasLocally(next);
  };

  const deleteNovena = async (id: string) => {
    if (usingSupabase) {
      const { error } = await supabase.from('novenas').delete().eq('id', id);
      if (error) throw error;
    }
    const next = novenas.filter(n => n.id !== id);
    setNovenas(next);
    if (!usingSupabase) saveNovenasLocally(next);
  };

  const getNovenaProgress = (novenaId: string): NovenaProgress | null => {
    const saved = localStorage.getItem(`cor-incensum-novena-${novenaId}`);
    return saved ? JSON.parse(saved) : null;
  };

  const markDayComplete = (novenaId: string, day: number) => {
    const current = getNovenaProgress(novenaId) || {
      novena_id: novenaId,
      completed_days: [],
      started_at: new Date().toISOString(),
    };
    if (!current.completed_days.includes(day)) {
      current.completed_days.push(day);
    }
    localStorage.setItem(`cor-incensum-novena-${novenaId}`, JSON.stringify(current));
  };

  const resetNovenaProgress = (novenaId: string) => {
    localStorage.removeItem(`cor-incensum-novena-${novenaId}`);
  };

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      prayers, novenas,
      favorites, toggleFavorite, isFavorite,
      addPrayer, updatePrayer, deletePrayer,
      addNovena, updateNovena, deleteNovena,
      getNovenaProgress, markDayComplete, resetNovenaProgress,
      loading, usingSupabase,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
