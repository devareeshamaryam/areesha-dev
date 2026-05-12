 import { notFound } from "next/navigation";
import BlogDetailPage from "@/components/Blogdetailpage";
import { getBlogBySlug, getRelatedBlogs, getAllBlogs } from "@/lib/blogs";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({ slug: blog.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    if (!blog) return { title: "Blog Not Found" };
    return {
      title: `${blog.title} | Blog`,
      description: blog.excerpt || blog.title,
    };
  } catch (error) {
    return { title: "Blog Not Found" };
  }
}

export default async function BlogDetailPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) notFound();

    const relatedBlogsData = await getRelatedBlogs(slug, 3);
    const relatedBlogs = relatedBlogsData.map((post) => ({
      id: post.slug,
      title: post.title,
      date: post.date,
      coverImage: post.image,
      views:
        typeof post.views === "string"
          ? parseInt(post.views.replace("K", "000"))
          : post.views,
    }));

    const blogData = {
      title: blog.title,
      category: blog.category,
      date: blog.date,
      readTime: blog.read_time,
      excerpt: blog.excerpt || "", // ✅ add kiya
      views:
        typeof blog.views === "string"
          ? parseInt(blog.views.replace("K", "000"))
          : parseInt(blog.views),
      likes: blog.likes,
      coverImage: blog.image,
      author: {
        name: blog.author.name,
        avatar: "/avatar.png",
        role: blog.author.role,
      },
      content: blog.content || [],
      contentHtml: (blog as any).content_html,
      tags: Array.isArray(blog.tags) ? blog.tags : [],
    };

    return <BlogDetailPage blog={blogData} relatedBlogs={relatedBlogs} />;
  } catch (error) {
    console.error("Error loading blog:", error);
    notFound();
  }
}