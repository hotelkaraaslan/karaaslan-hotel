import { getBlogPostAdmin } from '@/lib/admin-queries'
import BlogForm from '@/components/admin/blog/BlogForm'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getBlogPostAdmin(id).catch(() => null)
  if (!post) notFound()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Yazısını Düzenle</h1>
        <p className="text-sm text-gray-500 mt-1">{post.title}</p>
      </div>
      <BlogForm initial={post} />
    </div>
  )
}
