'use client';
import { signIn } from 'next-auth/react';

export default function AdminLogin() {
  return <form className="mx-auto mt-20 max-w-sm space-y-3" onSubmit={async (e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); await signIn('credentials', { email: fd.get('email'), password: fd.get('password'), callbackUrl: '/admin' }); }}><h1 className="text-2xl">Admin Login</h1><input name="email" className="w-full border p-2" /><input name="password" type="password" className="w-full border p-2" /><button className="rounded bg-brand-500 px-4 py-2 text-white">Login</button></form>;
}
