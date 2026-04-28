 "use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Tax App",
    description: "Smart tax management and calculation web application.",
    tags: ["#Next.js", "#Tailwind", "#React"],
    github: "https://github.com/devareeshamaryam/tax-app",
    image: "/i1.png",
  },
  {
    id: 2,
    title: "Mobile App",
    description: "Responsive mobile-first application with modern UI patterns.",
    tags: ["#React", "#Tailwind", "#Mobile"],
    github: "https://github.com/devareeshamaryam/Mobile-App",
    image: "/i1.png",
  },
  {
    id: 3,
    title: "Blog App",
    description: "Full-featured Next.js blog with dynamic routing and MDX.",
    tags: ["#Next.js", "#MDX", "#Prisma"],
    github: "https://github.com/devareeshamaryam/My-Next-Blog-App",
    image: "/i1.png",
  },
  {
    id: 4,
    title: "Html Portfolio",
    description: "Clean personal portfolio built with pure HTML & CSS.",
    tags: ["#HTML", "#CSS", "#Portfolio"],
    github: "https://github.com/devareeshamaryam/my-portfolio",
    image: "/i1.png",
  },
  {
    id: 5,
    title: "CDN",
    description: "Mobile-optimised CDN site with fast asset delivery.",
    tags: ["#CDN", "#Mobile", "#Performance"],
    github: "https://github.com/devareeshamaryam/cdn-mobilesite",
    image: "/i1.png",
  },
  {
    id: 6,
    title: "Real Estate App",
    description: "Property dealer platform with listings and search filters.",
    tags: ["#Next.js", "#Tailwind", "#Real Estate"],
    github: "https://github.com/devareeshamaryam/propertydealer.pk",
    image: "/i1.png",
  },
];

function ProjectCard({ project, index }) {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Background image */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Large transparent number */}
        <span
          className="absolute bottom-4 right-4 text-8xl font-black leading-none select-none pointer-events-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "rgba(255,255,255,0.08)",
            lineHeight: 1,
          }}
        >
          {index + 1}
        </span>
      </div>

      {/* Content overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-rose-200 font-medium tracking-wide"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="text-white text-xl font-bold mb-1 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-white/70 text-sm leading-relaxed mb-4"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {project.description}
        </p>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 hover:border-rose-300 hover:text-rose-200 rounded-full px-4 py-1.5 transition-all duration-300"
          style={{ fontFamily: "'Lora', serif" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub ↗
        </a>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border border-rose-200/0 group-hover:border-rose-200/40 transition-all duration-500 pointer-events-none" />
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      {/* Google Fonts — add to layout.tsx instead */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lora&display=swap" rel="stylesheet" /> */}

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-14 text-center">
          <h2
            className="text-4xl md:text-5xl font-black text-black tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Projects
            <span className="text-rose-300">.</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-200" />
            <div className="h-2 w-2 rounded-full bg-rose-300" />
            <div className="h-px w-6 bg-rose-100" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}