import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { hasLocale } from '@/dictionaries'
import { getSettings, getBlogPostBySlug } from '@/lib/queries'
import { getReservationUrl } from '@/lib/types'
import ReservationCTA from '@/components/sections/ReservationCTA'
import { getDictionary, type Locale } from '@/dictionaries'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Hotel By Karaaslan Inn`,
    description: post.excerpt || undefined,
    openGraph: post.cover_image ? { images: [post.cover_image] } : undefined,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const [post, settings, dict] = await Promise.all([
    getBlogPostBySlug(slug),
    getSettings(),
    getDictionary(lang as Locale),
  ])

  if (!post) notFound()

  const lp = lang === 'tr' ? '' : `/${lang}`

  return (
    <main>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[340px] bg-primary flex items-end">
        {post.cover_image && (
          <Image src={post.cover_image} alt={post.title} fill className="object-cover opacity-60" sizes="100vw" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative max-w-[900px] mx-auto px-8 pb-12 w-full">
          <Link href={`${lp}/blog`} className="text-xs text-white/60 hover:text-white uppercase tracking-[2px] font-semibold mb-4 inline-block">← Blog</Link>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-white leading-tight">{post.title}</h1>
          <p className="text-white/60 text-sm mt-3">
            {new Date(post.published_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* İçerik */}
      <section className="py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-8">
          {post.excerpt && (
            <p className="text-lg text-text-light leading-8 mb-10 pb-10 border-b border-gray-100 italic">{post.excerpt}</p>
          )}
          <div
            className="prose prose-lg max-w-none text-text-light prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-primary prose-a:text-accent prose-strong:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      <ReservationCTA reservationUrl={getReservationUrl(settings.reservation_url, lang)} dict={dict.reservation} />
    </main>
  )
}
