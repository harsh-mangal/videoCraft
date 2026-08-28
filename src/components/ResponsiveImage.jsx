import { imageUrl, imageSrcSet } from "../utils/images";
import dimensions from "../config/imageDimensions.json";

export default function ResponsiveImage({ src, alt, width = 960, height, sizes, priority = false, loading, decoding = "async", ...props }) {
  const original = dimensions[src?.split("?")[0]];
  const fixedWidth = Number(props.className?.match(/(?:^|\s)w-(\d+)(?:\s|$)/)?.[1]) * 4;
  const maxWidth = fixedWidth ? Math.min(width, fixedWidth * 2) : width;
  const imageSizes = sizes || (fixedWidth ? fixedWidth + "px" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw");
  return <img {...props} src={imageUrl(src, maxWidth)} srcSet={imageSrcSet(src, maxWidth)}
    sizes={imageSizes} width={original?.[0] || width} height={height || original?.[1] || Math.round(width * 1.25)} alt={alt}
    loading={priority ? "eager" : loading || "lazy"} decoding={decoding} fetchPriority={priority ? "high" : undefined} />;
}
