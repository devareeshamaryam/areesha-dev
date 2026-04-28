// ─────────────────────────────────────────────────────────────────────────────
// lib/blogs.ts
// Baad mein DB connect karne pe sirf getAllBlogs() aur getBlogBySlug() ko
// replace karna hoga — component ka kuch nahi badlega.
// ─────────────────────────────────────────────────────────────────────────────

export interface BlogSection {
  type: "paragraph" | "heading" | "subheading" | "code" | "quote" | "list";
  content: string;
  items?: string[];
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  views: string;
  likes: number;
  image: string;
  excerpt: string;
  author: { name: string; role: string; bio: string };
  content: BlogSection[];
  tags: string[];
}

// ─── BLOG DATA ────────────────────────────────────────────────────────────────
const blogsData: Blog[] = [
  {
    id: 1,
    slug: "building-scalable-apps-with-nextjs-14",
    title: "Building Scalable Apps with Next.js 14",
    category: "Next.js",
    date: "Mar 10, 2025",
    readTime: "10 min read",
    views: "3.2K",
    likes: 43,
    image: "/i1.png",
    excerpt: "Next.js 14 brings powerful new features. Here's how to architect your app for scale from day one.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["Next.js", "Architecture", "Performance", "TypeScript"],
    content: [
      { type: "paragraph", content: "Next.js 14 introduced several groundbreaking features that make building large-scale applications more intuitive. From partial prerendering to server actions, the framework has matured significantly." },
      { type: "heading", content: "App Router Architecture" },
      { type: "paragraph", content: "The App Router is no longer experimental — it's the recommended way to build Next.js applications. Understanding its file-system based routing helps you design scalable folder structures from the start." },
      { type: "subheading", content: "Folder Structure Best Practices" },
      { type: "list", content: "", items: ["Group routes with (folders) for shared layouts", "Use _components for co-located, non-routable files", "Keep server and client components clearly separated", "Place shared logic in /lib or /utils"] },
      { type: "quote", content: "Architecture is not about tools, it is about decisions that are hard to reverse." },
      { type: "heading", content: "Server Actions" },
      { type: "paragraph", content: "Server Actions let you run server-side code directly from your components without creating API routes. This dramatically simplifies form handling and data mutations." },
      { type: "code", content: `// app/actions.ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  await db.post.create({ data: { title } });
}` },
    ],
  },
  {
    id: 2,
    slug: "mastering-tailwind-css-for-modern-ui-design",
    title: "Mastering Tailwind CSS for Modern UI Design",
    category: "CSS / Design",
    date: "Feb 18, 2025",
    readTime: "8 min read",
    views: "2.9K",
    likes: 31,
    image: "/i1.png",
    excerpt: "Learn how utility-first CSS with Tailwind transforms your workflow and helps you build stunning UIs faster.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["Tailwind CSS", "UI Design", "Frontend"],
    content: [
      { type: "paragraph", content: "Tailwind CSS has fundamentally changed how developers approach styling. Instead of writing custom CSS for every component, Tailwind provides utility-first classes that let you build designs directly in your markup." },
      { type: "heading", content: "Why Utility-First?" },
      { type: "list", content: "", items: ["No more naming things — classes are descriptive by nature", "Styles stay co-located with your markup", "Built-in design system via spacing, color, and typography scales", "Excellent performance with PurgeCSS in production"] },
      { type: "quote", content: "The best design systems make the right thing easy and the wrong thing hard." },
      { type: "heading", content: "Responsive Made Simple" },
      { type: "paragraph", content: "With sm:, md:, lg:, xl: prefixes, responsive layouts become intuitive. The breakpoint logic lives right where you write your component." },
      { type: "code", content: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {blogs.map((blog) => (
    <BlogCard key={blog.slug} {...blog} />
  ))}
</div>` },
    ],
  },
  {
    id: 3,
    slug: "server-components-vs-client-components-in-nextjs",
    title: "Server Components vs Client Components in Next.js",
    category: "Next.js",
    date: "Jan 5, 2025",
    readTime: "7 min read",
    views: "2.0K",
    likes: 12,
    image: "/i1.png",
    excerpt: "When should you use 'use client'? A deep dive into the mental model behind React Server Components.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["Next.js", "React", "Server Components"],
    content: [
      { type: "paragraph", content: "One of the most confusing aspects of Next.js App Router is knowing when to use Server Components vs Client Components. The mental model is simple once it clicks." },
      { type: "heading", content: "Server Components (Default)" },
      { type: "paragraph", content: "Every component in the App Router is a Server Component by default. They run only on the server — zero JavaScript shipped to the client for pure server components." },
      { type: "list", content: "", items: ["Can directly access databases, file system, env variables", "No useState, useEffect, or browser APIs", "Great for data fetching and static content", "Reduce client bundle size significantly"] },
      { type: "heading", content: "Client Components" },
      { type: "paragraph", content: "Add 'use client' at the top when you need interactivity, browser APIs, or React hooks. These components hydrate on the client." },
      { type: "code", content: `"use client"; // Only add this when needed

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}` },
      { type: "quote", content: "Push 'use client' as far down the component tree as possible." },
    ],
  },
  {
    id: 4,
    slug: "deploy-nextjs-apps-on-vercel-complete-guide",
    title: "Deploy Next.js Apps on Vercel — Complete Guide",
    category: "DevOps",
    date: "Dec 12, 2024",
    readTime: "12 min read",
    views: "9.0K",
    likes: 29,
    image: "/i1.png",
    excerpt: "From zero to production in minutes. Everything you need to know about deploying Next.js on Vercel.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["Vercel", "Deployment", "Next.js", "CI/CD"],
    content: [
      { type: "paragraph", content: "Vercel is the platform built by the creators of Next.js. Deploying your app is as simple as connecting your GitHub repo — but there's much more to learn for production-grade deployments." },
      { type: "heading", content: "Initial Setup" },
      { type: "list", content: "", items: ["Push your project to GitHub", "Import repo at vercel.com/new", "Configure environment variables", "Click Deploy — done!"] },
      { type: "heading", content: "Environment Variables" },
      { type: "paragraph", content: "Never hardcode secrets. Vercel provides encrypted environment variables per environment — Development, Preview, and Production." },
      { type: "code", content: `# .env.local (never commit this)
DATABASE_URL=mongodb+srv://...
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=https://api.example.com` },
      { type: "heading", content: "Preview Deployments" },
      { type: "paragraph", content: "Every pull request gets its own preview URL automatically. Share with your team for review before merging to main." },
    ],
  },
  {
    id: 5,
    slug: "creating-reusable-components-with-react-and-typescript",
    title: "Creating Reusable Components with React & TypeScript",
    category: "React / TypeScript",
    date: "Nov 20, 2024",
    readTime: "9 min read",
    views: "4.8K",
    likes: 33,
    image: "/i1.png",
    excerpt: "TypeScript supercharges your React components. Learn patterns for building truly reusable, type-safe UI.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["React", "TypeScript", "Components", "Best Practices"],
    content: [
      { type: "paragraph", content: "Building reusable components is an art. TypeScript makes it a science — giving you type safety, autocomplete, and self-documenting APIs." },
      { type: "heading", content: "Typing Component Props" },
      { type: "code", content: `interface ButtonProps {
  variant: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant, size = "md", loading, children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn(variants[variant], sizes[size])}>
      {loading ? <Spinner /> : children}
    </button>
  );
}` },
      { type: "heading", content: "Generic Components" },
      { type: "paragraph", content: "For components like lists or tables that can work with any data shape, generics give you full type inference without sacrificing flexibility." },
      { type: "quote", content: "A component's API is more important than its implementation." },
    ],
  },
  {
    id: 6,
    slug: "mongodb-atlas-integration-with-nextjs-api-routes",
    title: "MongoDB Atlas Integration with Next.js API Routes",
    category: "Database",
    date: "Oct 8, 2024",
    readTime: "11 min read",
    views: "13.3K",
    likes: 74,
    image: "/i1.png",
    excerpt: "Connect MongoDB Atlas to your Next.js app the right way — with connection pooling, error handling, and type safety.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["MongoDB", "Next.js", "Database", "API Routes"],
    content: [
      { type: "paragraph", content: "MongoDB Atlas is a powerful cloud database that pairs perfectly with Next.js. Setting it up correctly with connection pooling prevents performance issues at scale." },
      { type: "heading", content: "Connection Setup" },
      { type: "code", content: `// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;` },
      { type: "heading", content: "Fetching Data in Server Components" },
      { type: "paragraph", content: "With the App Router, you can fetch data directly in Server Components without API routes — cleaner and more efficient." },
    ],
  },
  {
    id: 7,
    slug: "understanding-react-hooks-in-depth",
    title: "Understanding React Hooks In Depth",
    category: "React",
    date: "Sep 15, 2024",
    readTime: "13 min read",
    views: "5.1K",
    likes: 55,
    image: "/i1.png",
    excerpt: "Go beyond useState and useEffect. Master useCallback, useMemo, useRef, and custom hooks with real examples.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["React", "Hooks", "Performance", "JavaScript"],
    content: [
      { type: "paragraph", content: "React Hooks revolutionized how we write components. But many developers stop at useState and useEffect — missing the powerful tools that make apps truly performant." },
      { type: "heading", content: "useMemo vs useCallback" },
      { type: "paragraph", content: "Both are optimization hooks, but they memoize different things. useMemo caches a computed value; useCallback caches a function reference." },
      { type: "code", content: `// useMemo — expensive calculation
const filteredList = useMemo(() =>
  items.filter(item => item.active && item.name.includes(search)),
  [items, search]
);

// useCallback — stable function reference
const handleClick = useCallback((id: string) => {
  dispatch({ type: "SELECT", payload: id });
}, [dispatch]);` },
      { type: "heading", content: "Custom Hooks" },
      { type: "paragraph", content: "Custom hooks let you extract and reuse stateful logic across components. If you find yourself copy-pasting logic, it's time for a custom hook." },
      { type: "quote", content: "Custom hooks are the most underused pattern in React development." },
    ],
  },
  {
    id: 8,
    slug: "css-grid-vs-flexbox-when-to-use-what",
    title: "CSS Grid vs Flexbox — When to Use What",
    category: "CSS",
    date: "Aug 3, 2024",
    readTime: "6 min read",
    views: "6.4K",
    likes: 48,
    image: "/i1.png",
    excerpt: "Stop guessing which layout tool to use. Here's the definitive mental model for choosing Grid vs Flexbox.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["CSS", "Grid", "Flexbox", "Layout"],
    content: [
      { type: "paragraph", content: "The Grid vs Flexbox debate has a simple answer: they solve different problems. Use Flexbox for one-dimensional layouts (row OR column). Use Grid for two-dimensional layouts (rows AND columns)." },
      { type: "heading", content: "Flexbox — One Dimension" },
      { type: "list", content: "", items: ["Navigation bars", "Button groups", "Centering a single item", "Distributing items along one axis"] },
      { type: "heading", content: "CSS Grid — Two Dimensions" },
      { type: "list", content: "", items: ["Page layouts", "Card grids", "Dashboard panels", "Anything needing row AND column control"] },
      { type: "code", content: `/* Flexbox: nav items in a row */
.navbar { display: flex; align-items: center; gap: 1rem; }

/* Grid: card layout */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}` },
      { type: "quote", content: "Flexbox is for components. Grid is for layouts." },
    ],
  },
  {
    id: 9,
    slug: "getting-started-with-typescript-in-nextjs",
    title: "Getting Started with TypeScript in Next.js",
    category: "TypeScript",
    date: "Jul 20, 2024",
    readTime: "8 min read",
    views: "4.2K",
    likes: 37,
    image: "/i1.png",
    excerpt: "TypeScript might feel daunting at first, but it makes your Next.js codebase dramatically safer and easier to maintain.",
    author: {
      name: "Aleecia Mariam",
      role: "Frontend Developer",
      bio: "Passionate about building beautiful, performant web experiences. Sharing insights on Next.js, TypeScript, and modern design systems.",
    },
    tags: ["TypeScript", "Next.js", "Beginners"],
    content: [
      { type: "paragraph", content: "TypeScript adds static typing to JavaScript. In a Next.js project, it catches bugs at compile time instead of runtime — saving hours of debugging." },
      { type: "heading", content: "Setup" },
      { type: "paragraph", content: "Next.js has first-class TypeScript support. Just rename any file from .js to .tsx and Next.js will auto-configure TypeScript for you." },
      { type: "heading", content: "Essential Types to Know" },
      { type: "list", content: "", items: ["Interface vs Type — use interface for objects, type for unions/primitives", "React.FC is discouraged — type props directly", "Use 'as const' for readonly arrays and objects", "Generics unlock reusable, type-safe utilities"] },
      { type: "code", content: `// Typing page props (App Router)
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

export default function BlogPage({ params }: PageProps) {
  return <div>{params.slug}</div>;
}` },
    ],
  },
];

// ─── HELPER FUNCTIONS (replace these with DB calls later) ────────────────────

/** Get all blogs — replace with: return await db.blog.findMany() */
export function getAllBlogs(): Blog[] {
  return blogsData;
}

/** Get single blog by slug — replace with: return await db.blog.findUnique({ where: { slug } }) */
export function getBlogBySlug(slug: string): Blog | undefined {
  return blogsData.find((b) => b.slug === slug);
}

/** Get related blogs (excluding current) */
export function getRelatedBlogs(currentSlug: string, count = 3): Blog[] {
  return blogsData.filter((b) => b.slug !== currentSlug).slice(0, count);
}