export const metadata = {
  title: "GDVC Blog",
  description:
    "The Volitional Chain — understanding why motivated people get stuck",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          maxWidth: "680px",
          margin: "0 auto",
          padding: "2rem",
          lineHeight: 1.7,
          color: "#1a1a1a",
        }}
      >
        <header
          style={{
            marginBottom: "3rem",
            borderBottom: "1px solid #eee",
            paddingBottom: "1rem",
          }}
        >
          <a href="/" style={{ textDecoration: "none", color: "#1a1a1a" }}>
            <h1 style={{ fontSize: "1.5rem", margin: 0 }}>GDVC Blog</h1>
          </a>
          <p
            style={{ color: "#666", margin: "0.25rem 0 0", fontSize: "0.9rem" }}
          >
            The Volitional Chain — why motivated people get stuck
          </p>
        </header>
        {children}
      </body>
    </html>
  );
}
