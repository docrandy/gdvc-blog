import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function getPosts() {
  const postsDir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDir)) return [];
  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx?$/, "");
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function Home() {
  const posts = getPosts();
  return (
    <main>
      {posts.length === 0 ? (
        <p style={{ color: "#666" }}>No posts yet. The pipeline is ready.</p>
      ) : (
        posts.map((post) => (
          <article key={post.slug} style={{ marginBottom: "2rem" }}>
            <Link
              href={`/posts/${post.slug}`}
              style={{ textDecoration: "none", color: "#1a1a1a" }}
            >
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
                {post.title}
              </h2>
            </Link>
            <p style={{ color: "#666", fontSize: "0.85rem", margin: 0 }}>
              {post.date} &middot; {post.tags?.join(", ")}
            </p>
            {post.description && (
              <p style={{ marginTop: "0.5rem" }}>{post.description}</p>
            )}
          </article>
        ))
      )}
    </main>
  );
}
