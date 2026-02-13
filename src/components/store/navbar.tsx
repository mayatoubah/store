'use client';

import Link from 'next/link';
import { Moon, ShoppingCart, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/stores/cart-store';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const count = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/70">
      <div className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">Maci Food</Link>
        <nav className="flex items-center gap-5">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/cart" className="relative"><ShoppingCart size={18} /><span className="absolute -right-2 -top-2 rounded-full bg-brand-500 px-1 text-xs text-white">{count}</span></Link>
        </nav>
      </div>
    </header>
  );
}
