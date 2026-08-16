'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  ACCENT_THEMES,
  AccentTheme,
} from '@/store/slices/themeSlice';

export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'projectpilot-theme';
const ACCENT_STORAGE_KEY = 'projectpilot-accent';

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');

  const bigint = parseInt(clean, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  const accentTheme = useAppStore((state) => state.accentTheme);

  const setAccentTheme = useAppStore((state) => state.setAccentTheme);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
      }

      const savedAccent = localStorage.getItem(ACCENT_STORAGE_KEY);

      if (savedAccent && savedAccent in ACCENT_THEMES) {
        setAccentTheme(savedAccent as AccentTheme);
      }
    } catch {
      // ignore
    }
  }, [setAccentTheme]);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', theme);

    const colour = ACCENT_THEMES[accentTheme];

    root.style.setProperty('--color-primary', colour);

    root.style.setProperty('--color-primary-rgb', hexToRgb(colour));

    try {
      localStorage.setItem(STORAGE_KEY, theme);

      localStorage.setItem(ACCENT_STORAGE_KEY, accentTheme);
    } catch {}
  }, [theme, accentTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        accentTheme,
        setAccentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useTheme must be used inside a <ThemeProvider>');
  }

  return ctx;
}