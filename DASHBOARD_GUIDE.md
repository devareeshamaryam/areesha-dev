# Blog Dashboard Guide

## Overview
Your portfolio now has a fully functional blog dashboard integrated with Supabase for managing blog posts.

## Features

### 1. Dashboard (`/dashboard`)
- **Create New Blogs**: Add blog posts with a rich text editor
- **Edit Existing Blogs**: Update any blog post
- **Delete Blogs**: Remove unwanted posts
- **View Stats**: See total blogs, views, and likes
- **Rich Text Editor**: Format content with:
  - Bold, Italic, Underline
  - Headings (H1, H2, H3)
  - Bullet and Numbered Lists
  - Links
  - Clear Formatting

### 2. Blog Pages
- **Home Page** (`/`): Shows latest 6 blogs
- **All Blogs** (`/blogs`): Displays all blog posts
- **Blog Detail** (`/blogs/[slug]`): Shows individual blog with formatted HTML content

## How to Use

### Creating a Blog Post
1. Go to `/dashboard`
2. Click "Add New Blog"
3. Fill in the form:
   - **Title**: Blog post title (slug auto-generated)
   - **Category**: e.g., "Next.js / React"
   - **Read Time**: e.g., "8 min read"
   - **Cover Image URL**: Image path or URL
   - **Tags**: Comma-separated tags
   - **Excerpt**: Short description
   - **Content**: Use the rich text editor to format your content
4. Click "Create Blog"

### Editing a Blog Post
1. Go to `/dashboard`
2. Find the blog in the table
3. Click the edit icon (pencil)
4. Update the fields
5. Click "Update Blog"

### Deleting a Blog Post
1. Go to `/dashboard`
2. Find the blog in the table
3. Click the delete icon (trash)
4. Confirm deletion

## Database Structure

Your Supabase `blogs` table should have these columns:
- `id` (int, primary key)
- `slug` (text, unique)
- `title` (text)
- `category` (text)
- `date` (text)
- `read_time` (text)
- `views` (text)
- `likes` (int)
- `image` (text)
- `excerpt` (text)
- `content_html` (text) - Stores the rich HTML content
- `tags` (jsonb or text[])
- `author` (jsonb)
- `content` (jsonb)
- `created_at` (timestamp)

## Frontend Display

The blog detail page automatically detects if `content_html` exists:
- If `content_html` is present: Displays formatted HTML
- If not: Falls back to the old `content` array format

## Styling

The rich text content is styled with Tailwind's prose classes for:
- Proper heading hierarchy
- Readable paragraphs
- Styled lists
- Formatted links
- Code blocks
- Blockquotes

## Navigation

- **Dashboard to Home**: Click "Home" button in dashboard header
- **Home to Dashboard**: Navigate to `/dashboard`
- **View Blog**: Click the external link icon in the dashboard table

## Tips

1. **Images**: Upload images to Supabase Storage or use external URLs
2. **Slugs**: Auto-generated from titles, but you can customize in Supabase
3. **Tags**: Use comma-separated values for better organization
4. **Content**: Use the editor toolbar for rich formatting
5. **Preview**: Click the view icon to see how your blog looks live

## Troubleshooting

- **Blogs not showing**: Check Supabase connection in `.env.local`
- **Editor not working**: Ensure JavaScript is enabled
- **Images not loading**: Verify image URLs are correct
- **Formatting issues**: Check the `content_html` field in Supabase

## Next Steps

1. Add more blogs through the dashboard
2. Customize the editor toolbar if needed
3. Add image upload functionality
4. Implement blog search/filter
5. Add categories page
