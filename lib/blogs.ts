 import { supabase } from './supabaseClient'

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
  read_time: string;
  views: string;
  likes: number;
  image: string;
  excerpt: string;
  author: { name: string; role: string; bio: string };
  content: BlogSection[];
  tags: string[];
}

// Saare blogs Supabase se
export async function getAllBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

// Related blogs
export async function getRelatedBlogs(slug: string, limit = 3): Promise<Blog[]> {
  const current = await getBlogBySlug(slug)
  if (!current) return []

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('category', current.category)
    .neq('slug', slug)
    .limit(limit)

  if (error) return []
  return data || []
}