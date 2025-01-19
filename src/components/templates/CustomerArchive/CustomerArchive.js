"use client";
import RightSection from "@/components/module/RightSection/RightSection";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CustomerArchive.module.css";
import { Box } from "@mui/material";
import Modal from "@/components/module/Modal/Modal";
import DisplayPhoto from "@/components/module/DisplayPhoto/DisplayPhoto";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Preview from "@/components/module/Preview/Preview";
import ModalBottom from "@/components/module/ModalBottom/ModalBottom";
import TextComponent from "@/components/module/TextComponent/TextComponent";
import Image from "next/image";
import CampareImage from "@/components/module/CampareImage/CampareImage";
import AditPicture from "@/components/module/AditPicture/AditPicture";
import NormalDropDown from "@/components/module/DropDown/NormalDropDown";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { FaDownload } from "react-icons/fa6";
import dynamic from "next/dynamic";
import Button2 from "@/components/module/Buttons/Button2";
import { MdTune } from "react-icons/md";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { isImageUrl } from "@/utils/helper";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function CustomerArchive({ id }) {
  const [isLoadingGroup1, setIsLoadingGroup1] = useState(true);
  const [isLoadingGroup2, setIsLoadingGroup2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [archiveDetails, setArchiveDetails] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [items, setItems] = useState([]);
  const [isHide, setIsHide] = useState(false);
  const [filters, setFilters] = useState({
    contrast: 100,
    brightness: 100,
    grayscale: 0,
    saturation: 100,
    sepia: 0,
    hue: 0,
    opacity: 100,
  });
  const [currentIndexes, setCurrentIndexes] = useState({
    group1: 0,
    group2: 0,
  });
  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);

  const handleSlide = (direction) => {
    setCurrentIndexes((prev) => {
      const newIndexes = { ...prev };

      [1, 2].forEach((group) => {
        const groupKey = `group${group}`;
        const groupImages = archiveDetails?.photos?.filter(
          (img) => img.group === group
        );
        const newIndex = prev[groupKey] + direction;

        newIndexes[groupKey] =
          (newIndex + groupImages.length) % groupImages.length;
      });

      return newIndexes;
    });
  };

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
    setIsHide((prev) => !prev);
  };

  const toggleModalBottom = () => {
    setIsVisible(!isVisible);
  };

  const handleChangeDisplay = (e) => {
    const { name, value } = e.target;
    setDisplayType(value);
  };

  const saveImage = (id) => {
    const element = document.getElementById(id);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const imgElement = element;
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;

    ctx.filter = `
  contrast(${filters.contrast}%) brightness(${filters.brightness}%) grayscale(${filters.grayscale}%) 
  saturate(${filters.saturation}%) sepia(${filters.sepia}%) hue-rotate(${filters.hue}deg) opacity(${filters.opacity}%)
`;

    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    const extension = imgElement.src.split(".").pop().toLowerCase();

    const downloadFilename = `edited-image.${extension}`;

    canvas.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = downloadFilename;
      link.click();
    });
  };

  const fullContrastGrayscale = () => {
    setFilters((prev) => ({
      ...prev,
      contrast: 200,
      grayscale: 100,
    }));
  };

  const captureScreenshot = () => {
    const video = playerRef.current.getInternalPlayer();
    if (video && video.videoWidth && video.videoHeight) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "screenshot.png";
      link.click();
    }
  };

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

  const group1Images =
    archiveDetails?.photos?.filter((img) => img.group === 1) || [];
  const group2Images =
    archiveDetails?.photos?.filter((img) => img.group === 2) || [];

  const imageUrl = group1Images[currentIndexes?.group1]?.url;
  const imageUrl2 = group2Images[currentIndexes?.group2]?.url;
  const isImage = isImageUrl(imageUrl);
  const isImage2 = isImageUrl(imageUrl2);

  useEffect(() => {
    if (imageUrl) setIsLoadingGroup1(false);
    if (imageUrl2) setIsLoadingGroup2(false);

    let newItems = [];
    if (group2Images.length === 0) {
      newItems = [{ id: "قبل عمل", name: "قبل عمل" }];
    } else if (!isImage || !isImage2) {
      newItems = [
        { id: "کنارهم", name: "کنارهم" },
        { id: "قبل عمل", name: "قبل عمل" },
        { id: "بعد عمل", name: "بعد عمل" },
      ];
    } else {
      newItems = [
        { id: "کنارهم", name: "کنارهم" },
        { id: "روی هم", name: "روی هم" },
        { id: "قبل عمل", name: "قبل عمل" },
        { id: "بعد عمل", name: "بعد عمل" },
      ];
    }

    setItems(newItems);
    setDisplayType(newItems[0]?.id || "");
  }, [imageUrl2, imageUrl, isImage, isImage2]);

  useEffect(() => {
    const getArchiveDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/archive/${id}`
        );
        if (response.status === 200) {
          setArchiveDetails(response.data.archive);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getArchiveDetails();
  }, []);

  

  return (
    <>
      <div className="wrapper">
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Grid
            container
            spacing={2.5}
            sx={{
              display: "flex",
              alignItems: "stretch",
              flexWrap: "wrap",
              height: "100%",
              rowGap: "0",
            }}
          >
            <Grid
              size={{ xs: 12, md: 4, lg: 2.3 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <RightSection style={"archive"}>
                <div className={styles.content_right}>
                  <TextComponent
                    text={archiveDetails?.setting?.description}
                    lable={"حالت ضبط"}
                  />
                  <div className={styles.wrap_display}>
                    <div style={{ marginBottom: "2rem" }}>
                      <NormalDropDown
                        items={items}
                        name={""}
                        onChange={handleChangeDisplay}
                        value={displayType}
                        title="نحوه نمایش "
                      />
                    </div>
                  </div>
                  {(isImage || isImage2) && (
                    <>
                      <div className={styles.wrap_actions}>
                        <AditPicture
                          filters={filters}
                          setFilters={setFilters}
                        />
                      </div>
                      <div>
                        <Button2
                          onClick={fullContrastGrayscale}
                          icon={MdTune}
                        />
                      </div>
                    </>
                  )}
                </div>
              </RightSection>
            </Grid>
            <Grid size={{ xs: 12, md: 8, lg: 9.7 }} className={styles.left_sec}>
              <Grid
                className={`${styles.wrap_images} ${
                  isFullScreen && styles.fullScreen
                }`}
                container
                spacing={2.5}
              >
                {displayType == "کنارهم" ? (
                  <>
                    {isImage && isImage2 && (
                      <div className={styles.full_btn}>
                        <Button2
                          onClick={() => setIsFullScreen((prev) => !prev)}
                          icon={ZoomOutMapIcon}
                        />
                      </div>
                    )}
                    <Grid
                      size={{ xs: 12, lg: 6 }}
                      className={`${styles.Preview_item}`}
                      style={{
                        display: expandedIndex === 2 ? "none" : "block",
                      }}
                    >
                      <Preview
                        toggleExpand={() => toggleExpand(1)}
                        isExpanded={expandedIndex === 1}
                        toggleModalBottom={toggleModalBottom}
                        isHide={isHide}
                      >
                        {isLoadingGroup1 && (
                          <div className={styles.placeholder}>
                            <Image
                              src="/images/1.svg"
                              alt="Loading Group 1"
                              layout="fill"
                              className={styles.image_placeholder}
                            />
                          </div>
                        )}
                        {isImage ? (
                          <Image
                            id="group1-image"
                            src={group1Images[currentIndexes?.group1]?.url}
                            alt={`Group 1 - ${currentIndexes?.group1}`}
                            layout="fill"
                            className={styles.image_archive}
                            style={{
                              display: isLoadingGroup1 ? "none" : "block",
                              ...getFilterStyle(),
                            }}
                          />
                        ) : (
                          <>
                            <ReactPlayer
                              ref={playerRef}
                              url={group1Images[currentIndexes?.group1]?.url}
                              playing={false}
                              muted={false}
                              playsinline
                              preload="auto"
                              className={styles.image_archive}
                              controls={true}
                              width="100%"
                              height="100%"
                            />
                          </>
                        )}
                        {!isImage && (
                          <div className={styles.wrap_btn_camera}>
                            <Button2
                              onClick={captureScreenshot}
                              icon={CameraAltIcon}
                            />
                          </div>
                        )}
                      </Preview>
                      {isImage && (
                        <div className={styles.wrap_action_image}>
                          <div
                            className={styles.option_item_img}
                            onClick={() => toggleExpand(1)}
                          >
                            <ZoomOutMapIcon className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              بزرگنمایی
                            </span>
                          </div>

                          <div
                            className={styles.option_item_img}
                            onClick={() => saveImage("group1-image")}
                          >
                            <FaDownload className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              دانلود
                            </span>
                          </div>
                        </div>
                      )}
                    </Grid>
                    <Grid
                      size={{ xs: 12, lg: 6 }}
                      className={`${styles.Preview_item}`}
                      style={{
                        display: expandedIndex === 1 ? "none" : "block",
                      }}
                    >
                      <Preview
                        toggleExpand={() => toggleExpand(2)}
                        isExpanded={expandedIndex === 2}
                        toggleModalBottom={toggleModalBottom}
                        isHide={isHide}
                      >
                        {isLoadingGroup2 && (
                          <div className={styles.placeholder}>
                            <Image
                              src="/images/1.svg"
                              alt="Loading Group 2"
                              layout="fill"
                              className={styles.image_placeholder}
                            />
                          </div>
                        )}
                        {isImage2 ? (
                          <Image
                            id="group2-image"
                            src={group2Images[currentIndexes?.group2]?.url}
                            alt={`Group 2 - ${currentIndexes?.group2}`}
                            layout="fill"
                            className={styles.image_archive}
                            style={{
                              display: isLoadingGroup2 ? "none" : "block",
                              ...getFilterStyle(),
                            }}
                          />
                        ) : (
                          <>
                            <ReactPlayer
                              url={group2Images[currentIndexes?.group2]?.url}
                              playing={false}
                              muted={false}
                              playsinline
                              preload="metadata"
                              className={styles.image_archive}
                              controls={true}
                              width="100%"
                              height="100%"
                            />
                          </>
                        )}
                      </Preview>
                      {isImage2 && (
                        <div className={styles.wrap_action_image}>
                          <div
                            className={styles.option_item_img}
                            onClick={() => toggleExpand(2)}
                          >
                            <ZoomOutMapIcon className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              بزرگنمایی
                            </span>
                          </div>

                          <div
                            className={styles.option_item_img}
                            onClick={() => saveImage("group2-image")}
                          >
                            <FaDownload className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              دانلود
                            </span>
                          </div>
                        </div>
                      )}
                      {!isImage2 && (
                        <div className={styles.wrap_btn_camera}>
                          <Button2
                            onClick={captureScreenshot}
                            icon={CameraAltIcon}
                          />
                        </div>
                      )}
                    </Grid>
                  </>
                ) : displayType == "روی هم" ? (
                  <>
                    <Preview
                      toggleExpand={() => toggleExpand(3)}
                      isExpanded={expandedIndex === 3}
                      toggleModalBottom={toggleModalBottom}
                      isHide={"true"}
                    >
                      <CampareImage
                        beforeImage={group1Images[currentIndexes?.group1]?.url}
                        afterImage={group2Images[currentIndexes?.group2]?.url}
                        getFilterStyle={getFilterStyle}
                        filters={filters}
                      />
                    </Preview>
                  </>
                ) : displayType == "قبل عمل" ? (
                  <>
                    <Grid
                      size={{ xs: 12 }}
                      className={`${styles.Preview_item}`}
                      style={{
                        display: expandedIndex === 2 ? "none" : "block",
                      }}
                      ref={videoContainerRef}
                    >
                      <Preview
                        toggleExpand={() => toggleExpand(1)}
                        isExpanded={expandedIndex === 1}
                        toggleModalBottom={toggleModalBottom}
                        isHide={isHide}
                      >
                        {isLoadingGroup1 && (
                          <div className={styles.placeholder}>
                            <Image
                              src="/images/1.svg"
                              alt="Loading Group 1"
                              layout="fill"
                              className={styles.image_placeholder}
                            />
                          </div>
                        )}
                        {isImage ? (
                          <Image
                            id="group1-image"
                            src={group1Images[currentIndexes?.group1]?.url}
                            alt={`Group 1 - ${currentIndexes?.group1}`}
                            layout="fill"
                            className={styles.image_archive}
                            style={{
                              display: isLoadingGroup1 ? "none" : "block",
                              ...getFilterStyle(),
                            }}
                          />
                        ) : (
                          <>
                            <ReactPlayer
                              url={group1Images[currentIndexes?.group1]?.url}
                              playing={false}
                              muted={false}
                              playsinline
                              preload="metadata"
                              className={styles.image_archive}
                              controls={true}
                              width="100%"
                              height="100%"
                            />
                          </>
                        )}
                      </Preview>

                      {isImage && (
                        <div className={styles.wrap_action_image}>
                          <div
                            className={styles.option_item_img}
                            onClick={() => toggleExpand(1)}
                          >
                            <ZoomOutMapIcon className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              بزرگنمایی
                            </span>
                          </div>
                          <div
                            className={styles.option_item_img}
                            onClick={() => saveImage("group1-image")}
                          >
                            <FaDownload className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              دانلود
                            </span>
                          </div>
                        </div>
                      )}
                      {!isImage && (
                        <div className={styles.wrap_btn_camera}>
                          <Button2
                            onClick={captureScreenshot}
                            icon={CameraAltIcon}
                          />
                        </div>
                      )}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      size={{ xs: 12 }}
                      className={`${styles.Preview_item}`}
                      style={{
                        display: expandedIndex === 1 ? "none" : "block",
                      }}
                    >
                      <Preview
                        toggleExpand={() => toggleExpand(2)}
                        isExpanded={expandedIndex === 2}
                        toggleModalBottom={toggleModalBottom}
                        isHide={isHide}
                      >
                        {isLoadingGroup2 && (
                          <div className={styles.placeholder}>
                            <Image
                              src="/images/1.svg"
                              alt="Loading Group 2"
                              layout="fill"
                              className={styles.image_placeholder}
                            />
                          </div>
                        )}
                        {isImage2 ? (
                          <Image
                            id="group2-image"
                            src={group2Images[currentIndexes?.group2]?.url}
                            alt={`Group 2 - ${currentIndexes?.group2}`}
                            layout="fill"
                            className={styles.image_archive}
                            style={{
                              display: isLoadingGroup2 ? "none" : "block",
                              ...getFilterStyle(),
                            }}
                          />
                        ) : (
                          <>
                            <ReactPlayer
                              url={group2Images[currentIndexes?.group2]?.url}
                              playing={false}
                              muted={false}
                              playsinline
                              preload="metadata"
                              className={styles.image_archive}
                              controls={true}
                              width="100%"
                              height="100%"
                            />
                          </>
                        )}
                      </Preview>
                      {isImage2 && (
                        <div className={styles.wrap_action_image}>
                          <div
                            className={styles.option_item_img}
                            onClick={() => toggleExpand(2)}
                          >
                            <ZoomOutMapIcon className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              بزرگنمایی
                            </span>
                          </div>

                          <div
                            className={styles.option_item_img}
                            onClick={() => saveImage("group2-image")}
                          >
                            <FaDownload className={styles.icon_option} />
                            <span className={styles.text_option_item_img}>
                              دانلود
                            </span>
                          </div>
                        </div>
                      )}
                      {!isImage2 && (
                        <div className={styles.wrap_btn_camera}>
                          <Button2
                            onClick={captureScreenshot}
                            icon={CameraAltIcon}
                          />
                        </div>
                      )}
                    </Grid>
                  </>
                )}
                <button
                  className={`${styles.button_arrow} ${styles.button_arrow_right}`}
                  onClick={() => handleSlide(-1)}
                >
                  <ArrowForwardIosIcon className={styles.arrow_icon} />
                </button>
                <button
                  className={`${styles.button_arrow} ${styles.button_arrow_left}`}
                >
                  <ArrowBackIosNewIcon
                    className={styles.arrow_icon}
                    onClick={() => handleSlide(1)}
                  />
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Modal
        title={"افزودن حالت ضبط"}
        onClick={() => setShowModal(false)}
        showModal={showModal}
      ></Modal>
      <ModalBottom isVisible={isVisible} setIsVisible={setIsVisible}>
        <TextComponent
          text={archiveDetails?.setting?.description}
          lable={"حالت ضبط"}
        />
        <div className={styles.wrap_display}>
          <div style={{ marginBottom: "2rem" }}>
            <NormalDropDown
              items={items}
              onChange={handleChangeDisplay}
              value={displayType}
              title="نحوه نمایش "
            />
          </div>
        </div>
        <div className={styles.wrap_actions}>
          <AditPicture filters={filters} setFilters={setFilters} />
        </div>
      </ModalBottom>
    </>
  );
}

//download video

// () => {
//   const videoUrl = group1Images[currentIndexes?.group1]?.url;

//   const fileExtension = videoUrl.split(".").pop();

//   const a = document.createElement("a");
//   a.href = videoUrl;
//   a.download = `group1-video-${currentIndexes?.group1}.${fileExtension}`;
//   a.click();
// };
