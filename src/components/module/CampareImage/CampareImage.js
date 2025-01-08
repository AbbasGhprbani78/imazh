import styles from "./CampareImage.module.css";
import ReactCompareImage from "react-compare-image";
export default function CampareImage({ beforeImage, afterImage, filters }) {
  const getFilterStyle = () => ({
    filter: `
    contrast(${filters.contrast}%)
    brightness(${filters.brightness}%)
    grayscale(${filters.grayscale}%)
    saturate(${filters.saturation}%)
    sepia(${filters.sepia}%)
    hue-rotate(${filters.hue}deg)
    opacity(${filters.opacity}%)
  `,
  });

  return (
    <div className={styles.wrap_campare}>
      <ReactCompareImage
        aspectRatio="wider"
        leftImageCss={{ objectFit: "contain", ...getFilterStyle() }}
        rightImageCss={{ objectFit: "contain", ...getFilterStyle() }}
        leftImage={beforeImage}
        rightImage={afterImage}
        className={styles.wrap}
      />
    </div>
  );
}
