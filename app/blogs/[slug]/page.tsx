 // app/blogs/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs, type BlogSection } from "@/lib/blogs";
import Image from "next/image";
import Link from "next/link";

// ─── Next.js 15: params is a Promise ─────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ─── Content Renderer ─────────────────────────────────────────────────────────
function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "heading":
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-bold text-black mt-10 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={index} className="text-lg md:text-xl font-semibold text-black mt-8 mb-3"
          style={{ fontFamily: "'Lora', serif" }}>
          {section.content}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="text-gray-700 leading-relaxed text-base md:text-[17px] mb-5"
          style={{ fontFamily: "'Lora', serif" }}>
          {section.content}
        </p>
      );
    case "quote":
      return (
        <blockquote key={index} className="my-8 pl-6 border-l-4 border-rose-300 bg-rose-50 py-4 pr-4 rounded-r-xl">
          <p className="text-gray-800 italic text-lg leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
            &ldquo;{section.content}&rdquo;
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="my-5 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700" style={{ fontFamily: "'Lora', serif" }}>
              <span className="mt-[6px] w-2 h-2 rounded-full bg-rose-300 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div key={index} className="my-7 rounded-2xl overflow-hidden shadow-sm border border-rose-100">
          <div className="bg-rose-100 px-4 py-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-300" />
            <span className="w-3 h-3 rounded-full bg-rose-200" />
            <span className="w-3 h-3 rounded-full bg-rose-100 border border-rose-300" />
            <span className="ml-2 text-xs text-rose-400 font-mono">tsx</span>
          </div>
          <pre className="bg-[#1e1e1e] text-rose-100 text-sm p-5 overflow-x-auto font-mono leading-relaxed">
            <code>{section.content}</code>
          </pre>
        </div>
      );
    default:
      return null;
  }
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({ params }: PageProps) {
  // ✅ Next.js 15 fix: await params before accessing properties
  const { slug } = await params;

  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const relatedBlogs = getRelatedBlogs(slug, 3);

  return (
    <main className="min-h-screen bg-white">

      {/* ── Back Navigation ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-rose-400 transition-colors duration-200 group"
          style={{ fontFamily: "'Lora', serif" }}>
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blogs
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">

        {/* Category */}
        <div className="mb-5">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-rose-400 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full"
            style={{ fontFamily: "'Lora', serif" }}>
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {blog.title}<span className="text-rose-300">.</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-rose-200" />
          <div className="h-2 w-2 rounded-full bg-rose-300" />
          <div className="h-px w-6 bg-rose-100" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-rose-200 flex items-center justify-center flex-shrink-0">
              <span className="text-rose-400 font-bold text-sm">{blog.author.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-black leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}>{blog.author.name}</p>
              <p className="text-xs text-gray-400 mt-0.5"
                style={{ fontFamily: "'Lora', serif" }}>{blog.author.role}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5 text-gray-400 text-sm" style={{ fontFamily: "'Lora', serif" }}>
            <span className="flex items-center gap-1.5"><ClockIcon />{blog.readTime}</span>
            <span className="flex items-center gap-1.5"><EyeIcon />{blog.views}</span>
            <span className="flex items-center gap-1.5"><HeartIcon />{blog.likes}</span>
            <span className="text-rose-300">{blog.date}</span>
          </div>
        </div>
      </section>

      {/* ── Cover Image ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden bg-rose-50 border border-rose-100 shadow-sm">
          <Image src={blog.image} alt={blog.title} fill
            className="object-cover" priority
            sizes="(max-width: 768px) 100vw, 896px" />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-100/30 to-transparent" />
        </div>
      </div>

      {/* ── Article Content ── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        {blog.content.map((section, i) => renderSection(section, i))}

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-rose-100">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4"
            style={{ fontFamily: "'Lora', serif" }}>Tagged In</p>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag}
                className="text-sm text-rose-400 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors duration-150 px-4 py-1.5 rounded-full font-medium"
                style={{ fontFamily: "'Lora', serif" }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-rose-50 border border-rose-100 flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-14 h-14 rounded-2xl bg-rose-200 border-2 border-rose-300 flex-shrink-0 flex items-center justify-center">
            <span className="text-rose-600 font-bold text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {blog.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-bold text-black text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}>{blog.author.name}</h4>
              <span className="text-xs text-rose-400 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                Author
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: "'Lora', serif" }}>{blog.author.role}</p>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>{blog.author.bio}</p>
          </div>
        </div>
      </article>

      {/* ── Related Blogs ── */}
      {relatedBlogs.length > 0 && (
        <section className="bg-rose-50/50 border-t border-rose-100 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">

            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-black"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Related Posts<span className="text-rose-300">.</span>
              </h2>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-rose-200" />
                <div className="h-2 w-2 rounded-full bg-rose-300" />
                <div className="h-px w-6 bg-rose-100" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => (
                <Link key={related.id} href={`/blogs/${related.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-rose-100 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/60 transition-all duration-300">
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image src={related.image} alt={related.title} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/10 transition-all duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-black text-base font-bold leading-snug mb-3 group-hover:text-rose-400 transition-colors duration-200 line-clamp-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {related.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400"
                      style={{ fontFamily: "'Lora', serif" }}>
                      <span className="text-rose-300">{related.date}</span>
                      <span className="flex items-center gap-1"><EyeIcon />{related.views}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-400 hover:text-rose-500 border border-rose-200 hover:border-rose-300 bg-white px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-sm"
                style={{ fontFamily: "'Lora', serif" }}>
                View All Blogs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}