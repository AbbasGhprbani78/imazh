"use client";
import SearchBox from "@/components/module/SearchBox/SearchBox";
import TableUser from "@/components/module/Table/Table";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Archive.module.css";
import axios from "axios";
import Toast from "@/components/module/Toast/Toast";
import Modal from "@/components/module/Modal/Modal";
import Button1 from "@/components/module/Buttons/Button1";
import AddIcon from "@mui/icons-material/Add";
import { MyContext } from "@/context/context";
import DropDownSearch from "@/components/module/DropDown/DropDownSearch";
import { Box, Tabs, Tab } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button2 from "@/components/module/Buttons/Button2";
import EastIcon from "@mui/icons-material/East";
import { isImageFile, isImageUrl } from "@/utils/helper";
import ReactPlayer from "react-player";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default function Archive() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [allArchives, setAllArchive] = useState([]);
  const [filteredArchives, setfilteredArchives] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [archiveId, setArchiveId] = useState("");
  const [tabModal, setTabModal] = useState(1);
  const [users, SetUsers] = useState("");
  const [userInfo, setUserInfo] = useState({
    customerId: "",
    operationId: "",
    settingId: "",
    archiveId: "",
    media1: [],
    media2: [],
  });
  const fileInputRef = useRef(null);
  const [filteredUser, setFiltredUser] = useState([]);
  const { allCustomer, allSettings, operationsData } = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(0);
  const limit = 10;
  const [toastInfo, setToastInfo] = useState({
    type: "",
    title: "",
    message: "",
  });
  const [activeUser, setActiveUser] = useState("");
  const [mainuser, setMainUser] = useState("");
  const [setting, setSetting] = useState("");

  const searchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearch(searchTerm);
    const filterArchives = allArchives.filter(
      (archive) =>
        archive.customer.fullname.includes(searchTerm) ||
        archive.customer.filenumber.includes(searchTerm) ||
        archive.customer.nationalcode.includes(searchTerm) ||
        archive.operation.operation.includes(searchTerm) ||
        archive.setting.name.includes(searchTerm) ||
        archive.customer.phonenumber.includes(searchTerm)
    );
    setfilteredArchives(filterArchives);
  };

  const searchUser = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    SetUsers(searchTerm);
    const filterUser = allCustomer.filter(
      (user) =>
        user.fullname.includes(searchTerm) ||
        user.nationalcode.includes(searchTerm)
    );

    setFiltredUser(filterUser);
  };

  const fetchArchives = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/archive?page=${pageNumber}&limit=${limit}`
      );
      if (response.status === 200) {
        setAllArchive(response.data.data);
        setfilteredArchives(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("خطا در دریافت داده‌ها", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArchive = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/archive/${archiveId}`
      );
      if (response.status === 200) {
        setShowModal(false);
        fetchArchives(page);
        setToastInfo({
          type: "success",
          title: "حذف موفقیت آمیز",
          message: response?.data?.message,
        });
        setShowToast(true);
      }
    } catch (error) {
      setToastInfo({
        type: "error",
        title: "خطا در حذف",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const openModalNewArchive = () => {
    setUserInfo({
      customerId: "",
      operationId: "",
      settingId: "",
      archiveId: "",
      media1: [],
      media2: [],
    });
    setActiveUser("");
    setTabModal(1);
    setShowModal(true);
    setTypeModal(2);
  };

  const openModalDelete = () => {
    setShowModal(true);
    setTypeModal(1);
  };

  const openEditModal = () => {
    setTabModal(1);
    setShowModal(true);
    setTypeModal(3);
  };

  const ChangeCustomerInfoHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeFileOne = (e) => {
    const files = Array.from(e.target.files);
    let valid = true;
    let errorMessage = "";

    const updatedMedia1 = [...(userInfo.media1 || []), ...files];

    if (setting === "#MKE03$A33*") {
      if (updatedMedia1.length !== 5) {
        valid = false;
        errorMessage = "باید دقیقا 5 فایل انتخاب کنید.";
      }
      if (!files.every((file) => file.type.startsWith("image/"))) {
        valid = false;
        errorMessage = "فقط فایل تصویر مجاز است.";
      }
    } else if (setting === "#MKE04$A44*") {
      if (updatedMedia1.length !== 7) {
        valid = false;
        errorMessage = "باید دقیقا 7 فایل انتخاب کنید.";
      }
      if (!files.every((file) => file.type.startsWith("image/"))) {
        valid = false;
        errorMessage = "فقط فایل تصویر مجاز است.";
      }
    } else if (setting === "#MKE02$A22*" || setting === "#MKE01$A11*") {
      if (updatedMedia1.length !== 1) {
        valid = false;
        errorMessage = "باید فقط یک فایل انتخاب کنید.";
      }

      if (!files.every((file) => file.type.startsWith("video/"))) {
        valid = false;
        errorMessage = "فقط فایل ویدیو مجاز است.";
      }
    }

    if (!valid) {
      setToastInfo({
        type: "error",
        title: "خطا",
        message: errorMessage,
      });
      setShowToast(true);
      e.target.value = "";
      return;
    }

    setUserInfo((prev) => ({ ...prev, media1: updatedMedia1 }));
  };

  const handleChangeFileTwo = (e) => {
    const files = Array.from(e.target.files);
    let valid = true;
    let errorMessage = "";

    const updatedMedia2 = [...(userInfo.media2 || []), ...files];

    if (setting === "#MKE03$A33*") {
      if (updatedMedia2.length !== 5) {
        valid = false;
        errorMessage = "برای این حالت، باید دقیقا ۵ فایل تصویری انتخاب کنید.";
      }
      if (!files.every((file) => file.type.startsWith("image/"))) {
        valid = false;
        errorMessage = "برای این حالت، فقط فایل تصویر مجاز است.";
      }
    } else if (setting === "#MKE04$A44*") {
      if (updatedMedia2.length !== 7) {
        valid = false;
        errorMessage = "برای این حالت، باید دقیقا ۷ فایل تصویری انتخاب کنید.";
      }
      if (!files.every((file) => file.type.startsWith("image/"))) {
        valid = false;
        errorMessage = "برای این حالت، فقط فایل تصویر مجاز است.";
      }
    } else if (setting === "#MKE02$A22*" || setting === "#MKE01$A11*") {
      if (updatedMedia2.length !== 1) {
        valid = false;
        errorMessage = "برای این حالت، باید دقیقا ۱ فایل ویدیویی انتخاب کنید.";
      }
      if (!files.every((file) => file.type.startsWith("video/"))) {
        valid = false;
        errorMessage = "برای این حالت، فقط فایل ویدیویی مجاز است.";
      }
    }

    if (!valid) {
      setToastInfo({
        type: "error",
        title: "خطا",
        message: errorMessage,
      });
      setShowToast(true);
      e.target.value = "";
      return;
    }

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      media2: updatedMedia2,
    }));
  };

  const handleFileRemove = (mediaType, index) => {
    setUserInfo((prevUserInfo) => {
      const updatedMedia = prevUserInfo[mediaType].filter(
        (_, i) => i !== index
      );
      return {
        ...prevUserInfo,
        [mediaType]: updatedMedia,
      };
    });
  };

  const handleFileReplace = (mediaType, index, e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setUserInfo((prevUserInfo) => {
        const updatedMedia = [...prevUserInfo[mediaType]];
        updatedMedia[index] = newFile;
        return {
          ...prevUserInfo,
          [mediaType]: updatedMedia,
        };
      });
    }
  };

  const handleChangeTabArchive = (number) => {
    if (typeModal == 2) {
      setTabModal((prevTab) => {
        const nextTab = prevTab + number;
        if (nextTab < 1) return 1;
        if (nextTab > 3) return 3;
        return nextTab;
      });
    } else {
      setTabModal((prevTab) => {
        const nextTab = prevTab + number;
        if (nextTab < 1) return 1;
        if (nextTab > 2) return 2;
        return nextTab;
      });
    }
  };

  const validateFields = () => {
    if (!userInfo.customerId) {
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "بیمار باید مشخص گردد",
      });
      return false;
    }
    if (!userInfo.operationId) {
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "عملیات باید مشخص گردد",
      });
      return false;
    }
    if (!userInfo.settingId) {
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "حالت ضبط باید مشخص گردد",
      });
      return false;
    }
    if (userInfo.media1.length === 0) {
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "حداقل یک رسانه باید انتخاب کنید",
      });
      return false;
    }
    if (setting === "#MKE03$A33*") {
      if (
        userInfo.media1.length !== 5 ||
        (userInfo.media2.length > 0 && userInfo.media2.length !== 5)
      ) {
        setToastInfo({
          type: "error",
          title: "خطا",
          message: "برای این حالت، باید ۵ فایل تصویری انتخاب کنید.",
        });
        return false;
      }
    }
    if (setting === "#MKE04$A44*") {
      if (
        userInfo.media1.length !== 7 ||
        (userInfo.media2.length > 0 && userInfo.media2.length !== 7)
      ) {
        setToastInfo({
          type: "error",
          title: "خطا",
          message: "برای این حالت، باید ۷ فایل تصویری انتخاب کنید.",
        });
        return false;
      }
    }
    if (setting === "#MKE02$A22*" || setting === "#MKE01$A11*") {
      if (
        userInfo.media1.length !== 1 ||
        (userInfo.media2.length > 0 && userInfo.media2.length !== 1)
      ) {
        setToastInfo({
          type: "error",
          title: "خطا",
          message: "برای این حالت، باید دقیقا ۱ فایل ویدیویی انتخاب کنید.",
        });
        return false;
      }
    }
    return true;
  };

  const addArchive = async () => {
    if (!validateFields()) {
      setShowToast(true);
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("operationId", userInfo.operationId);
      formData.append("settingId", userInfo.settingId);
      formData.append("customerId", userInfo.customerId);
      for (const file of userInfo.media1) {
        if (file instanceof File) {
          formData.append("photos", file);
        }
      }
      if (userInfo.media2) {
        for (const file of userInfo.media2) {
          if (file instanceof File) {
            formData.append("photos2", file);
          }
        }
      }
      const response = await axios.post(
        "http://localhost:3000/api/archive",
        formData
      );
      if (response.status === 201) {
        setShowModal(false);
        fetchArchives(page);
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "عملیات موفقیت آمیز",
          message: "آرشیو بیمار با موفقیت اضافه شد",
        });
      }
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در اضافه کردن آرشیو",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    } finally {
      setLoading(false);
    }
  };

  const ediArchive = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("id", userInfo.archiveId);
      formData.append("customerId", userInfo.customerId);

      if (userInfo.media1) {
        for (const photo of userInfo.media1) {
          if (photo instanceof File) {
            formData.append("newPhotos", photo);
            formData.append("newPhotoGroups", "1");
          } else {
            formData.append(
              "existingPhotos",
              JSON.stringify({ ...photo, group: 1 })
            );
          }
        }
      }

      if (userInfo.media2) {
        for (const photo of userInfo.media1) {
          if (photo instanceof File) {
            formData.append("newPhotos", photo);
            formData.append("newPhotoGroups", "2");
          } else {
            formData.append(
              "existingPhotos",
              JSON.stringify({ ...photo, group: 2 })
            );
          }
        }
      }

      const response = await axios.put(
        `http://localhost:3000/api/archive/${userInfo.archiveId}`,
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        fetchArchives(page);
        setShowModal(false);
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "عملیات موفقیت آمیز",
          message: "آرشیو بیمار با تغییر کرد  ",
        });
      }
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در تغییر ارشیو",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFiltredUser(allCustomer);
  }, [allCustomer]);

  useEffect(() => {
    fetchArchives(page);
  }, [page]);

  useEffect(() => {
    if (mainuser?.photos) {
      const media1 = mainuser.photos.filter((photo) => photo.group === 1);
      const media2 = mainuser.photos.filter((photo) => photo.group === 2);

      setUserInfo({
        customerId: mainuser?.customer?.id,
        operationId: mainuser?.operation?.id,
        settingId: mainuser?.setting?.id,
        archiveId: mainuser?.id,
        media1,
        media2,
      });

      setSetting(mainuser?.setting.name);
    }
  }, [mainuser]);

  return (
    <>
      <Modal
        title={
          typeModal === 1
            ? "حذف آرشیو"
            : typeModal === 2
            ? "افزودن آرشیو جدید"
            : "ویرایش آرشیو"
        }
        onClick={() => setShowModal(false)}
        showModal={showModal}
        height={"height"}
      >
        <p className={styles.text_model}>
          {typeModal === 1 ? "آیا از حذف آرشیو اطمینان دارید؟" : ""}
        </p>
        {typeModal === 1 ? (
          <div className={styles.wrap_btn_actions}>
            <Button1 text={"خیر"} Onclick={() => setShowModal(false)} />
            <Button1
              disable={loading}
              text={"بله"}
              Onclick={deleteArchive}
              style={{ background: "#535353" }}
              backstyle={"backstyle"}
            />
          </div>
        ) : typeModal === 2 ? (
          <>
            {tabModal === 1 ? (
              <>
                <SearchBox value={users} onChange={searchUser} />
                <div className={styles.list_user_wrapper}>
                  <ul className={styles.list_user}>
                    {filteredUser.length > 0 ? (
                      filteredUser.map((item) => (
                        <li
                          className={`${styles.user_item} ${
                            item.id === activeUser && styles.user_active
                          }`}
                          key={item.id}
                          onClick={() => {
                            setUserInfo((prevState) => ({
                              ...prevState,
                              customerId: item.id,
                            }));
                            setActiveUser(item.id);
                          }}
                        >
                          <span className={styles.user_name}>
                            {item.fullname}
                          </span>
                          <span className={styles.user_code}>
                            {item.nationalcode}
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className={styles.not_found_text}>نتیجه ای یافت نشد</p>
                    )}
                  </ul>
                </div>
              </>
            ) : tabModal === 2 ? (
              <>
                <div className={styles.wrapdrop}>
                  <DropDownSearch
                    title={"عملیات"}
                    firstoptiontext=""
                    firstoptionclick={""}
                    items={operationsData}
                    name={"operationId"}
                    getOptionLabelProp="operation"
                    onChange={ChangeCustomerInfoHandler}
                    value={userInfo.operationId}
                  />
                </div>
                <div className={styles.wrapdrop}>
                  <DropDownSearch
                    title={"حالت ضبط"}
                    firstoptiontext=""
                    firstoptionclick={""}
                    items={allSettings}
                    name={"settingId"}
                    getOptionLabelProp="description"
                    onChange={ChangeCustomerInfoHandler}
                    value={userInfo.settingId}
                    setSetting={setSetting}
                  />
                </div>
              </>
            ) : (
              <>
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="MUI Tabs Example"
                    centered
                  >
                    <Tab
                      label="رسانه قبل"
                      sx={{ fontFamily: "vazir", color: "var(--color-5)" }}
                    />
                    <Tab
                      label="رسانه بعد"
                      sx={{ fontFamily: "vazir", color: "var(--color-5)" }}
                    />
                  </Tabs>
                  <TabPanel value={activeTab} index={0}>
                    <div className={styles.wrap_archive_file}>
                      <div className={styles.box_add}>
                        <AddIcon className={styles.icon_add} />
                        <label
                          htmlFor="filearchive"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                          }}
                        ></label>
                        <input
                          type="file"
                          id="filearchive"
                          style={{ display: "none" }}
                          onChange={handleChangeFileOne}
                          multiple={true}
                          accept="image/*,video/*"
                        />
                      </div>
                      {userInfo.media1.length > 0 &&
                        userInfo.media1.map((file, i) => (
                          <div className={styles.box_add} key={i}>
                            {isImageFile(file) ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                style={{ width: "100%", height: "100%" }}
                              />
                            ) : (
                              <ReactPlayer
                                url={URL.createObjectURL(file)}
                                width="100%"
                                height="100%"
                                className={styles.archive_video}
                              />
                            )}
                            <div className={styles.coverFile_file}>
                              <DeleteOutlineIcon
                                className={styles.icon_archive}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileRemove("media1", i);
                                }}
                              />
                              <AddIcon
                                className={styles.icon_archive}
                                onClick={() => {
                                  fileInputRef.current.dataset.mediaType =
                                    "media1";
                                  fileInputRef.current.dataset.index = i;
                                  fileInputRef.current.click();
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const mediaType =
                          fileInputRef.current.dataset.mediaType;
                        const index = fileInputRef.current.dataset.index;
                        handleFileReplace(mediaType, index, e);
                      }}
                      accept="image/*,video/*"
                    />
                  </TabPanel>
                  <TabPanel value={activeTab} index={1}>
                    <div className={styles.wrap_archive_file}>
                      <div className={styles.box_add}>
                        <AddIcon className={styles.icon_add} />
                        <label
                          htmlFor="filearchive2"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                          }}
                        ></label>
                        <input
                          type="file"
                          id="filearchive2"
                          style={{ display: "none" }}
                          onChange={handleChangeFileTwo}
                          multiple={true}
                          accept="image/*,video/*"
                        />
                      </div>
                      {userInfo.media2.length > 0 &&
                        userInfo.media2.map((file, i) => (
                          <div className={styles.box_add} key={i}>
                            {isImageFile(file) ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                style={{ width: "100%", height: "100%" }}
                              />
                            ) : (
                              <ReactPlayer
                                url={URL.createObjectURL(file)}
                                width="100%"
                                height="100%"
                                className={styles.archive_video}
                              />
                            )}
                            <div className={styles.coverFile_file}>
                              <DeleteOutlineIcon
                                className={styles.icon_archive}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileRemove("media2", i);
                                }}
                              />
                              <AddIcon
                                className={styles.icon_archive}
                                onClick={() => {
                                  fileInputRef.current.dataset.mediaType =
                                    "media2";
                                  fileInputRef.current.dataset.index = i;
                                  fileInputRef.current.click();
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const mediaType =
                          fileInputRef.current.dataset.mediaType;
                        const index = fileInputRef.current.dataset.index;
                        handleFileReplace(mediaType, index, e);
                      }}
                      accept="image/*,video/*"
                    />
                  </TabPanel>
                </Box>
              </>
            )}
            <div className={styles.wrap_btns_add}>
              <Button2
                icon={EastIcon}
                onClick={() => handleChangeTabArchive(-1)}
              />
              <Button1
                text={tabModal === 3 ? "افزودن" : "ادامه"}
                Onclick={
                  tabModal === 3
                    ? () => addArchive()
                    : () => handleChangeTabArchive(1)
                }
                disable={loading}
              />
            </div>
          </>
        ) : (
          <>
            {tabModal === 1 ? (
              <>
                <SearchBox value={users} onChange={searchUser} />
                <div className={styles.list_user_wrapper}>
                  <ul className={styles.list_user}>
                    {filteredUser.length > 0 ? (
                      filteredUser.map((item) => (
                        <li
                          className={`${styles.user_item} ${
                            item.id === userInfo.customerId &&
                            styles.user_active
                          }`}
                          key={item.id}
                          onClick={() => {
                            setUserInfo((prevState) => ({
                              ...prevState,
                              customerId: item.id,
                            }));
                            setActiveUser(item.id);
                          }}
                        >
                          <span className={styles.user_name}>
                            {item.fullname}
                          </span>
                          <span className={styles.user_code}>
                            {item.nationalcode}
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className={styles.not_found_text}>نتیجه ای یافت نشد</p>
                    )}
                  </ul>
                </div>
              </>
            ) : tabModal === 2 ? (
              <>
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="MUI Tabs Example"
                    centered
                  >
                    <Tab
                      label="رسانه قبل"
                      sx={{ fontFamily: "vazir", color: "var(--color-5)" }}
                    />
                    <Tab
                      label="رسانه بعد"
                      sx={{ fontFamily: "vazir", color: "var(--color-5)" }}
                    />
                  </Tabs>
                  <TabPanel value={activeTab} index={0}>
                    <div className={styles.wrap_archive_file}>
                      <div className={styles.box_add}>
                        <AddIcon className={styles.icon_add} />
                        <label
                          htmlFor="filearchive"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                          }}
                        ></label>
                        <input
                          type="file"
                          id="filearchive"
                          style={{ display: "none" }}
                          onChange={handleChangeFileOne}
                          multiple={true}
                          accept="image/*,video/*"
                        />
                      </div>
                      {userInfo.media1.length > 0 &&
                        userInfo.media1.map((file, i) => (
                          <div className={styles.box_add} key={i}>
                            {file instanceof File ? (
                              <>
                                {isImageFile(file) ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                ) : (
                                  <ReactPlayer
                                    url={URL.createObjectURL(file)}
                                    width="100%"
                                    height="100%"
                                    className={styles.archive_video}
                                  />
                                )}
                              </>
                            ) : (
                              <>
                                {isImageUrl(file.url) ? (
                                  <img
                                    src={file.url}
                                    alt=""
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                ) : (
                                  <ReactPlayer
                                    url={file.url}
                                    width="100%"
                                    height="100%"
                                    className={styles.archive_video}
                                  />
                                )}
                              </>
                            )}

                            <div className={styles.coverFile_file}>
                              <DeleteOutlineIcon
                                className={styles.icon_archive}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileRemove("media1", i);
                                }}
                              />
                              <AddIcon
                                className={styles.icon_archive}
                                onClick={() => {
                                  fileInputRef.current.dataset.mediaType =
                                    "media1";
                                  fileInputRef.current.dataset.index = i;
                                  fileInputRef.current.click();
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const mediaType =
                          fileInputRef.current.dataset.mediaType;
                        const index = fileInputRef.current.dataset.index;
                        handleFileReplace(mediaType, index, e);
                      }}
                      accept="image/*,video/*"
                    />
                  </TabPanel>
                  <TabPanel value={activeTab} index={1}>
                    <div className={styles.wrap_archive_file}>
                      <div className={styles.box_add}>
                        <AddIcon className={styles.icon_add} />
                        <label
                          htmlFor="filearchive2"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                          }}
                        ></label>
                        <input
                          type="file"
                          id="filearchive2"
                          style={{ display: "none" }}
                          onChange={handleChangeFileTwo}
                          multiple={true}
                          accept="image/*,video/*"
                        />
                      </div>
                      {userInfo.media2.length > 0 &&
                        userInfo.media2.map((file, i) => (
                          <div className={styles.box_add} key={i}>
                            {file instanceof File ? (
                              <>
                                {isImageFile(file) ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                ) : (
                                  <ReactPlayer
                                    url={URL.createObjectURL(file)}
                                    width="100%"
                                    height="100%"
                                    className={styles.archive_video}
                                  />
                                )}
                              </>
                            ) : (
                              <>
                                {isImageUrl(file.url) ? (
                                  <img
                                    src={file.url}
                                    alt=""
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                ) : (
                                  <ReactPlayer
                                    url={file.url}
                                    width="100%"
                                    height="100%"
                                    className={styles.archive_video}
                                  />
                                )}
                              </>
                            )}
                            <div className={styles.coverFile_file}>
                              <DeleteOutlineIcon
                                className={styles.icon_archive}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFileRemove("media2", i);
                                }}
                              />
                              <AddIcon
                                className={styles.icon_archive}
                                onClick={() => {
                                  fileInputRef.current.dataset.mediaType =
                                    "media2";
                                  fileInputRef.current.dataset.index = i;
                                  fileInputRef.current.click();
                                }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const mediaType =
                          fileInputRef.current.dataset.mediaType;
                        const index = fileInputRef.current.dataset.index;
                        handleFileReplace(mediaType, index, e);
                      }}
                      accept="image/*,video/*"
                    />
                  </TabPanel>
                </Box>
              </>
            ) : null}
            <div className={styles.wrap_btns_add}>
              <Button2
                icon={EastIcon}
                onClick={() => handleChangeTabArchive(-1)}
              />
              <Button1
                text={tabModal === 2 ? "افزودن" : "ادامه"}
                Onclick={
                  tabModal === 2
                    ? () => ediArchive()
                    : () => handleChangeTabArchive(1)
                }
                disable={loading}
              />
            </div>
          </>
        )}
      </Modal>
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.top}>
          <span className={`title`}>آرشیو</span>
        </div>
        <div className={styles.top_archive}>
          <div className={styles.searchBox_wrapper}>
            <SearchBox value={search} onChange={searchHandler} />
          </div>
          <div className={styles.btn_add_archive}>
            <Button1
              icon={AddIcon}
              Onclick={openModalNewArchive}
              text={"افزودن آرشیو جدید"}
            />
          </div>
        </div>
        {loading ? (
          <div className={`wrap_loading`}>
            <span className={`loading`}></span>
          </div>
        ) : (
          <TableUser
            archives={filteredArchives}
            totalPage={totalPages}
            handlePageChange={handlePageChange}
            page={page}
            openModalDelete={openModalDelete}
            openEditModal={openEditModal}
            setArchiveId={setArchiveId}
            setMainUser={setMainUser}
          />
        )}
      </div>
      <Toast
        type={toastInfo.type}
        title={toastInfo.title}
        message={toastInfo.message}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  );
}
