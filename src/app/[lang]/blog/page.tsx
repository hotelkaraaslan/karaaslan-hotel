import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale } from '@/dictionaries'
import PageHero from '@/components/ui/PageHero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getSettings, getBlogPosts, getPageHeroImage } from '@/lib/queries'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return {
    title: 'Blog | Hotel By Karaaslan Inn',
    description: 'Kuşadası ve Hotel By Karaaslan Inn hakkında güncel yazılar, ipuçları ve haberler.',
  }
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const [posts, settings, heroImage] = await Promise.all([
    getBlogPosts(),
    getSettings(),
    getPageHeroImage('blog'),
  ])

  return (
    <main>
      <PageHero
        title="Blog"
        subtitle="Kuşadası ve otelimiz hakkında yazılar"
        imageUrl={heroImage || settings.about_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80'}
      />
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          {posts.length === 0 ? (
            <p className="text-center text-text-light py-20">Henüz blog yazısı yok.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, i: number) => (
                <ScrollReveal key={post.id} delay={i * 80}>
                  <Link href={`${lang === 'tr' ? '' : `/${lang}`}/blog/${post.slug}`} className="group block bg-white border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {post.cover_image ? (
                        <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                      ) : (
                        <div className="w-full h-full bg-cream flex items-center justify-center text-text-light text-sm">Görsel yok</div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-accent font-semibold tracking-[2px] uppercase mb-2">
                        {new Date(post.published_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-primary leading-snug mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-sm text-text-light leading-6 line-clamp-2">{post.excerpt}</p>}
                      <span className="inline-block mt-4 text-xs font-semibold tracking-[2px] uppercase text-accent">Devamını Oku →</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
