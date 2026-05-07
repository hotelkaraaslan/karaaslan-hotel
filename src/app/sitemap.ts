import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const BASE_URL = 'https://www.karaaslanhotels.com'
const LANGS = ['tr', 'en', 'de'] as const

function urls(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']) {
  return LANGS.map((lang) => ({
    url: lang === 'tr' ? `${BASE_URL}${path}` : `${BASE_URL}/${lang}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    ...urls('/', 1.0, 'weekly'),
    ...urls('/hakkimizda', 0.8, 'monthly'),
    ...urls('/odalar', 0.9, 'weekly'),
    ...urls('/mekanlar', 0.8, 'weekly'),
    ...urls('/galeri', 0.7, 'monthly'),
    ...urls('/kusadasi', 0.7, 'monthly'),
    ...urls('/iletisim', 0.8, 'monthly'),
    ...urls('/blog', 0.8, 'weekly'),
  ]

  // Dinamik: Odalar
  const { data: rooms } = await supabase
    .from('rooms')
    .select('slug, updated_at')
    .eq('is_active', true)

  const roomPages: MetadataRoute.Sitemap = (rooms ?? []).flatMap((room) =>
    LANGS.map((lang) => ({
      url: lang === 'tr'
        ? `${BASE_URL}/odalar/${room.slug}`
        : `${BASE_URL}/${lang}/odalar/${room.slug}`,
      lastModified: room.updated_at ? new Date(room.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  // Dinamik: Mekanlar
  const { data: venues } = await supabase
    .from('venues')
    .select('slug, updated_at')
    .eq('is_active', true)

  const venuePages: MetadataRoute.Sitemap = (venues ?? []).flatMap((venue) =>
    LANGS.map((lang) => ({
      url: lang === 'tr'
        ? `${BASE_URL}/mekanlar/${venue.slug}`
        : `${BASE_URL}/${lang}/mekanlar/${venue.slug}`,
      lastModified: venue.updated_at ? new Date(venue.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // Dinamik: Blog yazıları (sadece TR)
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, published_at')
    .eq('is_active', true)

  const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...roomPages, ...venuePages, ...blogPages]
}
