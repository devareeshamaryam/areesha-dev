"use client";

import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BlogDetailProps {
  blog: {
    title: string;
    category: string;
    date: string;
    readTime: string;
    views: number;
    likes: number;
    coverImage: string;
    author: {
      name: string;
      avatar: string;
      role: string;
    };
    content: BlogSection[];
    tags: string[];
  };
  relatedBlogs: RelatedBlog[];
}

interface BlogSection {
  type: "paragraph" | "heading" | "subheading" | "code" | "quote" | "list";
  content: string;
  items?: string[]; // for list type
}

interface RelatedBlog {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  views: number;
}

// ─── Mock Data (replace with your actual data fetching) ──────────────────────
const MOCK_BLOG: BlogDetailProps["blog"] = {
  title: "Mastering Tailwind CSS for Modern UI Design",
  category: "CSS / Design",
  date: "Feb 18, 2025",
  readTime: "8 min read",
  views: 2900,
  likes: 43,
  coverImage: "/blog-cover.png", // replace with actual image
  author: {
    name: "Aleecia Mariam",
    avatar: "/avatar.png", // replace with actual image
    role: "Frontend Developer",
  },
  content: [
    {
      type: "paragraph",
      content:
        "Tailwind CSS has fundamentally changed how developers approach styling in modern web applications. Instead of writing custom CSS for every component, Tailwind provides utility-first classes that let you build complex designs directly in your markup.",
    },
    {
      type: "heading",
      content: "Why Utility-First?",
    },
    {
      type: "paragraph",
      content:
        "The utility-first methodology might feel unusual at first, but it solves several long-standing problems in CSS development — naming conflicts, specificity wars, and stylesheet bloat.",
    },
    {
      type: "subheading",
      content: "Benefits Over Traditional CSS",
    },
    {
      type: "list",
      content: "",
      items: [
        "No more naming things — classes are descriptive by nature",
        "Styles stay co-located with your markup",
        "Built-in design system via spacing, color, and typography scales",
        "Excellent performance with PurgeCSS in production",
      ],
    },
    {
      type: "quote",
      content:
        "The best design systems are the ones that make the right thing easy and the wrong thing hard.",
    },
    {
      type: "subheading",
      content: "Responsive Design Made Simple",
    },
    {
      type: "paragraph",
      content:
        "With Tailwind's responsive prefixes like sm:, md:, lg:, and xl:, building responsive layouts becomes intuitive. You no longer need to jump between media query blocks — the breakpoint logic lives right where you write your component.",
    },
    {
      type: "code",
      content: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {blogs.map((blog) => (
    <BlogCard key={blog.id} {...blog} />
  ))}
</div>`,
    },
    {
      type: "heading",
      content: "Advanced Techniques",
    },
    {
      type: "paragraph",
      content:
        "Once you're comfortable with basics, Tailwind's real power unlocks through custom themes in tailwind.config.ts, arbitrary values using bracket notation, and composing reusable components with @apply in your global CSS.",
    },
  ],
  tags: ["Tailwind CSS", "UI Design", "Frontend", "Next.js", "TypeScript"],
};

const MOCK_RELATED: RelatedBlog[] = [
  {
    id: "1",
    title: "Building Scalable Apps with Next.js 14",
    date: "Mar 10, 2025",
    coverImage: "/blog-cover.png",
    views: 3200,
  },
  {
    id: "2",
    title: "Server Components vs Client Components in Next.js",
    date: "Jan 5, 2025",
    coverImage: "/blog-cover.png",
    views: 2000,
  },
  {
    id: "3",
    title: "TypeScript Best Practices for 2025",
    date: "Dec 12, 2024",
    coverImage: "/blog-cover.png",
    views: 1800,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// ─── Content Renderer ─────────────────────────────────────────────────────────
const renderSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case "heading":
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-bold text-black mt-10 mb-4 font-serif">
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={index} className="text-lg md:text-xl font-semibold text-black mt-8 mb-3">
          {section.content}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="text-gray-700 leading-relaxed text-base md:text-[17px] mb-5">
          {section.content}
        </p>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="my-8 pl-6 border-l-4 border-rose-300 bg-rose-50 py-4 pr-4 rounded-r-xl"
        >
          <p className="text-gray-800 italic text-lg leading-relaxed">
            &ldquo;{section.content}&rdquo;
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="my-5 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="mt-[6px] w-2 h-2 rounded-full bg-rose-300 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div key={index} className="my-7 rounded-2xl overflow-hidden shadow-sm border border-rose-100">
          {/* Code header bar */}
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
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogDetailPage({
  blog = MOCK_BLOG,
  relatedBlogs = MOCK_RELATED,
}: Partial<BlogDetailProps>) {
  const resolvedBlog = blog ?? MOCK_BLOG;
  const resolvedRelated = relatedBlogs ?? MOCK_RELATED;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Back Navigation ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-400 transition-colors duration-200 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            <ArrowLeftIcon />
          </span>
          Back to Blogs
        </Link>
      </div>

      {/* ── Hero Section ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-0">

        {/* Category pill */}
        <div className="mb-5">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-rose-400 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            {resolvedBlog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-serif leading-tight mb-6">
          {resolvedBlog.title}
          <span className="text-rose-400">.</span>
        </h1>

        {/* Divider with dot (matching your portfolio style) */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-px w-20 bg-rose-200" />
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="h-px w-20 bg-rose-200" />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-rose-200 overflow-hidden flex-shrink-0">
              {/* Replace with actual Image component if you have src */}
              <div className="w-full h-full flex items-center justify-center text-rose-400 font-bold text-sm">
                {resolvedBlog.author.name.charAt(0)}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-black leading-none">{resolvedBlog.author.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{resolvedBlog.author.role}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5 text-gray-400 text-sm">
            <span className="flex items-center gap-1.5">
              <ClockIcon />
              {resolvedBlog.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <EyeIcon />
              {resolvedBlog.views >= 1000
                ? `${(resolvedBlog.views / 1000).toFixed(1)}K`
                : resolvedBlog.views}
            </span>
            <span className="flex items-center gap-1.5">
              <HeartIcon />
              {resolvedBlog.likes}
            </span>
            <span className="text-rose-400">{resolvedBlog.date}</span>
          </div>
        </div>
      </section>

      {/* ── Cover Image ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden bg-rose-100 shadow-sm border border-rose-100">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-200/40 via-rose-100/20 to-white/10 z-10" />
          {/* Replace the div below with <Image> when you have real images */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 opacity-30 scale-110">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-28 h-20 rounded-lg bg-rose-300 rotate-3" />
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <div className="w-8 h-8 rounded-lg bg-rose-300/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">FC</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Content ── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        {resolvedBlog.content.map((section, i) => renderSection(section, i))}

        {/* ── Tags ── */}
        <div className="mt-12 pt-8 border-t border-rose-100">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            Tagged In
          </p>
          <div className="flex flex-wrap gap-2">
            {resolvedBlog.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-rose-500 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors duration-150 cursor-pointer px-4 py-1.5 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Author Card ── */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-rose-50 border border-rose-100 flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-14 h-14 rounded-2xl bg-rose-200 border-2 border-rose-300 flex-shrink-0 flex items-center justify-center">
            <span className="text-rose-600 font-bold text-xl">
              {resolvedBlog.author.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-bold text-black text-lg">{resolvedBlog.author.name}</h4>
              <span className="text-xs text-rose-400 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                Author
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-3">{resolvedBlog.author.role}</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Passionate about building beautiful, performant web experiences. Sharing
              insights on Next.js, TypeScript, and modern design systems.
            </p>
          </div>
        </div>
      </article>

      {/* ── Related Blogs ── */}
      <section className="bg-rose-50/50 border-t border-rose-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black font-serif">
              Related Posts<span className="text-rose-400">.</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-16 bg-rose-200" />
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <div className="h-px w-16 bg-rose-200" />
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolvedRelated.map((related) => (
              <Link
                key={related.id}
                href={`/blogs/${related.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-rose-100 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100 transition-all duration-300"
              >
                {/* Card image */}
                <div className="relative aspect-[16/9] bg-rose-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200/50 to-rose-100/30 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-16 h-12 rounded bg-rose-300 rotate-3" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-300/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">FC</span>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-semibold text-black text-base leading-snug mb-3 group-hover:text-rose-500 transition-colors duration-200 line-clamp-2">
                    {related.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="text-rose-400">{related.date}</span>
                    <span className="flex items-center gap-1">
                      <EyeIcon />
                      {related.views >= 1000
                        ? `${(related.views / 1000).toFixed(1)}K`
                        : related.views}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View all */}
          <div className="text-center mt-10">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-600 border border-rose-200 hover:border-rose-400 bg-white px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-sm"
            >
              View All Blogs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}