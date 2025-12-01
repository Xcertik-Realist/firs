import Link from "next/link";
import { format } from "date-fns";

// Simple static list for now – works perfectly without Contentlayer
const posts = [
  {
    slug: "nordmann-fir-care-tips",
    title: "Nordmann Fir Care Tips – Zero Needle Drop Until January",
    description: "6 simple rules to keep your tree perfect all season",
    date: "2025-11-10",
    readingTime: 3,
  },
  {
    slug: "when-do-real-christmas-trees-go-on-sale-uk",
    title: "When Do Real Christmas Trees Go on Sale in the UK 2025?",
    description: "Exact dates + best time to order for maximum freshness",
    date: "2025-11-01",
    readingTime: 4,
  },
  // Add more later if you want
];

export default function BlogIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-green-900 text-center mb-4">
        Christmas Tree Guides & Tips
      </h1>
      <p className="text-xl text-center text-gray-700 mb-12">
        Everything you need for the perfect real tree in 2025
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-900 group-hover:text-green-700">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-2">{post.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <time>{format(new Date(post.date), "d MMMM yyyy")}</time>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
