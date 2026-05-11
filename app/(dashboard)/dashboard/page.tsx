 "use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

interface Blog {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  read_time: string;
  views: string;
  likes: number;
  image: string;
  excerpt: string;
  content_html?: string;
  tags: string[] | string;
  created_at: string;
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    readTime: "",
    coverImage: "",
    tags: "",
    excerpt: "",
    contentHtml: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const slug = generateSlug(formData.title);

      const blogData = {
        title: formData.title,
        slug: slug,
        category: formData.category,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        read_time: formData.readTime,
        views: editingBlog ? editingBlog.views : "0",
        likes: editingBlog ? editingBlog.likes : 0,
        image: formData.coverImage || "/i1.png",
        excerpt: formData.excerpt,
        content_html: formData.contentHtml,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
        author: { name: "Aleecia Mariam", role: "Frontend Developer", bio: "" },
        content: [],
      };

      if (editingBlog) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editingBlog.id);

        if (error) throw error;
        alert("Blog updated successfully!");
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);
        if (error) throw error;
        alert("Blog created successfully!");
      }

      setFormData({
        title: "",
        category: "",
        readTime: "",
        coverImage: "",
        tags: "",
        excerpt: "",
        contentHtml: "",
      });
      setShowForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Error saving blog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    const tagsString = Array.isArray(blog.tags) ? blog.tags.join(", ") :
      typeof blog.tags === 'string' ? blog.tags : "";

    setFormData({
      title: blog.title,
      category: blog.category,
      readTime: blog.read_time,
      coverImage: blog.image,
      tags: tagsString,
      excerpt: blog.excerpt || "",
      contentHtml: blog.content_html || "",
    });

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
      alert("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      category: "",
      readTime: "",
      coverImage: "",
      tags: "",
      excerpt: "",
      contentHtml: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts with Supabase</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              {showForm ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close Form
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Blog
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Next.js / React"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Read Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 8 min read"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    placeholder="/i1.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    placeholder="Next.js, React, TypeScript"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Short description of the blog post"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Content *</label>
                  <RichTextEditor
                    value={formData.contentHtml}
                    onChange={(value) => setFormData({ ...formData, contentHtml: value })}
                    placeholder="Write your blog content here..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use the toolbar to format your content with headings, bold, italic, lists, and more.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Saving..." : editingBlog ? "Update Blog" : "Create Blog"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{blogs.length}</p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Views</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {blogs.reduce((sum, blog) => {
                    const views = typeof blog.views === 'string'
                      ? parseFloat(blog.views.replace('K', '')) * (blog.views.includes('K') ? 1000 : 1)
                      : blog.views;
                    return sum + views;
                  }, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {blogs.reduce((sum, blog) => sum + blog.likes, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-rose-500"></div>
            <p className="text-gray-600 mt-4">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No blogs yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first blog post</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200"
            >
              Create First Blog
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">All Blog Posts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Likes</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* ── FIXED: image fallback ── */}
                          <div className="w-12 h-12 bg-rose-100 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fda4af" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                              </svg>
                            )}
                          </div>
                          <div className="max-w-xs">
                            <p className="font-semibold text-gray-900 text-sm line-clamp-1">{blog.title}</p>
                            <p className="text-xs text-gray-500">{blog.read_time}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{blog.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{blog.views}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{blog.likes}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <Link
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800 p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title="View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}