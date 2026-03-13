import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getPost(slug) {
  const postsDir = path.join(process.cwd(), "content/posts");
  const mdx = path.join(postsDir, `${slug}.mdx`);
  const md = path.join(postsDir, `${slug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : md;
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...data, content };
}

function getAllSlugs() {
  const postsDir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function renderMarkdown(content) {
  // Simple markdown to HTML: headings, paragraphs, bold, italic
  return content
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
      if (block.startsWith("# ")) return `<h1>${block.slice(2)}</h1>`;
      block = block.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      block = block.replace(/\*(.+?)\*/g, "<em>$1</em>");
      return `<p>${block.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) return <p>Post not found.</p>;
  return (
    <article>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>
        {post.title}
      </h1>
      <p style={{ color: "#666", fontSize: "0.85rem" }}>
        {post.date} &middot; {post.tags?.join(", ")}
      </p>
      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
    </article>
  );
}
