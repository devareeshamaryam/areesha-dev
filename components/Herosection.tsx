 "use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-white flex items-center px-6 md:px-16 lg:px-24 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        
        {/* LEFT — Text Content */}
        <div className="flex-1 space-y-6">
          {/* Hello. */}
          <div className="flex items-center gap-2">
            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl md:text-5xl font-bold text-black tracking-tight"
            >
              Hello
            </span>
            <span className="text-rose-400 text-4xl md:text-5xl font-bold">.</span>
          </div>

          {/* I'm Areesha Maryam */}
          <div>
            <p
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl md:text-3xl text-black font-medium"
            >
              I&apos;m{" "}
              <span className="text-rose-300 font-extrabold text-3xl md:text-4xl">
                Areesha Maryam
              </span>
            </p>
          </div>

          {/* Description */}
          <p
            style={{ fontFamily: "'Lora', serif" }}
            className="text-rose-900/70 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Passionate Next.js developer focused on building fast, modern, and
            responsive web applications. Skilled in creating clean user
            interfaces, optimizing performance, and delivering seamless user
            experiences. Dedicated to turning ideas into scalable digital
            products using the latest frontend technologies.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px w-12 bg-rose-200" />
            <div className="h-2 w-2 rounded-full bg-rose-300" />
            <div className="h-px w-6 bg-rose-100" />
          </div>
        </div>

        {/* RIGHT — Photo Stack */}
        <div className="flex-shrink-0 flex items-end gap-3 relative">
          {/* Back card (decorative) */}
          <div className="hidden sm:block absolute -top-4 -left-4 w-48 h-64 rounded-2xl bg-rose-100 border border-rose-200 rotate-[-6deg] z-0" />

          {/* Middle card (decorative) */}
          <div className="hidden sm:block absolute -top-2 left-0 w-48 h-64 rounded-2xl bg-rose-200/60 border border-rose-300 rotate-[-2deg] z-10" />

          {/* Main photo card */}
          <div className="relative z-20 w-52 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-rose-200/60 border-4 border-white">
            <Image
              src="/image3.jpeg"
              alt="Areesha Maryam"
              fill
              className="object-cover object-top"
              priority
            />
          </div>


        </div>
      </div>

      {/* Google Fonts import — add to your layout.tsx <head> instead */}
      {/* 
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lora&display=swap" rel="stylesheet" />
      */}
    </section>
  );
}