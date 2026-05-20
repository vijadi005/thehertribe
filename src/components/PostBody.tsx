import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { FullPost } from "@/lib/posts";

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <p className="pull">{children}</p>,
  },
  marks: {
    em: ({ children }) => <em className="fancy">{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PostBody({ post }: { post: FullPost }) {
  if (post.html) {
    return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
  }

  if (post.portable && post.portable.length > 0) {
    return <PortableText value={post.portable} components={portableComponents} />;
  }

  return (
    <>
      {(post.blocks || []).map((block, i) => {
        if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
        if (block.type === "quote")
          return (
            <p key={i} className="pull">
              {block.text}
            </p>
          );
        return <p key={i}>{block.text}</p>;
      })}
    </>
  );
}
