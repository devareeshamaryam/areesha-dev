"use client";

import { useEffect, useRef, useState } from "react";

function FadeText({ children, delay = 0, className = "" }) {
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(4px)",
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s ease ${delay}s, filter 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ number, label, delay }) {
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 rounded-2xl border border-rose-100 bg-rose-50/50"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.85)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <span
        className="text-3xl font-black text-rose-400"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {number}
      </span>
      <span
        className="text-xs text-gray-400 mt-1 tracking-wide text-center"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AboutMe() {
  return (
    <section className="bg-white py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <FadeText delay={0} className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-black text-black tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Me<span className="text-rose-300">.</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose-200" />
            <div className="h-2 w-2 rounded-full bg-rose-300" />
            <div className="h-px w-6 bg-rose-100" />
          </div>
        </FadeText>



        {/* Paragraphs */}
        <div className="space-y-8">

          <FadeText delay={0.1}>
            <p
              className="text-gray-700 text-lg leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              I&apos;m{" "}
              <span className="text-rose-400 font-semibold">Areesha Maryam</span>
              , a passionate{" "}
              <span className="text-black font-semibold">Next.js Developer</span>{" "}
              focused on building fast, modern, and responsive web applications.
              I love turning ideas into clean digital experiences that users enjoy.
            </p>
          </FadeText>

          <FadeText delay={0.2}>
            <p
              className="text-gray-700 text-lg leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              I care deeply about{" "}
              <span className="text-black font-semibold">clean code</span>,
              solid architecture, and making decisions that scale over time.
              I&apos;ve worked on projects ranging from real estate platforms to
              blog apps — always with an eye on performance and maintainability.
            </p>
          </FadeText>

          <FadeText delay={0.3}>
            <p
              className="text-rose-400 text-lg leading-relaxed font-medium italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;I believe the best way to learn is by doing.&rdquo;
            </p>
          </FadeText>

          <FadeText delay={0.35}>
            <p
              className="text-gray-500 text-base leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              When something interests me, I explore it hands-on — experimenting,
              building, and applying it in real projects to understand it beyond
              theory. That&apos;s how I&apos;ve grown as a developer and that&apos;s how I
              continue to grow.
            </p>
          </FadeText>

          <FadeText delay={0.4}>
            <p
              className="text-gray-500 text-base leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Outside of coding, I enjoy exploring new design trends, sketching
              UI ideas, and staying curious about what&apos;s next in frontend
              technology. I&apos;m based in{" "}
              <span className="text-black font-medium">Pakistan</span> and open
              to exciting opportunities and collaborations.
            </p>
          </FadeText>

        </div>

        {/* Tech tags */}
        <FadeText delay={0.5} className="mt-12">
          <p
            className="text-xs text-rose-300 uppercase tracking-widest mb-4 font-semibold"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Technologies I work with
          </p>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "Tailwind CSS", "MongoDB", "Node.js", "HTML5", "CSS3", "NestJS", "TypeScript", "Git"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 text-sm border border-rose-200 text-gray-700 rounded-full bg-rose-50/50 hover:bg-rose-100 hover:border-rose-300 transition-colors duration-200"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </FadeText>

        {/* Decorative bottom divider */}
        <FadeText delay={0.6} className="mt-16 flex items-center gap-3">
          <div className="h-px flex-1 bg-rose-100" />
          <div className="h-2 w-2 rounded-full bg-rose-200" />
          <div className="h-px flex-1 bg-rose-100" />
        </FadeText>

      </div>
    </section>
  );
}