"use client";
import RightSection from "@/components/module/RightSection/RightSection";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
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
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function CustomerArchive({ id }) {
  const [isLoadingGroup1, setIsLoadingGroup1] = useState(true);
  const [isLoadingGroup2, setIsLoadingGroup2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [archiveDetails, setArchiveDetails] = useState("");
  const [displayType, setDisplayType] = useState("کنارهم");
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

  const saveImage = (idImage) => {
    const imgElement = document.getElementById(idImage);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;

    ctx.filter = `
      contrast(${filters.contrast}%) brightness(${filters.brightness}%) grayscale(${filters.grayscale}%) 
      saturate(${filters.saturation}%) sepia(${filters.sepia}%) hue-rotate(${filters.hue}deg) opacity(${filters.opacity}%)
    `;

    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "edited-image.png";
      link.click();
    });
  };

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

  const group1Images =
    archiveDetails?.photos?.filter((img) => img.group === 1) || [];
  const group2Images =
    archiveDetails?.photos?.filter((img) => img.group === 2) || [];

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

  const imageUrl = group1Images[currentIndexes?.group1]?.url;
  const imageUrl2 = group2Images[currentIndexes?.group2]?.url;
  const isImage = /\.(jpeg|jpg|webp|png|data:image)/i.test(imageUrl);
  const isImage2 = /\.(jpeg|jpg|webp|png|data:image)/i.test(imageUrl2);

  useEffect(() => {
    if (imageUrl || imageUrl2) {
      setIsLoadingGroup1(false);
      setIsLoadingGroup2(false);
    }
  }, [imageUrl]);

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
              size={{ xs: 12, md: 4, lg: 3 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <RightSection style={"archive"}>
                <div className={styles.content_right}>
                  <TextComponent
                    text={archiveDetails?.setting?.name}
                    lable={"حالت ضبط"}
                  />
                  <div className={styles.wrap_display}>
                    <div style={{ marginBottom: "2rem" }}>
                      <NormalDropDown
                        items={
                          isImage || isImage2
                            ? [
                                { id: "کنارهم", name: "کنارهم" },
                                { id: "روی هم", name: "روی هم" },
                                { id: "قبل عمل", name: "قبل عمل" },
                                { id: "بعد عمل", name: "بعد عمل" },
                              ]
                            : [
                                { id: "کنارهم", name: "کنارهم" },
                                { id: "قبل عمل", name: "قبل عمل" },
                                { id: "بعد عمل", name: "بعد عمل" },
                              ]
                        }
                        name={""}
                        onChange={handleChangeDisplay}
                        value={displayType}
                        title="نحوه نمایش عکس‌ها"
                      />
                    </div>
                    <DisplayPhoto title={"گرید"} item={"2"} />
                  </div>
                  <div className={styles.wrap_actions}>
                    <AditPicture filters={filters} setFilters={setFilters} />
                  </div>
                </div>
              </RightSection>
            </Grid>
            <Grid size={{ xs: 12, md: 8, lg: 9 }} className={styles.left_sec}>
              <Grid className={styles.wrap_images} container spacing={2.5}>
                {displayType == "کنارهم" ? (
                  <>
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
          text={archiveDetails?.setting?.name}
          lable={"حالت ضبط"}
        />
        <div className={styles.wrap_display}>
          <div style={{ marginBottom: "2rem" }}>
            <NormalDropDown
              items={[
                { id: 1, name: "کنارهم" },
                { id: 2, name: "روی هم" },
                { id: 3, name: "قبل عمل" },
                { id: 4, name: "بعد عمل" },
              ]}
              onChange={handleChangeDisplay}
              value={displayType}
              title="نحوه نمایش عکس‌ها"
            />
          </div>
          <DisplayPhoto title={"گرید"} item={"2"} />
        </div>
        <div className={styles.wrap_actions}>
          <AditPicture filters={filters} setFilters={setFilters} />
        </div>
      </ModalBottom>
    </>
  );
}
