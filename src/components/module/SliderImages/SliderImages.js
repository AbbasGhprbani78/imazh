import React, { useRef } from "react";
import styles from "./SLiderImages.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default function SliderImages({ heightStyle, imagesItem }) {
  const swiperRef = useRef(null);

  const handleNextSlide = () => swiperRef.current?.swiper.slideNext();
  const handlePrevSlide = () => swiperRef.current?.swiper.slidePrev();



  return (
    <>
      <div className={styles.slider_container}>
        <Swiper
          ref={swiperRef}
          loop={true}
          slidesPerView={1}
          className={`${styles.swiper_slider} ${styles[heightStyle]}`}
          dir="ltr"
        >
          {imagesItem &&
            imagesItem.length > 0 &&
            imagesItem.map((item) => {
              const isImage = /\.(jpeg|jpg|webp|png|data:image)/i.test(item.url);

              return (
                <SwiperSlide
                  className={styles.image_item_wrapper}
                  key={item.id}
                >
                  {isImage ? (
                    <Image
                      width={300}
                      height={300}
                      className={`${styles.image_item} `}
                      src={item.url}
                      alt="image_operation"
                    />
                  ) : (
                    <ReactPlayer
                      url={item.url} 
                      playing={false}
                      muted={false}
                      playsinline
                      preload="metadata"
                      className={styles.image_item}
                      controls={true}
                      width="100%"
                      height="100%"
                    />
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>

        <div className={styles.custom_buttons}>
          <button
            className={`${styles.prev_button} ${styles.btn_slide}`}
            onClick={handleNextSlide}
          >
            <KeyboardArrowRightIcon className={styles.arrowIcon} />
          </button>
          <button
            className={`${styles.next_button} ${styles.btn_slide}`}
            onClick={handlePrevSlide}
          >
            <KeyboardArrowLeftIcon className={styles.arrowIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
