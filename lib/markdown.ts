import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export async function getAllPosts() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  const posts = filenames.map((filename) => {
    const file = fs.readFileSync(path.join(postsDir, filename), "utf8");
    const { content, data } = matter(file);
    return { slug: filename.replace(".mdx", ""), title: data.title, description: data.description, date: data.date, readingTime: data.readingTime, body: content };
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string) {
  const file = fs.readFileSync(path.join(process.cwd(), "posts", `${slug}.mdx`), "utf8");
  const { content, data } = matter(file);
  const processed = await unified().use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(content);
  return { ...data, body: processed.toString(), slug };
}
