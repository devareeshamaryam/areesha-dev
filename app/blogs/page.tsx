 import Image from "next/image";
import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <main className="bg-white min-h-screen py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1
            className="text-4xl md:text-5xl font-black text-black tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            All Blogs<span className="text-rose-300">.</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-200" />
            <div className="h-2 w-2 rounded-full bg-rose-300" />
            <div className="h-px w-6 bg-rose-100" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            // ✅ Link to /blogs/[slug]
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-rose-100 bg-white shadow-sm hover:shadow-lg hover:shadow-rose-100/60 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/10 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2
                  className="text-black text-base font-bold leading-snug mb-3 group-hover:text-rose-400 transition-colors duration-200"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {blog.title}
                </h2>

                <div className="flex items-center justify-between">
                  <span
                    className="text-rose-300 text-xs"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {blog.date}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400" style={{ fontFamily: "'Lora', serif" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {blog.views}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400" style={{ fontFamily: "'Lora', serif" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      {blog.likes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}