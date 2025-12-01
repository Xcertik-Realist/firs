import { notFound } from "next/navigation";

// Same static data – you can expand later
const posts: any = {
  "nordmann-fir-care-tips": {
    title: "Nordmann Fir Care Tips – Zero Needle Drop Until January",
    date: "2025-11-10",
    readingTime: 3,
    content: `
<h2>6 Simple Rules</h2>
<ol>
  <li><strong>Fresh cut</strong> the base 2–3 cm as soon as you get home</li>
  <li>Put in water <strong>immediately</strong> (stand holding ≥3 litres)</li>
  <li><strong>Never</strong> let the water drop below the base – check daily</li>
  <li>Keep away from radiators, fires, and direct sun</li>
  <li>Use only <strong>LED lights</strong> (no hot bulbs)</li>
  <li>Cool room (10–20 °C) + a little humidity = perfect</li>
</ol>
<p><strong>Do these 6 things → zero meaningful needle drop until mid-January.</strong></p>
    `.trim(),
  },
  "when-do-real-christmas-trees-go-on-sale-uk": {
    title: "When Do Real Christmas Trees Go on Sale in the UK 2025?",
    date: "2025-11-01",
    readingTime: 4,
    content: `
<p>Most UK retailers start selling real Christmas trees from <strong>20–25 November</strong>.</p>
<p>At Scandinavian Firs we begin nationwide delivery <strong>1st December</strong> – the perfect time for maximum freshness that lasts until Twelfth Night.</p>
<p><strong>Pro tip:</strong> Order before 28th November for guaranteed pre-Christmas delivery.</p>
    `.trim(),
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-900 mb-6">{post.title}</h1>
        <div className="text-gray-600">
          <time>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
          <span className="mx-2">•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>
      <div
        className="prose prose-lg max-w-none mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
