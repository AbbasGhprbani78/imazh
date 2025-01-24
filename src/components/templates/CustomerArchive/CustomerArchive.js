"use client";
import RightSection from "@/components/module/RightSection/RightSection";
import Grid from "@mui/material/Grid2";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./CustomerArchive.module.css";
import { Box } from "@mui/material";
import Modal from "@/components/module/Modal/Modal";
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
import dynamic from "next/dynamic";
import { isImageUrl } from "@/utils/helper";
import Button1 from "@/components/module/Buttons/Button1";
import InstagramIcon from "@mui/icons-material/Instagram";
import ActionEditMedia from "@/components/module/ActionEditMedia/ActionEditMedia";
import BeforAfterEdit from "@/components/module/BeforAfterAdit/BeforAfterEdit";
import ListActionMedia from "@/components/module/ListActionMedia/ListActionMedia";
import WestIcon from "@mui/icons-material/West";
import { FaPeopleArrows } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button2 from "@/components/module/Buttons/Button2";
import SearchBox from "@/components/module/SearchBox/SearchBox";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function CustomerArchive({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [archiveDetails, setArchiveDetails] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [statusArchiveOne, setStatusArchiveOne] = useState("قبل");
  const [statusArchiveTwo, setStatusArchiveTwo] = useState("قبل");
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
  const [isEditTab, setIsEditTab] = useState(false);
  const router = useRouter();
  const [showIconTakeImage, setShowIconTakeImage] = useState(false);
  const [allCustomer, setAllCustomer] = useState([]);
  const [user, SetUser] = useState("");
  const [filteredUser, setFiltredUser] = useState([]);
  const [userComparison, setUserComparison] = useState("");
  const [images1Comparison, setImages1Comparison] = useState([]);
  const [images2Comparison, setImages2Comparison] = useState([]);
  const [useCustomUrls, setUseCustomUrls] = useState(false);
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

  const handleChangeTimeImage1 = (e) => {
    const { name, value } = e.target;
    setStatusArchiveOne(value);
  };

  const handleChangeTimeImage2 = (e) => {
    const { name, value } = e.target;
    setStatusArchiveTwo(value);
  };

  const saveMedia = (id, url) => {
    const isImage = isImageUrl(url);

    if (isImage) {
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

      const cleanUrl = url.split("?")[0];
      const extension = cleanUrl.split(".").pop().toLowerCase();

      canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `edited-image.${extension}`;
        link.click();
      });
    } else {
      const cleanUrl = url.split("?")[0];
      const extension = cleanUrl.split(".").pop().toLowerCase();

      const link = document.createElement("a");
      link.href = url;
      link.download = `video.${extension}`;
      link.click();
    }
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

      const dataURL = canvas.toDataURL("image/webp");

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

  const searchUser = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    SetUser(searchTerm);
    const filterUser = allCustomer.filter(
      (user) =>
        user.customer.fullname.includes(searchTerm) ||
        user.customer.nationalcode.includes(searchTerm)
    );

    setFiltredUser(filterUser);
  };

  const getAllSameCodeCustomer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/archive/comparisonarchive",
        {
          settingId: archiveDetails.setting.id,
          archiveId: archiveDetails.id,
          operationId: archiveDetails.operationId,
        }
      );
      if (response.status === 200) {
        setAllCustomer(response.data);
        setFiltredUser(response.data);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
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

  const imageUrl = group1Images[currentIndexes?.group1]?.url;
  const imageUrl2 = group2Images[currentIndexes?.group2]?.url;
  const isImage = isImageUrl(imageUrl);
  const isImage2 = isImageUrl(imageUrl2);

  const getImageUrlGrid1 = () => {
    return statusArchiveOne === "قبل"
      ? group1Images[currentIndexes?.group1]?.url
      : group2Images[currentIndexes?.group2]?.url;
  };

  const getImageUrlGrid2 = () => {
    return statusArchiveTwo === "قبل"
      ? images1Comparison[currentIndexes?.group1]?.url
      : images2Comparison[currentIndexes?.group2]?.url;
  };

  const grid1Url = useCustomUrls
    ? getImageUrlGrid1()
    : group1Images[currentIndexes?.group1]?.url;

  const grid2Url = useCustomUrls
    ? getImageUrlGrid2()
    : group2Images[currentIndexes?.group2]?.url;

  useEffect(() => {
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
  }, [isImage, isImage2]);

  useEffect(() => {
    if (userComparison) {
      setImages1Comparison(
        userComparison?.photos?.filter((img) => img.group === 1) || []
      );
      setImages2Comparison(
        userComparison?.photos?.filter((img) => img.group === 2) || []
      );
    }
  }, [userComparison]);

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
                {isEditTab ? (
                  <>
                    <ActionEditMedia />
                  </>
                ) : (
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
                      <div className={styles.action_edit_wrapper}>
                        <div className={styles.wrap_actions}>
                          <AditPicture
                            filters={filters}
                            setFilters={setFilters}
                            onClick={fullContrastGrayscale}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Button1
                  text={isEditTab ? "برگشت" : "آپلود در اینستاگرام"}
                  icon={isEditTab ? "" : InstagramIcon}
                  Onclick={() => setIsEditTab((prev) => !prev)}
                />
                {!isEditTab && (
                  <div style={{ marginTop: "20px" }}>
                    <Button1
                      text={useCustomUrls ? "برگشت" : "مقایسه"}
                      icon={useCustomUrls ? "" : FaPeopleArrows}
                      Onclick={
                        useCustomUrls
                          ? () => setUseCustomUrls(false)
                          : getAllSameCodeCustomer
                      }
                    />
                  </div>
                )}
              </RightSection>
            </Grid>
            <Grid size={{ xs: 12, md: 8, lg: 9.7 }} className={styles.left_sec}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                {useCustomUrls ? (
                  <>
                    <Grid
                      container
                      spacing={2.5}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    >
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <div style={{ width: "60%", margin: "0 auto" }}>
                          <NormalDropDown
                            onChange={handleChangeTimeImage1}
                            value={statusArchiveOne}
                            title={"زمان رسانه"}
                            style2={"background"}
                            items={[
                              { id: "قبل", name: "قبل" },
                              { id: "بعد", name: "بعد" },
                            ]}
                            name={""}
                          />
                        </div>
                      </Grid>
                      <Grid size={{ xs: 12, lg: 6 }}>
                        <div style={{ width: "60%", margin: "0 auto" }}>
                          <NormalDropDown
                            onChange={handleChangeTimeImage2}
                            value={statusArchiveTwo}
                            title={"زمان رسانه"}
                            style2={"background"}
                            items={[
                              { id: "قبل", name: "قبل" },
                              { id: "بعد", name: "بعد" },
                            ]}
                            name={""}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <p
                    className={styles.text_back}
                    onClick={() => router.push("/archive")}
                  >
                    بازگشت
                    <WestIcon />
                  </p>
                )}
              </div>
              <Grid
                className={`${styles.wrap_images} ${
                  isFullScreen && styles.fullScreen
                }`}
                container
                spacing={2.5}
              >
                {isEditTab ? (
                  <>
                    <BeforAfterEdit
                      group1Images={group1Images}
                      group2Images={group2Images}
                    />
                  </>
                ) : (
                  <>
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
                            {isImageUrl(grid1Url) ? (
                              <Image
                                id="group1-image"
                                src={grid1Url}
                                alt={`Grid 1 - ${currentIndexes?.group1}`}
                                layout="fill"
                                className={styles.image_archive}
                                style={{
                                  ...getFilterStyle(),
                                }}
                              />
                            ) : (
                              <ReactPlayer
                                url={grid1Url}
                                playing={false}
                                muted={false}
                                playsinline
                                preload="auto"
                                className={styles.image_archive}
                                controls={true}
                                width="100%"
                                height="100%"
                              />
                            )}
                            <ListActionMedia
                              downloadMedia={() =>
                                saveMedia("group1-image", grid1Url)
                              }
                              fullScreenOne={
                                isImage ? () => toggleExpand(1) : null
                              }
                              fullScreenTwo={
                                isImage
                                  ? () => setIsFullScreen((prev) => !prev)
                                  : null
                              }
                              showIconTakeImageFromVideo={
                                !isImage
                                  ? () => setShowIconTakeImage(true)
                                  : null
                              }
                              isfullScreen={isFullScreen}
                            />
                            <div className={styles.wrap_btn_camera}>
                              {showIconTakeImage && (
                                <Button2
                                  onClick={captureScreenshot}
                                  icon={CameraAltIcon}
                                />
                              )}
                            </div>
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
                            isHide={isHide}
                          >
                            {isImageUrl(grid2Url) ? (
                              <Image
                                id="group2-image"
                                src={grid2Url}
                                alt={`Grid 2 - ${currentIndexes?.group2}`}
                                layout="fill"
                                className={styles.image_archive}
                                style={{
                                  ...getFilterStyle(),
                                }}
                              />
                            ) : (
                              <ReactPlayer
                                url={grid2Url}
                                playing={false}
                                muted={false}
                                playsinline
                                preload="metadata"
                                className={styles.image_archive}
                                controls={true}
                                width="100%"
                                height="100%"
                              />
                            )}
                            <ListActionMedia
                              downloadMedia={() =>
                                saveMedia("group2-image", grid2Url)
                              }
                              fullScreenOne={
                                isImage2 ? () => toggleExpand(2) : null
                              }
                              fullScreenTwo={
                                isImage2
                                  ? () => setIsFullScreen((prev) => !prev)
                                  : null
                              }
                              showIconTakeImageFromVideo={
                                !isImage2
                                  ? () => setShowIconTakeImage(true)
                                  : null
                              }
                              isfullScreen={isFullScreen}
                            />
                            <div className={styles.wrap_btn_camera}>
                              {showIconTakeImage && (
                                <Button2
                                  onClick={captureScreenshot}
                                  icon={CameraAltIcon}
                                />
                              )}
                            </div>
                          </Preview>
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
                            beforeImage={grid1Url}
                            afterImage={grid2Url}
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
                            {isImage ? (
                              <Image
                                id="group1-image"
                                src={group1Images[currentIndexes?.group1]?.url}
                                alt={`Group 1 - ${currentIndexes?.group1}`}
                                layout="fill"
                                className={styles.image_archive}
                                style={{
                                  ...getFilterStyle(),
                                }}
                              />
                            ) : (
                              <>
                                <ReactPlayer
                                  url={
                                    group1Images[currentIndexes?.group1]?.url
                                  }
                                  playing={false}
                                  muted={false}
                                  playsinline
                                  preload="metadata"
                                  className={styles.image_archive}
                                  controls={true}
                                  width="100%"
                                  height="100%"
                                  ref={playerRef}
                                />
                              </>
                            )}
                            <ListActionMedia
                              downloadMedia={() =>
                                saveMedia(
                                  "group1-image",
                                  group1Images[currentIndexes?.group1]?.url
                                )
                              }
                              fullScreenOne={
                                isImage ? () => toggleExpand(1) : null
                              }
                              showIconTakeImageFromVideo={
                                !isImage
                                  ? () => setShowIconTakeImage(true)
                                  : null
                              }
                              isfullScreen={isFullScreen}
                            />
                            <div className={styles.wrap_btn_camera}>
                              {showIconTakeImage && (
                                <Button2
                                  onClick={captureScreenshot}
                                  icon={CameraAltIcon}
                                />
                              )}
                            </div>
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
                            isHide={isHide}
                          >
                            {isImage2 ? (
                              <Image
                                id="group2-image"
                                src={group2Images[currentIndexes?.group2]?.url}
                                alt={`Group 2 - ${currentIndexes?.group2}`}
                                layout="fill"
                                className={styles.image_archive}
                                style={{
                                  ...getFilterStyle(),
                                }}
                              />
                            ) : (
                              <>
                                <ReactPlayer
                                  url={
                                    group2Images[currentIndexes?.group2]?.url
                                  }
                                  playing={false}
                                  muted={false}
                                  playsinline
                                  preload="metadata"
                                  className={styles.image_archive}
                                  controls={true}
                                  width="100%"
                                  height="100%"
                                  ref={playerRef}
                                />
                              </>
                            )}
                            <ListActionMedia
                              downloadMedia={() =>
                                saveMedia(
                                  "group2-image",
                                  group1Images[currentIndexes?.group2]?.url
                                )
                              }
                              fullScreenOne={
                                isImage2 ? () => toggleExpand(2) : null
                              }
                              showIconTakeImageFromVideo={
                                !isImage2
                                  ? () => setShowIconTakeImage(true)
                                  : null
                              }
                              isfullScreen={isFullScreen}
                            />
                            <div className={styles.wrap_btn_camera}>
                              {showIconTakeImage && (
                                <Button2
                                  onClick={captureScreenshot}
                                  icon={CameraAltIcon}
                                />
                              )}
                            </div>
                          </Preview>
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
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Modal
        title={"لیست مراجعه کنندگان"}
        onClick={() => setShowModal(false)}
        showModal={showModal}
        height={"height"}
      >
        <SearchBox value={user} onChange={searchUser} />
        <div className={styles.list_user}>
          {filteredUser.length > 0 ? (
            filteredUser.map((item) => (
              <li
                className={`${styles.user_item}  ${
                  userComparison?.customer?.id === item?.customer?.id &&
                  styles.user_active
                }`}
                key={item.id}
                onClick={() => setUserComparison(item)}
              >
                <span className={styles.user_name}>
                  {item?.customer?.fullname}
                </span>
                <span className={styles.user_code}>
                  {item?.customer?.nationalcode}
                </span>
              </li>
            ))
          ) : (
            <p className={styles.not_found_text}>نتیجه ای یافت نشد</p>
          )}
        </div>
        <Button1
          text={"ادامه"}
          Onclick={() => {
            setShowModal(false);
            setUseCustomUrls(true);
            setDisplayType("کنارهم");
          }}
          disable={userComparison ? "" : true}
          notloading={true}
        />
      </Modal>
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
