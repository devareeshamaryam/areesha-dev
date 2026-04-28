"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const blogs = [
  {
    id: 1,
    title: "Building Scalable Apps with Next.js 14",
    date: "Mar 10, 2025",
    views: "3.2K",
    likes: 43,
    image: "/i1.png",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS for Modern UI Design",
    date: "Feb 18, 2025",
    views: "2.9K",
    likes: 31,
    image: "/i1.png",
  },
  {
    id: 3,
    title: "Server Components vs Client Components in Next.js",
    date: "Jan 5, 2025",
    views: "2.0K",
    likes: 12,
    image: "/i1.png",
  },
  {
    id: 4,
    title: "Deploy Next.js Apps on Vercel — Complete Guide",
    date: "Dec 12, 2024",
    views: "9.0K",
    likes: 29,
    image: "/i1.png",
  },
  {
    id: 5,
    title: "Creating Reusable Components with React & TypeScript",
    date: "Nov 20, 2024",
    views: "4.8K",
    likes: 33,
    image: "/i1.png",
  },
  {
    id: 6,
    title: "MongoDB Atlas Integration with Next.js API Routes",
    date: "Oct 8, 2024",
    views: "13.3K",
    likes: 74,
    image: "/i1.png",
  },
];

function BlogCard({ blog, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-rose-100 bg-white shadow-sm hover:shadow-lg hover:shadow-rose-100/60 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, box-shadow 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* subtle overlay on hover */}
        <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-black text-base font-bold leading-snug mb-3 group-hover:text-rose-400 transition-colors duration-200"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {blog.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span
            className="text-rose-300 text-xs"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {blog.date}
          </span>

          <div className="flex items-center gap-3">
            {/* Views */}
            <span className="flex items-center gap-1 text-xs text-gray-400" style={{ fontFamily: "'Lora', serif" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {blog.views}
            </span>
            {/* Likes */}
            <span className="flex items-center gap-1 text-xs text-gray-400" style={{ fontFamily: "'Lora', serif" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {blog.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogsSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2
            className="text-4xl md:text-5xl font-black text-black tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Blogs<span className="text-rose-300">.</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-200" />
            <div className="h-2 w-2 rounded-full bg-rose-300" />
            <div className="h-px w-6 bg-rose-100" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-black text-black text-sm font-semibold px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Lora', serif" }}
          >
            View All Blogs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}