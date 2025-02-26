"use client";
import { Box, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoneIcon from "@mui/icons-material/Done";
import Input from "@/components/module/Input/Input";
import LeftSection from "@/components/module/LeftSection/LeftSection";
import RightSection from "@/components/module/RightSection/RightSection";
import DropDownSearch from "@/components/module/DropDown/DropDownSearch";
import Modal from "@/components/module/Modal/Modal";
import InputData from "@/components/module/InputData/InputData";
import Button1 from "@/components/module/Buttons/Button1";
import styles from "./Home.module.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Toast from "@/components/module/Toast/Toast";
import { isRequired, validateNationalCode } from "@/utils/validate";
import { valiadteEmail, valiadtePhone } from "@/utils/auth";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Webcam from "@/components/module/Webcam/Webcam";
import io from "socket.io-client";
import Image from "next/image";
import ModalBottom from "@/components/module/ModalBottom/ModalBottom";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Button2 from "@/components/module/Buttons/Button2";
import EastIcon from "@mui/icons-material/East";
import NorthIcon from "@mui/icons-material/North";
import WestIcon from "@mui/icons-material/West";
import SouthIcon from "@mui/icons-material/South";
import SliderImages from "@/components/module/SliderImages/SliderImages";
import Preview from "@/components/module/Preview/Preview";
import CloseIcon from "@mui/icons-material/Close";
import {
  convertToFarsiDigits,
  isImageUrl,
  toEnglishNumber,
} from "@/utils/helper";
import dynamic from "next/dynamic";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { MyContext } from "@/context/context";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState([]);
  const [setting, setSetting] = useState("");
  const [settingDes, setSettingDes] = useState("");
  const [socket, setSocket] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customerId: "",
    operationId: "",
    settingId: "",
    archiveId: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [clearInput, setClearInput] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [dateReferenceValue, setDateReferenceValue] = useState("");
  const [typeModal, setTypeModal] = useState(1);
  const [dataBirthdaty, setDataBirthdaty] = useState("");
  const [operation, setOperation] = useState("");
  const [idUser, setIdUser] = useState("");
  const [isNewOperation, setIsNewOperation] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [historyOperation, setHistoryOperation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allImagesArchive, setAllImagesArchive] = useState([]);
  const [showListImages, setShowListImages] = useState(false);
  const [disable, setDisable] = useState(false);
  const [vlaueRadio, setValueRadio] = useState(1);
  const [customerData, setCustomerData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    nationalcode: "",
    datereference: "",
    birthday: "",
    filenumber: "",
    gender: "",
  });
  const [toastInfo, setToastInfo] = useState({
    type: "",
    title: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    operation: "",
    nationalcode: "",
    datereference: "",
    birthday: "",
    age: "",
    filenumber: "",
    gender: "",
    setting: "",
    setting_des: "",
  });

  const {
    allCustomer,
    setAllCustomer,
    operationsData,
    setAllOperationsData,
    allSettings,
    setAllSettings,
    user,
  } = useContext(MyContext);

  const validateCustomerInfo = () => {
    if (!isRequired(customerInfo.customerId)) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "بیمار باید مشخص گردد",
      });
      return false;
    }

    if (!isRequired(customerInfo.operationId)) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "عملیات باید مشخص گردد",
      });
      return false;
    }
    if (!isRequired(customerInfo.settingId)) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "حالت ضبط باید مشخص گردد",
      });
      return false;
    }

    if (photos.length === 0) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "ویدیو یا تصویر باید انتخاب شود",
      });
      return false;
    }
    return true;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const ChangeCustomerInfoHandler = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const showAddCustomerModal = () => {
    setTypeModal(1);
    setShowModal(true);
  };

  const handlerAddCustomer = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!isRequired(customerData.fullname)) {
      formErrors.fullname = "نام کاربر الزامی است";
    }
    if (!isRequired(customerData.datereference)) {
      formErrors.datereference = "وارد کردن تاریخ مراجعه الزامی است";
    } else {
      const currentDate = new Date();
      const referenceDate = new Date(customerData.datereference);

      if (referenceDate > currentDate) {
        formErrors.datereference = "تاریخ مراجعه نمی‌تواند در آینده باشد";
      }

      if (customerData.birthday >= customerData.datereference) {
        formErrors.datereference =
          "تاریخ مراجعه نمی تواند قبل از تاریخ تولد باشد";
      }
    }
    if (!isRequired(customerData.birthday)) {
      formErrors.birthday = "وارد کردن تاریخ تولد اجباری میباشد";
    } else {
      const currentDate = new Date();
      const birthDate = new Date(customerData.birthday);

      if (birthDate > currentDate) {
        formErrors.birthday = "تاریخ تولد نمی‌تواند در آینده باشد";
      }
    }
    if (!isRequired(customerData.filenumber)) {
      formErrors.filenumber = "وارد کردن شماره پرونده اجباری میباشد";
    }
    if (!isRequired(customerData.gender)) {
      formErrors.gender = "وارد کردن جنسیت اجباری میباشد";
    }
    if (!valiadteEmail(customerData.email)) {
      formErrors.email = "فرمت ایمیل معتبر نیست";
    }
    // if (!validateNationalCode(customerData.nationalcode)) {
    //   formErrors.nationalcode = "فرمت کدملی معتبرنیست";
    // }
    if (!valiadtePhone(customerData.phonenumber)) {
      formErrors.phonenumber = "فرمت شماره تلفن معتبر نیست";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/customer",
          customerData
        );
        if (response.status === 201) {
          const newCustomer = response.data.data;
          setAllCustomer((prev) => [...prev, newCustomer]);
          setCustomerInfo((prev) => ({
            ...prev,
            customerId: newCustomer.id,
          }));
          setShowModal(false);
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت آمیز",
            message: "بیمار با موفقیت اضافه شد",
          });
          setCustomerData({
            fullname: "",
            email: "",
            phonenumber: "",
            nationalcode: "",
            datereference: "",
            birthday: "",
            filenumber: "",
            gender: "",
          });
        }
      } catch (error) {
        setShowToast(true);
        setToastInfo({
          type: "error",
          title: "خطا در اضافه کردن بیمار",
          message: error?.response?.data?.message,
        });
      }
    }
  };

  const addOperationHandler = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!isRequired(operation)) {
      formErrors.operation = "وارد کردن نام عملیات الزامی است";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/operation",
          {
            operation,
          }
        );
        if (response.status === 201) {
          const newOperation = response.data.data;
          setAllOperationsData((prev) => [...prev, newOperation]);
          setCustomerInfo((prev) => ({
            ...prev,
            operationId: newOperation.id,
          }));
          setShowModal(false);
          setOperation("");
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت آمیز",
            message: "عملیات با موفقیت اضافه شد",
          });
        }
      } catch (error) {
        setShowToast(true);
        setToastInfo({
          type: "error",
          title: "خطا در اضافه کردن عملیات",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
        });
      }
    }
  };

  const addSettingHandler = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!isRequired(setting)) {
      formErrors.setting = "وارد کردن کد تنظیمات الزامی است";
    }
    if (!isRequired(settingDes)) {
      formErrors.setting_des = "وارد کردن اسم تنظیمات الزامی است";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await axios.post("http://localhost:3000/api/setting", {
          name: setting,
          description: settingDes,
        });
        if (response.status === 201) {
          const newSetting = response.data.data;
          setAllSettings((prev) => [...prev, newSetting]);
          setCustomerInfo((prev) => ({
            ...prev,
            settingId: newSetting.id,
          }));
          setShowModal(false);
          setSetting("");
          setSettingDes("");
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت آمیز",
            message: "تنظیمات با موفقیت اضافه شد",
          });
        }
      } catch (error) {
        setShowToast(true);
        setToastInfo({
          type: "error",
          title: "خطا در اضافه کردن تنظیمات",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
        });
      }
    }
  };

  const fetchData = async () => {
    const { customerId, operationId } = customerInfo;
    if (customerId && operationId) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/archive/operationsdate",
          {
            params: { customerId, operationId },
          }
        );
        if (response.status === 200) {
          setHistoryOperation(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditModal = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/customer/${id}`
      );
      if (response.status === 200) {
        customerData.fullname = response.data.fullname;
        customerData.email = response.data.email;
        customerData.phonenumber = response.data.phonenumber;
        customerData.nationalcode = response.data.nationalcode;
        customerData.datereference = response.data.datereference;
        customerData.birthday = new Date(response.data.birthday);
        customerData.filenumber = response.data.filenumber;
        customerData.gender = response.data.gender;
        setIdUser(id);
        setTypeModal(3);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/customer/${idUser}`,
        customerData
      );
      if (response.status === 200) {
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "عملیات موفقیت آمیز",
          message: "اطلاعات با موفقیت تغییر کرد",
        });
        setShowModal(false);
      }
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در تغییر اطلاعات",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    }
  };

  const deleteCustomerHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/customer/${idUser}`
      );
      if (response.status === 200) {
        setShowToast(true);
        setToastInfo({
          type: "success",
          title: "عملیات موفقیت آمیز",
          message: "بیمار با موفقیت حذف شد",
        });
        setShowModal(false);
        setEmptyInput(true);
        setTimeout(() => setEmptyInput(false), 0);
      }
    } catch (error) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در حذف کردن بیمار",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    }
  };

  const convertBlobToFile = async (blobUrl, fileName) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: mimeString });
  };

  // const saveCustomerInfo = async () => {
  //   if (!validateCustomerInfo()) return;
  //   if (isNewOperation) {
  //     const formData = new FormData();
  //     formData.append("operationId", customerInfo.operationId);
  //     formData.append("settingId", customerInfo.settingId);
  //     formData.append("customerId", customerInfo.customerId);

  //     for (const photo of photos) {
  //       if (photo.startsWith("data:image")) {
  //         const imageBlob = dataURItoBlob(photo);
  //         const uniqueFileName = `${Date.now()}-${Math.random()
  //           .toString(36)
  //           .substr(2, 9)}.png`;
  //         formData.append("photos", imageBlob, uniqueFileName);
  //       } else {
  //         const uniqueFileName = `${Date.now()}-${Math.random()
  //           .toString(36)
  //           .substr(2, 9)}.mp4`;
  //         const file = await convertBlobToFile(photo, uniqueFileName);
  //         formData.append("photos", file);
  //       }
  //     }

  //     try {
  //       setShowModal(true);
  //       setTypeModal(6);
  //       setLoading(true);
  //       const response = await axios.post(
  //         "http://localhost:3000/api/archive",
  //         formData
  //       );

  //       if (response.status === 201) {
  //         setPhotos([]);
  //         setShowToast(true);
  //         fetchData();
  //         setToastInfo({
  //           type: "success",
  //           title: "عملیات موفقیت آمیز",
  //           message: "آرشیو بیمار با موفقیت اضافه شد",
  //         });
  //       }
  //     } catch (error) {
  //       setShowToast(true);
  //       setToastInfo({
  //         type: "error",
  //         title: "خطا در اضافه کردن آرشیو",
  //         message:
  //           error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
  //       });
  //     } finally {
  //       setLoading(false);
  //       setShowModal(false);
  //     }
  //   } else {
  //     const formData = new FormData();
  //     formData.append("archiveId", customerInfo.archiveId);
  //     for (const photo of photos) {
  //       if (photo.startsWith("data:image")) {
  //         const imageBlob = dataURItoBlob(photo);
  //         const uniqueFileName = `${Date.now()}-${Math.random()
  //           .toString(36)
  //           .substr(2, 9)}.png`;
  //         formData.append("photos", imageBlob, uniqueFileName);
  //       } else {
  //         const uniqueFileName = `${Date.now()}-${Math.random()
  //           .toString(36)
  //           .substr(2, 9)}.mp4`;
  //         const file = await convertBlobToFile(photo, uniqueFileName);
  //         formData.append("photos", file);
  //       }
  //     }
  //     try {
  //       setShowModal(true);
  //       setTypeModal(6);
  //       setLoading(true);
  //       const response = await axios.post(
  //         "http://localhost:3000/api/archive/updatearchive",
  //         formData
  //       );

  //       if (response.status === 200) {
  //         setPhotos([]);
  //         setShowToast(true);
  //         fetchData();
  //         setToastInfo({
  //           type: "success",
  //           title: "عملیات موفقیت آمیز",
  //           message: "آرشیو بیمار با موفقیت اضافه شد",
  //         });
  //       }
  //     } catch (error) {
  //       setShowToast(true);
  //       setToastInfo({
  //         type: "error",
  //         title: "خطا در اضافه کردن آرشیو",
  //         message:
  //           error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
  //       });
  //     } finally {
  //       setLoading(false);
  //       setShowModal(false);
  //     }
  //   }
  // };

  const saveCustomerInfo = async () => {
    if (!validateCustomerInfo()) return;

    const appendFile = async (formData, photo) => {
      const uniqueFileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      if (photo.startsWith("data:image")) {
        const fileType = photo.split(";")[0].split("/")[1];
        const imageBlob = dataURItoBlob(photo);
        formData.append("photos", imageBlob, `${uniqueFileName}.${fileType}`);
      } else if (photo.startsWith("data:video")) {
        const fileType = photo.split(";")[0].split("/")[1];
        const videoBlob = dataURItoBlob(photo);
        formData.append("photos", videoBlob, `${uniqueFileName}.${fileType}`);
      } else {
        const file = await convertBlobToFile(photo, uniqueFileName);
        formData.append("photos", file);
      }
    };
    if (isNewOperation) {
      const formData = new FormData();
      formData.append("operationId", customerInfo.operationId);
      formData.append("settingId", customerInfo.settingId);
      formData.append("customerId", customerInfo.customerId);

      for (const photo of photos) {
        await appendFile(formData, photo);
      }

      try {
        setShowModal(true);
        setTypeModal(6);
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/archive",
          formData
        );

        if (response.status === 201) {
          setPhotos([]);
          setShowToast(true);
          fetchData();
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
        setShowModal(false);
      }
    } else {
      const formData = new FormData();
      formData.append("archiveId", customerInfo.archiveId);
      for (const photo of photos) {
        await appendFile(formData, photo);
      }
      try {
        setShowModal(true);
        setTypeModal(6);
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/archive/updatearchive",
          formData
        );

        if (response.status === 200) {
          setPhotos([]);
          setShowToast(true);
          fetchData();
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
        setShowModal(false);
      }
    }
  };

  const toggleShowListImages = () => {
    setShowListImages((prev) => !prev);
  };

  const fetchDataFromServer = (code) => {
    if (!code) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "تنظیمات باید انتخاب شود",
      });
      return;
    }
    if (socket) {
      console.log("Disconnecting the previous socket...");
      socket.disconnect();
    }

    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("serverData", (receivedData) => {
      console.log("Data received from backend:", receivedData);
      setData(receivedData);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(newSocket);

    console.log("fetchData event emitted to backend");
    newSocket.emit("fetchData", { code });
  };

  const toggleModalBottom = () => {
    setIsVisible(!isVisible);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const showAllImagesArchive = () => {
    setShowModal(true);
    setTypeModal(4);
  };

  useEffect(() => {
    setCustomerData((prev) => ({
      ...prev,
      datereference: dateReferenceValue
        ? new Date(dateReferenceValue).toISOString()
        : "",
    }));
  }, [dateReferenceValue]);

  useEffect(() => {
    setCustomerData((prev) => ({
      ...prev,
      birthday: dataBirthdaty ? new Date(dataBirthdaty).toISOString() : "",
    }));
  }, [dataBirthdaty]);

  useEffect(() => {
    fetchData();
  }, [customerInfo.customerId, customerInfo.operationId]);

  useEffect(() => {
    if (
      customerInfo.customerId &&
      customerInfo.operationId &&
      customerInfo.archiveId
    ) {
      const getArchiveImage = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/archive/archiveinfo`,
            {
              params: {
                customerId: customerInfo.customerId,
                operationId: customerInfo.operationId,
                archiveId: customerInfo.archiveId,
                group: 1,
              },
            }
          );
          if (response.status === 200) {
            setAllImagesArchive(response?.data?.archive?.photos);
            setCustomerInfo((prev) => ({
              ...prev,
              settingId: response.data?.archive?.setting?.id,
            }));
            setSetting(response.data?.archive?.setting?.name);
            setDisable(true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getArchiveImage();
    }
  }, [
    customerInfo.archiveId,
    customerInfo.customerId,
    customerInfo.operationId,
  ]);

  const imageUrl = allImagesArchive?.length > 0 && allImagesArchive[0]?.url;
  const isImage = isImageUrl(imageUrl);

  useEffect(() => {
    if (user) {
      setCustomerInfo((prev) => ({
        ...prev,
        customerId: user?.customerId,
        operationId: user?.operationId,
        settingId: user?.settingId,
        archiveId: user?.id,
      }));
      setValueRadio(2);
      setIsNewOperation(false);
    }
  }, [user]);

  
  return (
    <div className={styles.wrapper}>
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            display: "flex",
            alignItems: "stretch",
            flexWrap: "wrap",
            height: "100%",
            direction: "rtl",
          }}
        >
          <Grid
            size={{ xs: 0, md: 4, lg: 2.3 }}
            sx={{
              display: isDesktop && "flex",
              flexDirection: "column",
            }}
            className={styles.right_section}
          >
            <RightSection>
              <div className={styles.wrapdrop}>
                <DropDownSearch
                  firstoptiontext="افزودن بیمار"
                  firstoptionclick={showAddCustomerModal}
                  items={allCustomer}
                  title="بیمار"
                  getOptionLabelProp="fullname"
                  name={"customerId"}
                  isEdit={"edit"}
                  openEditModal={openEditModal}
                  onChange={ChangeCustomerInfoHandler}
                  value={customerInfo.customerId}
                  emptyInput={emptyInput}
                />
              </div>
              <div className={styles.wrapdrop}>
                <DropDownSearch
                  title={"عملیات"}
                  firstoptiontext="افزودن عملیات"
                  firstoptionclick={() => {
                    setTypeModal(2);
                    setShowModal(true);
                  }}
                  items={operationsData}
                  name={"operationId"}
                  getOptionLabelProp="operation"
                  onChange={ChangeCustomerInfoHandler}
                  value={customerInfo.operationId}
                />
              </div>
              <FormControl className={styles.wrapdrop}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={vlaueRadio}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    className={styles.radio}
                    value="1"
                    onChange={(e) => {
                      setValueRadio(e.target.value);
                      setIsNewOperation(true);
                      setCustomerInfo((prev) => ({
                        ...prev,
                        settingId: "",
                        archiveId: "",
                      }));
                      setClearInput(true);
                      setDisable(false);
                      setAllImagesArchive([]);
                      setTimeout(() => setClearInput(false), 0);
                    }}
                    control={
                      <Radio
                        sx={{
                          fontFamily: "Vazir",
                          color: "var(--color-5)",
                          "&.Mui-checked": {
                            color: "var(--color-5)",
                          },
                        }}
                        checked={vlaueRadio == "1"}
                      />
                    }
                    label="عملیات جدید"
                  />
                  <FormControlLabel
                    className={styles.radio}
                    value="2"
                    onChange={(e) => setValueRadio(e.target.value)}
                    control={
                      <Radio
                        sx={{
                          fontFamily: "Vazir",
                          color: "var(--color-5)",
                          "&.Mui-checked": {
                            color: "var(--color-5)",
                          },
                        }}
                        checked={vlaueRadio == "2"}
                      />
                    }
                    label="ویرایش قبل"
                  />
                </RadioGroup>
              </FormControl>
              {vlaueRadio == 2 && (
                <div className={styles.wrapdrop}>
                  <DropDownSearch
                    title={"تاریخ عملیات"}
                    items={historyOperation}
                    name={"archiveId"}
                    getOptionLabelProp="date1"
                    onChange={ChangeCustomerInfoHandler}
                    value={customerInfo.archiveId}
                    setIsNewOperation={setIsNewOperation}
                    resetSearchValue={
                      customerInfo.customerId +
                      customerInfo.operationId +
                      vlaueRadio
                    }
                  />
                </div>
              )}
              <div className={styles.wrapdrop}>
                <DropDownSearch
                  title={"حالت ضبط"}
                  firstoptiontext="افزودن حالت ضبط"
                  firstoptionclick={() => {
                    setTypeModal(5);
                    setShowModal(true);
                  }}
                  items={allSettings}
                  name={"settingId"}
                  getOptionLabelProp="description"
                  onChange={ChangeCustomerInfoHandler}
                  value={customerInfo.settingId}
                  setSetting={setSetting}
                  clearInput={clearInput}
                  disable={disable}
                />
              </div>
              <div className={styles.wraparrowactions}>
                <Button2
                  icon={NorthIcon}
                  onClick={() => fetchDataFromServer("#MKE26$M11*")}
                />
                <Button2
                  icon={SouthIcon}
                  onClick={() => fetchDataFromServer("#MKE27$M11*")}
                />
                {/* <Button2 icon={EastIcon} onClick={""} />
                <Button2 icon={WestIcon} onClick={""} /> */}
              </div>
              {allImagesArchive?.length > 0 && vlaueRadio == 2 && (
                <div className={styles.image_archive_wrapper}>
                  <div className={styles.image_archive_box}>
                    {isImage ? (
                      <Image
                        src={allImagesArchive[0]?.url}
                        layout="fill"
                        alt="image archive"
                        className={styles.image_archive}
                      />
                    ) : (
                      <ReactPlayer
                        url={allImagesArchive[0].url}
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

                    <span
                      className={styles.text_view}
                      onClick={showAllImagesArchive}
                    >
                      نمایش همه
                    </span>
                  </div>
                </div>
              )}
            </RightSection>
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 9.7 }} sx={{ height: "100%" }}>
            <LeftSection>
              <Preview
                toggleModalBottom={toggleModalBottom}
                toggleExpand={toggleExpand}
                isExpanded={isExpanded}
              >
                {/* <Webcam
                  setting={setting}
                  data={data}
                  setPhotos={setPhotos}
                  socket={socket}
                  setSocket={setSocket}
                /> */}
                <div className={styles.icons_bottom_wrapper}>
                  <ReplayOutlinedIcon
                    className={`${styles.icon_refresh} ${styles.icon}`}
                    onClick={() => setPhotos([])}
                  />
                  <div
                    className={styles.wrap_camera}
                    onClick={() => fetchDataFromServer(setting)}
                  >
                    <CameraOutlinedIcon
                      className={`${styles.icon_camera} ${styles.icon}`}
                    />
                  </div>
                  <div className={styles.wrap_save_icon}>
                    <button
                      className={`${styles.button_save} ${
                        loading && styles.btn_save_disable
                      }`}
                      onClick={saveCustomerInfo}
                      disabled={loading}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                      }}
                    >
                      <SaveAltIcon
                        className={`${styles.icon_camera} ${styles.icon}`}
                      />
                    </button>
                  </div>
                </div>
              </Preview>
            </LeftSection>
            {photos.length > 0 && (
              <Grid container spacing={2.5} className={styles.wrap_get_media}>
                {photos.map((file, index) => {
                  const isImage =
                    file.endsWith(".jpeg") ||
                    file.endsWith(".jpg") ||
                    file.endsWith(".webp") ||
                    file.endsWith(".png") ||
                    file.startsWith("data:image");
                  return isImage ? (
                    <Grid
                      size={{ xs: 12, md: 3 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      key={index}
                    >
                      <Image
                        src={file}
                        alt={`uploaded file ${index}`}
                        className={styles.media_preview}
                        height={210}
                        width={210}
                      />
                    </Grid>
                  ) : (
                    <Grid
                      size={{ xs: 12, md: 3 }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      key={index}
                    >
                      <div className={styles.media_box}>
                        <ReactPlayer
                          url={file}
                          playing={false}
                          muted={false}
                          playsinline
                          preload="metadata"
                          className={styles.media_preview}
                          controls={true}
                          width={"100%"}
                          height={"100%"}
                        />
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
      <Modal
        title={
          typeModal === 1
            ? "افزودن بیمار"
            : typeModal === 2
            ? "افزودن عملیات"
            : typeModal === 3
            ? "تغییراطلاعات کاربر"
            : typeModal === 4
            ? "آرشیو عکسها"
            : typeModal === 5
            ? "افزودن  تنظیمات"
            : "حذف بیمار"
        }
        onClick={() => setShowModal(false)}
        showModal={showModal}
      >
        {typeModal === 1 ? (
          <form onSubmit={handlerAddCustomer} style={{ width: "100%" }}>
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid container spacing={2} className={styles.row_modal}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Input
                    label="نام و نام خانوادگی"
                    value={customerData.fullname}
                    onChange={changeHandler}
                    name={"fullname"}
                  />
                  {errors.fullname && (
                    <span className="error">{errors.fullname}</span>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Input
                    label="ایمیل"
                    value={customerData.email}
                    onChange={changeHandler}
                    name={"email"}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid container spacing={2} className={styles.row_modal}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Input
                    label="شماره تلفن"
                    value={convertToFarsiDigits(customerData.phonenumber || "")}
                    onChange={(e) => {
                      const englishValue = toEnglishNumber(e.target.value);
                      changeHandler({
                        target: { name: "phonenumber", value: englishValue },
                      });
                    }}
                    name={"phonenumber"}
                    type={"text"}
                  />
                  {errors.phonenumber && (
                    <span className="error">{errors.phonenumber}</span>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DropDownSearch
                    title="جنسیت"
                    value={customerData.gender}
                    onChange={changeHandler}
                    items={[
                      { lable: "مرد", id: "men" },
                      { lable: "زن", id: "women" },
                    ]}
                    getOptionLabelProp="lable"
                    name={"gender"}
                  />
                  {errors.gender && (
                    <span className="error">{errors.gender}</span>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid container spacing={2} className={styles.row_modal}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Input
                    label="شماره پرونده"
                    value={customerData.filenumber}
                    onChange={changeHandler}
                    name={"filenumber"}
                  />
                  {errors.filenumber && (
                    <span className="error">{errors.filenumber}</span>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Input
                    label="کدملی"
                    value={customerData.nationalcode}
                    onChange={changeHandler}
                    name={"nationalcode"}
                    type={"number"}
                  />
                  {errors.nationalcode && (
                    <span className="error">{errors.nationalcode}</span>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid container spacing={2} className={styles.row_modal}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InputData
                    label="تاریخ مراجعه"
                    value={dateReferenceValue}
                    onChange={setDateReferenceValue}
                    name={"datereference"}
                  />
                  {errors.datereference && (
                    <span className="error">{errors.datereference}</span>
                  )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InputData
                    label="تاریخ تولد"
                    value={dataBirthdaty}
                    onChange={setDataBirthdaty}
                    name={"birthday"}
                  />
                  {errors.birthday && (
                    <span className="error">{errors.birthday}</span>
                  )}
                </Grid>
              </Grid>
            </Box>
            <div className={styles.wrap_btn}>
              <Button1 text={"ذخیره"} icon={DoneIcon} type={"submit"} />
            </div>
          </form>
        ) : typeModal === 2 ? (
          <form onSubmit={addOperationHandler} style={{ width: "100%" }}>
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid container spacing={2} className={styles.row_modal}>
                <Grid size={{ xs: 12 }}>
                  <Input
                    label="عملیات"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    name={"operation"}
                  />
                  {errors.operation && (
                    <span className="error">{errors.operation}</span>
                  )}
                </Grid>
              </Grid>
            </Box>
            <div className={styles.wrap_btn}>
              <Button1
                text={"ذخیره"}
                icon={DoneIcon}
                disable={""}
                type={"submit"}
              />
            </div>
          </form>
        ) : typeModal === 3 ? (
          <>
            <form onSubmit={updateCustomer} style={{ width: "100%" }}>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Input
                      label="نام و نام خانوادگی"
                      value={customerData.fullname}
                      onChange={changeHandler}
                      name={"fullname"}
                    />
                    {errors.fullname && (
                      <span className="error">{errors.fullname}</span>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Input
                      label="ایمیل"
                      value={customerData.email}
                      onChange={changeHandler}
                      name={"email"}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Input
                      label="شماره تلفن"
                      value={customerData.phonenumber}
                      onChange={changeHandler}
                      name={"phonenumber"}
                      type={"number"}
                    />
                    {errors.phonenumber && (
                      <span className="error">{errors.phonenumber}</span>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <DropDownSearch
                      title="جنسیت"
                      value={customerData.gender}
                      onChange={changeHandler}
                      items={[
                        { lable: "مرد", id: "men" },
                        { lable: "زن", id: "women" },
                      ]}
                      getOptionLabelProp="lable"
                      name={"gender"}
                    />
                    {errors.gender && (
                      <span className="error">{errors.gender}</span>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Input
                      label="شماره پرونده"
                      value={customerData.filenumber}
                      onChange={changeHandler}
                      name={"filenumber"}
                    />
                    {errors.filenumber && (
                      <span className="error">{errors.filenumber}</span>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Input
                      label="کدملی"
                      value={customerData.nationalcode}
                      onChange={changeHandler}
                      name={"nationalcode"}
                      type={"number"}
                    />
                    {errors.nationalcode && (
                      <span className="error">{errors.nationalcode}</span>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputData
                      label="تاریخ مراجعه"
                      value={customerData?.datereference}
                      onChange={setDateReferenceValue}
                      name={"datereference"}
                    />
                    {errors.datereference && (
                      <span className="error">{errors.datereference}</span>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InputData
                      label="تاریخ تولد"
                      value={customerData?.birthday}
                      onChange={setDataBirthdaty}
                      name={"birthday"}
                    />
                    {errors.birthday && (
                      <span className="error">{errors.birthday}</span>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <div
                className={styles.wrap_delete}
                onClick={() => setTypeModal(6)}
              >
                <CloseIcon />
                <span className={styles.delete_text}>حذف</span>
              </div>
              <div className={styles.wrap_btn}>
                <Button1 text={"ذخیره"} icon={DoneIcon} type={"submit"} />
              </div>
            </form>
          </>
        ) : typeModal === 4 ? (
          <>
            <SliderImages
              heightStyle={"height"}
              imagesItem={allImagesArchive}
            />
          </>
        ) : typeModal === 5 ? (
          <>
            <form onSubmit={addSettingHandler} style={{ width: "100%" }}>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Input
                      label="کد تنظیمات"
                      value={setting}
                      onChange={(e) => setSetting(e.target.value)}
                      name={"setting"}
                    />
                    {errors.setting && (
                      <span className="error">{errors.setting}</span>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Input
                      label="اسم تنظیمات"
                      value={settingDes}
                      onChange={(e) => setSettingDes(e.target.value)}
                      name={"setting-des"}
                    />
                    {errors.setting_des && (
                      <span className="error">{errors.setting_des}</span>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <div className={styles.wrap_btn}>
                <Button1
                  text={"ذخیره"}
                  icon={DoneIcon}
                  disable={""}
                  type={"submit"}
                />
              </div>
            </form>
          </>
        ) : typeModal === 6 ? (
          <>
            <p className={styles.text_model}>در حال ایجاد ارشیو</p>
            <div className="wrap_loading">
              <span className={`loading`}></span>
            </div>
          </>
        ) : (
          <>
            <p className={styles.text_model}>
              آیا از حذف بیمار اطمینان دارید ؟
            </p>
            <div className={styles.wrap_btn_actions}>
              <Button1 text={"خیر"} Onclick={() => setShowModal(false)} />
              <Button1
                disable={loading}
                text={"بله"}
                Onclick={deleteCustomerHandler}
                style={{ background: "#535353" }}
                backstyle={"backstyle"}
              />
            </div>
          </>
        )}
      </Modal>
      <Toast
        type={toastInfo.type}
        title={toastInfo.title}
        message={toastInfo.message}
        showToast={showToast}
        setShowToast={setShowToast}
      />
      <ModalBottom isVisible={isVisible} setIsVisible={setIsVisible}>
        {showListImages ? (
          <>
            <SliderImages imagesItem={allImagesArchive} />
          </>
        ) : (
          <>
            <div className={styles.wrapdrop}>
              <DropDownSearch
                firstoptiontext="افزودن بیمار"
                firstoptionclick={showAddCustomerModal}
                items={allCustomer}
                title="بیمار"
                getOptionLabelProp="fullname"
                name={"customerId"}
                isEdit={"edit"}
                openEditModal={openEditModal}
                onChange={ChangeCustomerInfoHandler}
                value={customerInfo.customerId}
                emptyInput={emptyInput}
              />
            </div>
            <div className={styles.wrapdrop}>
              <DropDownSearch
                title={"عملیات"}
                firstoptiontext="افزودن عملیات"
                firstoptionclick={() => {
                  setTypeModal(2);
                  setShowModal(true);
                }}
                items={operationsData}
                name={"operationId"}
                getOptionLabelProp="operation"
                onChange={ChangeCustomerInfoHandler}
                value={customerInfo.operationId}
              />
            </div>
            <FormControl className={styles.wrapdrop}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
              >
                <FormControlLabel
                  className={styles.radio}
                  value="1"
                  onChange={(e) => {
                    setValueRadio(e.target.value);
                    setIsNewOperation(true);
                  }}
                  control={
                    <Radio
                      sx={{
                        fontFamily: "Vazir",
                        color: "var(--color-5)",
                        "&.Mui-checked": {
                          color: "var(--color-5)",
                        },
                      }}
                    />
                  }
                  label="عملیات جدید"
                />
                <FormControlLabel
                  className={styles.radio}
                  value="2"
                  onChange={(e) => setValueRadio(e.target.value)}
                  control={
                    <Radio
                      sx={{
                        fontFamily: "Vazir",
                        color: "var(--color-5)",
                        "&.Mui-checked": {
                          color: "var(--color-5)",
                        },
                      }}
                    />
                  }
                  label="ویرایش قبل"
                />
              </RadioGroup>
            </FormControl>
            {vlaueRadio == 2 && (
              <div className={styles.wrapdrop}>
                <DropDownSearch
                  title={"تاریخ عملیات"}
                  items={historyOperation}
                  name={"archiveId"}
                  getOptionLabelProp="date1"
                  onChange={ChangeCustomerInfoHandler}
                  value={customerInfo.archiveId}
                  setIsNewOperation={setIsNewOperation}
                  resetSearchValue={
                    customerInfo.customerId +
                    customerInfo.operationId +
                    vlaueRadio
                  }
                />
              </div>
            )}
            <div className={styles.wrapdrop}>
              <DropDownSearch
                title={"حالت ضبط"}
                firstoptiontext="افزودن حالت ضبط"
                firstoptionclick={() => {
                  setTypeModal(5);
                  setShowModal(true);
                }}
                items={allSettings}
                name={"settingId"}
                getOptionLabelProp="description"
                onChange={ChangeCustomerInfoHandler}
                value={customerInfo.settingId}
                setSetting={setSetting}
              />
            </div>
          </>
        )}
        <div className={styles.wrap_actions}>
          <div
            className={styles.wrap_icon_image}
            onClick={toggleShowListImages}
          >
            <InsertPhotoIcon className={styles.icon_image} />
          </div>
          {!showListImages && (
            <div className={styles.wrap_controls}>
              {/* <Button2 icon={EastIcon} /> */}
              <Button2 icon={NorthIcon} />
              <Button2 icon={SouthIcon} />
              {/* <Button2 icon={WestIcon} /> */}
            </div>
          )}
        </div>
      </ModalBottom>
    </div>
  );
}
