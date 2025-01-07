"use client";
import DropDownSearch from "@/components/module/DropDown/DropDownSearch";
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

export default function CustomerArchive({ id }) {
  const [isLoadingGroup1, setIsLoadingGroup1] = useState(true);
  const [isLoadingGroup2, setIsLoadingGroup2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [archiveDetails, setArchiveDetails] = useState("");
  const [displayType, setDisplayType] = useState(1);
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
  };

  const toggleModalBottom = () => {
    setIsVisible(!isVisible);
  };

  const handleChangeDisplay = (e) => {
    const { name, value } = e.target;
    setDisplayType(value);
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
                      <DropDownSearch
                        firstoptiontext=""
                        firstoptionclick={""}
                        items={[
                          { id: 1, name: "کنارهم" },
                          { id: 2, name: "روی هم" },
                          { id: 3, name: "قبل عمل" },
                          { id: 4, name: "بعد عمل" },
                        ]}
                        title="نحوه نمایش عکس‌ها"
                        getOptionLabelProp="name"
                        name={"displayType"}
                        onChange={handleChangeDisplay}
                        value={displayType}
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
                {displayType === 1 ? (
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
                        <Image
                          src={group1Images[currentIndexes?.group1]?.url}
                          alt={`Group 1 - ${currentIndexes?.group1}`}
                          layout="fill"
                          className={styles.image_archive}
                          onLoad={() => setIsLoadingGroup1(false)}
                          style={{
                            display: isLoadingGroup1 ? "none" : "block",
                            ...getFilterStyle(),
                          }}
                        />
                      </Preview>
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
                        <Image
                          src={group2Images[currentIndexes?.group2]?.url}
                          alt={`Group 2 - ${currentIndexes?.group2}`}
                          layout="fill"
                          className={styles.image_archive}
                          onLoad={() => setIsLoadingGroup2(false)}
                          style={{
                            display: isLoadingGroup2 ? "none" : "block",
                            ...getFilterStyle(),
                          }}
                        />
                      </Preview>
                    </Grid>
                  </>
                ) : displayType === 2 ? (
                  <>
                    <Preview
                      toggleExpand={() => toggleExpand(3)}
                      isExpanded={expandedIndex === 3}
                      toggleModalBottom={toggleModalBottom}
                    >
                      <CampareImage
                        beforeImage={group1Images[currentIndexes?.group1]?.url}
                        afterImage={group2Images[currentIndexes?.group2]?.url}
                        getFilterStyle={getFilterStyle}
                        filters={filters}
                      />
                    </Preview>
                  </>
                ) : displayType === 3 ? (
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
                        <Image
                          src={group1Images[currentIndexes?.group1]?.url}
                          alt={`Group 1 - ${currentIndexes?.group1}`}
                          layout="fill"
                          className={styles.image_archive}
                          onLoad={() => setIsLoadingGroup1(false)}
                          style={{
                            display: isLoadingGroup1 ? "none" : "block",
                            ...getFilterStyle(),
                          }}
                        />
                      </Preview>
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
                        <Image
                          src={group2Images[currentIndexes?.group2]?.url}
                          alt={`Group 2 - ${currentIndexes?.group2}`}
                          layout="fill"
                          className={styles.image_archive}
                          onLoad={() => setIsLoadingGroup2(false)}
                          style={{
                            display: isLoadingGroup2 ? "none" : "block",
                            ...getFilterStyle(),
                          }}
                        />
                      </Preview>
                    </Grid>
                  </>
                )}
                <div className={styles.wrapper_arrow}>
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
                </div>
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
            <DropDownSearch
              firstoptiontext=""
              firstoptionclick={""}
              items={[
                { id: 1, name: "کنارهم" },
                { id: 2, name: "روی هم" },
                { id: 3, name: "قبل عمل" },
                { id: 4, name: "بعد عمل" },
              ]}
              title="نحوه نمایش عکس‌ها"
              getOptionLabelProp="name"
              name={"displayType"}
              onChange={handleChangeDisplay}
              value={displayType}
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
