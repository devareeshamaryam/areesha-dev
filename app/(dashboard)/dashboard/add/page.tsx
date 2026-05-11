 "use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
      Loading editor...
    </div>
  ),
});

export default function AddBlogPage() {
  const router = useRouter();
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
        views: "0",
        likes: 0,
        image: formData.coverImage || "/i1.png",
        excerpt: formData.excerpt,
        content_html: formData.contentHtml,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
        author: { name: "Aleecia Mariam", role: "Frontend Developer", bio: "" },
        content: [],
      };

      const { error } = await supabase.from("blogs").insert([blogData]);
      if (error) throw error;

      alert("Blog created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving blog:", JSON.stringify(error, null, 2));
      alert("Error saving blog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Blog</h1>
            <p className="text-gray-600 mt-1">Create a new blog post</p>
          </div>
          <Link
            href="/dashboard"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Next.js / React"
                />
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Read Time *
                </label>
                <input
                  type="text"
                  required
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., 8 min read"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  placeholder="/i1.png"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  placeholder="Next.js, React, TypeScript"
                />
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Short description of the blog post"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blog Content *
                </label>
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

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Creating..." : "Create Blog"}
              </button>
              <Link
                href="/dashboard"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}