import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('Admin123!', 10);
  await prisma.user.upsert({
    where: { email: 'owner@macifood.com' },
    update: {},
    create: { email: 'owner@macifood.com', name: 'Owner Maci', passwordHash, role: Role.OWNER }
  });

  const categoryNames = ['Épicerie', 'Boissons', 'Snacks', 'Surgelés', 'Beauté'];
  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({ where: { slug: name.toLowerCase() }, update: {}, create: { name, slug: name.toLowerCase() } })
    )
  );

  for (let i = 1; i <= 40; i++) {
    const cat = categories[i % categories.length];
    await prisma.product.upsert({
      where: { slug: `produit-${i}` },
      update: {},
      create: {
        name: `Produit Maci ${i}`,
        slug: `produit-${i}`,
        description: `Produit africain premium numéro ${i}`,
        price: 499 + i * 25,
        stock: 5 + (i % 20),
        tags: ['afrique', 'premium'],
        categoryId: cat.id,
        images: {
          create: [{ url: `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80`, alt: `Produit ${i}` }]
        }
      }
    });
  }

  await prisma.coupon.upsert({ where: { code: 'WELCOME10' }, update: {}, create: { code: 'WELCOME10', discountPercent: 10, active: true } });
  await prisma.coupon.upsert({ where: { code: 'AFRICA15' }, update: {}, create: { code: 'AFRICA15', discountPercent: 15, active: true } });

  await prisma.cmsHome.upsert({
    where: { id: 'home-default' },
    update: {},
    create: {
      id: 'home-default',
      heroTitle: 'Le meilleur du marché africain',
      heroSubtitle: 'Produits authentiques livrés rapidement',
      heroImage: '/images/hero.jpg',
      featuredCategories: categoryNames,
      trustBadges: ['Livraison 48h', 'Paiement sécurisé', 'Qualité premium']
    }
  });
}

main().finally(() => prisma.$disconnect());
