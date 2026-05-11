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

// Helper - parse blog data safely
function parseBlog(data: any): Blog {
  return {
    ...data,
    content: Array.isArray(data.content)
      ? data.content
      : typeof data.content === 'string'
        ? JSON.parse(data.content)
        : [],
    tags: Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === 'string'
        ? JSON.parse(data.tags)
        : [],
    author: typeof data.author === 'string'
      ? JSON.parse(data.author)
      : data.author ?? { name: 'Aleecia Mariam', role: 'Frontend Developer', bio: '' }
  }
}

// Get all blogs from Supabase
export async function getAllBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map(parseBlog)
}

// Get single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!slug) {
    console.error('getBlogBySlug called with empty slug')
    return null
  }

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(`Supabase error fetching blog "${slug}":`, error.message)
    return null
  }

  if (!data) {
    console.error(`No blog found for slug: "${slug}"`)
    return null
  }

  return parseBlog(data)
}

// Get related blogs by category
export async function getRelatedBlogs(slug: string, limit = 3): Promise<Blog[]> {
  const current = await getBlogBySlug(slug)
  if (!current) return []

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('category', current.category)
    .neq('slug', slug)
    .limit(limit)

  if (error) {
    console.error('Supabase error fetching related blogs:', error.message)
    return []
  }

  return (data || []).map(parseBlog)
}