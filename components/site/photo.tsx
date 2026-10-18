import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function Photo({ src, alt, sizes, priority = false, className = "object-cover" }: PhotoProps) {
  if (!src) return null;
  if (src.startsWith("https://images.unsplash.com/")) {
    return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />;
  }

  return (
    // Studio uploads can come from any https host. Next/Image only optimises known hosts.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} />
  );
}
