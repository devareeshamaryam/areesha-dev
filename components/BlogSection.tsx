 "use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Blog = {
  id: number;
  slug: string;
  title: string;
  date: string;
  views: string | number;
  likes: number;
  image: string;
};

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
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
    <Link href={`/blogs/${blog.slug}`}>
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
        <div className="relative w-full h-44 overflow-hidden bg-rose-50">
          <img
            src={blog.image || "/i1.png"}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/i1.png";
            }}
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
              <span
                className="flex items-center gap-1 text-xs text-gray-400"
                style={{ fontFamily: "'Lora', serif" }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {blog.views}
              </span>
              {/* Likes */}
              <span
                className="flex items-center gap-1 text-xs text-gray-400"
                style={{ fontFamily: "'Lora', serif" }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {blog.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, slug, title, date, views, likes, image")
        .order("id", { ascending: false }) // latest pehle
        .limit(6);

      if (!error && data) {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

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

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-rose-100 bg-white shadow-sm"
              >
                <div className="w-full h-44 bg-rose-50 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-rose-50 rounded animate-pulse w-full" />
                  <div className="h-4 bg-rose-50 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-rose-50 rounded animate-pulse w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 border border-black text-black text-sm font-semibold px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Lora', serif" }}
          >
            View All Blogs
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}