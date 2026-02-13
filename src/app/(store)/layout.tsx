import { Footer } from '@/components/store/footer';
import { Navbar } from '@/components/store/navbar';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container-px py-8">{children}</main>
      <Footer />
    </>
  );
}
