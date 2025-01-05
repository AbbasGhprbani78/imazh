import styles from "./CampareImage.module.css";
import ReactCompareImage from "react-compare-image";
export default function CampareImage() {
  const beforeImage = "/uploads/1735986810028-1735986808732-2a6lns6yb.png";
  const afterImage = "/uploads/1736056667027-1736056665866-akphut3ne.png";
  return (
    <div className={styles.wrap_campare}>
      <ReactCompareImage
        aspectRatio="wider"
       
        leftImageCss={{ objectFit: "cover" }}
        rightImageCss={{ objectFit: "cover" }}
        leftImage={beforeImage}
        rightImage={afterImage}
        className={styles.wrap}
      />
    </div>
  );
}


