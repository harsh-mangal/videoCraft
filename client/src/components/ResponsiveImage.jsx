import { managedImageUrl, managedImageSrcSet } from "../utils/images";
import { useMediaImage } from "./MediaProvider";

export default function ResponsiveImage({ src, alt, width = 960, height, sizes, priority = false, loading, decoding = "async", ...props }) {
  const image = useMediaImage(src);
  const fixedWidth = Number(props.className?.match(/(?:^|\s)w-(\d+)(?:\s|$)/)?.[1]) * 4;
  const maxWidth = fixedWidth ? Math.min(width, fixedWidth * 2) : width;
  const imageSizes = sizes || (fixedWidth ? fixedWidth + "px" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw");
  const imageElement = <img {...props} data-media-id={image.id} src={managedImageUrl(image, maxWidth)} srcSet={managedImageSrcSet(image, maxWidth, "webp")}
    sizes={imageSizes} width={image.width || width} height={image.replaced ? image.height : height || image.height || Math.round(width * 1.25)} alt={alt === "" ? "" : image.alt ?? alt}
    loading={priority ? "eager" : loading || "lazy"} decoding={decoding} fetchPriority={priority ? "high" : undefined} />;
  const avifSrcSet = managedImageSrcSet(image, maxWidth, "avif");
  return avifSrcSet ? <picture><source type="image/avif" srcSet={avifSrcSet} sizes={imageSizes} />{imageElement}</picture> : imageElement;
}
