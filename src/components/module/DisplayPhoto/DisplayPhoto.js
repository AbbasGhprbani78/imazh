import React from "react";
import styles from "./DisplayPhoto.module.css";
import InputRadio from "../InputRadio/InputRadio";
export default function DisplayPhoto({ title, item }) {
  return (
    <div className={styles.displayphoto}>
      <span className={styles.title}>{title}</span>
      <div className={styles.item}>
        <InputRadio label={item === "1" ? "کنار هم" : "گرید"} />
        <div className={styles.images_wrap}>
          <div className={styles.img_wrap}>
            <img
              src={item === "1" ? "/images/1.svg" : "/images/2.svg"}
              alt="image"
            />
          </div>
          {item === "1" && (
            <div className={styles.img_wrap}>
              <img src="/images/1.svg" alt="image" />
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.item} ${styles.item2}`}>
        <InputRadio label={item === "1" ? "هم پوشانی" : "صورت"} />
        <div className={styles.images_wrap}>
          <div className={styles.img_wrap}>
            <img src="/images/1.svg" alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
}
