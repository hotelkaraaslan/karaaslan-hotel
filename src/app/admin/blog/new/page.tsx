import BlogForm from '@/components/admin/blog/BlogForm'

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yeni Blog Yazısı</h1>
        <p className="text-sm text-gray-500 mt-1">Yeni bir blog yazısı oluştur</p>
      </div>
      <BlogForm />
    </div>
  )
}
