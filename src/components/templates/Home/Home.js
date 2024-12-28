"use client";
import { Box } from "@mui/material";
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "@/components/module/Toast/Toast";
import { isRequired, validateNationalCode } from "@/utils/validate";
import { valiadteEmail, valiadtePhone } from "@/utils/auth";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Webcam from "@/components/module/Webcam/Webcam";
import io from "socket.io-client";

export default function Home() {
  const [data, setData] = useState([]);
  const [setting, setSetting] = useState("");
  const [socket, setSocket] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    customerId: "",
    operationId: "",
    settingId: "",
    operationDateId: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [operationsData, setAllOperationsData] = useState([]);
  const [allCustomer, setAllCustomer] = useState();
  const [allSettings, setAllSettings] = useState();
  const [dateReferenceValue, setDateReferenceValue] = useState("");
  const [typeModal, setTypeModal] = useState(1);
  const [dataBirthdaty, setDataBirthdaty] = useState("");
  const [operation, setOperation] = useState("");
  const [idUser, setIdUser] = useState("");
  const [isNewOperation, setIsNewOperation] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [historyOperation, setHistoryOperation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
  });

  const validateCustomerInfo = () => {
    if (!isRequired(customerInfo.customerId)) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "بیمار باید مشخص گردد",
      });
      console.log(isRequired());
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
        message: "تنظیمات باید مشخص گردد",
      });
      return false;
    }

    if (photos.length === 0) {
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا",
        message: "عکس باید انتخاب شود",
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
    if (!validateNationalCode(customerData.nationalcode)) {
      formErrors.nationalcode = "فرمت کدملی معتبرنیست";
    }
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
          setShowModal(false);
          getAllCustomer();
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
        console.log(error);
        setShowToast(true);
        setToastInfo({
          type: "error",
          title: "خطا در اضافه کردن بیمار",
          message: "",
        });
      }
    }
  };

  const getAllOperation = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/operation");
      if (response.status === 200) {
        setAllOperationsData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCustomer = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer");
      if (response.status === 200) {
        setAllCustomer(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSetting = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/setting");
      if (response.status === 200) {
        setAllSettings(response.data);
      }
    } catch (error) {
      console.log(error);
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
          getAllOperation();
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
        console.log(error);
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
      formErrors.setting = "وارد کردن تنظیمات عملیات الزامی است";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await axios.post("http://localhost:3000/api/setting", {
          name: setting,
        });
        if (response.status === 201) {
          getAllSetting();
          setShowModal(false);
          setSetting("");
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت آمیز",
            message: "تنظیمات با موفقیت اضافه شد",
          });
        }
      } catch (error) {
        console.log(error);
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
      console.log(error);
      setShowToast(true);
      setToastInfo({
        type: "error",
        title: "خطا در اضافه کردن عملیات",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setPhotos(Array.from(files));
  };

  const saveCustomerInfo = async () => {
    if (!validateCustomerInfo()) return;
    if (isNewOperation) {
      const formData = new FormData();
      formData.append("operationId", customerInfo.operationId);
      formData.append("settingId", customerInfo.settingId);
      formData.append("customerId", customerInfo.customerId);
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });
      try {
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
            message: "ارشیو بیمار با موفقیت اضافه شد",
          });
        }
      } catch (error) {
        setShowToast(true);
        setToastInfo({
          type: "error",
          title: "خطا دراضافه کردن ارشیو",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
        });
      } finally {
        setLoading(false);
      }
    } else {
      const formData = new FormData();
      formData.append("archiveId", customerInfo.operationDateId);
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/archive/updatearchive",
          formData
        );
        if (response.status === 200) {
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت آمیز",
            message: "ارشیو بیمار با موفقیت اضافه شد",
          });
        }
      } catch (error) {
        setToastInfo({
          type: "error",
          title: "خطا دراضافه کردن ارشیو",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const fetchDataFromServer = () => {
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
    newSocket.emit("fetchData", { setting });
  };

  useEffect(() => {
    getAllOperation();
    getAllCustomer();
    getAllSetting();
  }, []);

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
    console.log(photos);
  }, [photos]);

  return (
    <div className={`wrapper`}>
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            display: "flex",
            alignItems: "start",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          <Grid size={{ xs: 12, md: 4, lg: 3 }} sx={{ height: "100%" }}>
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
              <div className={styles.wrapdrop}>
                <DropDownSearch
                  title={"تاریخ عملیات"}
                  firstoptiontext="عملیات جدید"
                  firstoptionclick={() => setIsNewOperation(true)}
                  items={historyOperation}
                  name={"operationDateId"}
                  getOptionLabelProp="date1"
                  onChange={ChangeCustomerInfoHandler}
                  value={customerInfo.operationDateId}
                  setIsNewOperation={setIsNewOperation}
                />
              </div>
              <div className={styles.wrapdrop}>
                <DropDownSearch
                  title={"حالت ضبط"}
                  firstoptiontext="افزودن حالت ضبط"
                  firstoptionclick={() => {
                    setTypeModal(4);
                    setShowModal(true);
                  }}
                  items={allSettings}
                  name={"settingId"}
                  getOptionLabelProp="name"
                  onChange={ChangeCustomerInfoHandler}
                  value={customerInfo.settingId}
                  setSetting={setSetting}
                />
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </RightSection>
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: "100%" }}>
            <LeftSection isExpanded={isExpanded}>
              <Webcam setting={setting} data={data} setPhotos={setPhotos} />
              <div className={styles.icon_top_wrapper} onClick={toggleExpand}>
                <img src="/images/4.svg" alt="icon" />
              </div>
              <div className={styles.icons_bottom_wrapper}>
                <ReplayOutlinedIcon className={styles.icon_refresh} />
                <div
                  className={styles.wrap_camera}
                  onClick={fetchDataFromServer}
                >
                  <CameraOutlinedIcon className={styles.icon_camera} />
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
                    <SaveAltIcon className={styles.icon_camera} />
                  </button>
                </div>
              </div>
            </LeftSection>
          </Grid>
        </Grid>
      </Box>
      <div className={styles.video_box_wrapper}>
        {photos.length > 0 &&
          photos.map((videoURL, index) => (
            <div key={index} className={styles.video_box}>
              <video
                src={videoURL}
                controls
                className={styles.video_preview}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              ></video>
            </div>
          ))}
      </div>
      <Modal
        title={
          typeModal === 1
            ? "افزودن بیمار"
            : typeModal === 2
            ? "افزودن عملیات"
            : typeModal === 3
            ? "تغییراطلاعات کاربر"
            : "افزودن  تنظیمات"
        }
        onClick={() => setShowModal(false)}
        showModal={showModal}
      >
        {typeModal === 1 ? (
          <form onSubmit={handlerAddCustomer} style={{ width: "100%" }}>
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid container spacing={2} className={styles.row_modal}>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
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
              <div className={styles.wrap_btn}>
                <Button1 text={"ذخیره"} icon={DoneIcon} type={"submit"} />
              </div>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={addSettingHandler} style={{ width: "100%" }}>
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={2} className={styles.row_modal}>
                  <Grid size={{ xs: 12 }}>
                    <Input
                      label="تنظیمات"
                      value={setting}
                      onChange={(e) => setSetting(e.target.value)}
                      name={"setting"}
                    />
                    {errors.setting && (
                      <span className="error">{errors.setting}</span>
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
        )}
      </Modal>
      <Toast
        type={toastInfo.type}
        title={toastInfo.title}
        message={toastInfo.message}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </div>
  );
}
