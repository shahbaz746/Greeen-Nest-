import Image from "next/image";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

export const mdxComponents: MDXRemoteProps["components"] = {
  img: (props) => (
    <span className="not-prose my-8 block overflow-hidden rounded-sm border border-bark/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
        loading="lazy"
        className="h-auto w-full"
        alt={props.alt || ""}
      />
    </span>
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-clay-light pl-5 font-serif text-xl italic text-bark"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-moss underline decoration-sage underline-offset-4 hover:text-moss-dark"
      {...props}
    />
  ),
};

export function ResponsivePostImage({
  src,
  alt,
  width = 1200,
  height = 800,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <span className="not-prose my-8 block overflow-hidden rounded-sm border border-bark/10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full"
      />
    </span>
  );
}
