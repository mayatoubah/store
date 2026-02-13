'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <form className="mx-auto max-w-md space-y-3" onSubmit={async (e) => { e.preventDefault(); const data = new FormData(e.currentTarget); await signIn('credentials', { email: data.get('email'), password: data.get('password'), callbackUrl: '/account/orders' }); }}>
      <h1 className="text-2xl font-bold">Connexion</h1>
      <input name="email" className="w-full rounded border p-2" placeholder="Email" />
      <input name="password" type="password" className="w-full rounded border p-2" placeholder="Mot de passe" />
      <button className="rounded bg-brand-500 px-4 py-2 text-white">Se connecter</button>
    </form>
  );
}
