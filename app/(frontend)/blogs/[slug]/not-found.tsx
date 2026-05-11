import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Blog Not Found</h2>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist yet.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/blogs"
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Blogs
          </Link>
          <Link
            href="/dashboard"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
