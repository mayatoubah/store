import Link from 'next/link';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <aside className="fixed left-0 top-0 h-full w-56 border-r bg-white p-4 dark:bg-zinc-900">
        <p className="mb-4 text-xl font-bold">Admin</p>
        <nav className="space-y-2 text-sm">
          <Link href="/admin">Dashboard</Link><br />
          <Link href="/admin/products">Produits</Link><br />
          <Link href="/admin/orders">Commandes</Link><br />
          <Link href="/admin/categories">Catégories</Link><br />
          <Link href="/admin/coupons">Coupons</Link><br />
          <Link href="/admin/cms">CMS</Link><br />
          <Link href="/admin/audit">Audit</Link>
        </nav>
      </aside>
      <main className="ml-56 p-6">{children}</main>
    </div>
  );
}
