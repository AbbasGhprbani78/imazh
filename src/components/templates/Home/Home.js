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

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [operationsData, setAllOperationsData] = useState([]);
  const [allCustomer, setAllCustomer] = useState();
  const [dateReferenceValue, setDateReferenceValue] = useState("");
  const [typeModal, setTypeModal] = useState(1);
  const [dataBirthdaty, setDataBirthdaty] = useState("");
  const [operation, setOperation] = useState("");
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
  });

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
          setShowModal(false);
          getAllCustomer();
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت آمیز",
            message: "بیمار با موفقیت اضافه شد",
          });

          customerData.fullname = "";
          customerData.email = "";
          customerData.phonenumber = "";
          customerData.nationalcode = "";
          customerData.datereference = "";
          customerData.birthday = "";
          customerData.filenumber = "";
          customerData.gender = "";
        }
      } catch (error) {
        console.log(error);
        setShowToast(true);
        setToastInfo({
          type: "error",
          title: "خطا در اضافه کردن بیمار",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
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
        console.log(response.data);
        setAllCustomer(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addOperationHandler = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!isRequired(customerData.operation)) {
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
        setToastInfo({
          type: "error",
          title: "خطا در اضافه کردن عملیات",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
        });
      }
    }
  };

  useEffect(() => {
    getAllOperation();
    getAllCustomer();
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
                  firstoptionclick={() => {
                    setTypeModal(1);
                    setShowModal(true);
                  }}
                  items={allCustomer}
                  title="بیمار"
                  getOptionLabelProp="fullname"
                  name={"customer"}
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
                  name={"operation"}
                  getOptionLabelProp="operation"
                />
              </div>
              <div className={styles.wrapdrop}>
                <DropDownSearch
                  title={"حالت ضبط"}
                  firstoptiontext="افزودن حالت ضبط"
                />
              </div>
            </RightSection>
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: "100%" }}>
            <LeftSection />
          </Grid>
        </Grid>
      </Box>
      <Modal
        title={
          typeModal === 1
            ? "افزودن بیمار"
            : typeModal === 2
            ? "افزودن عملیات"
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
                      { lable: "مرد", _id: "men" },
                      { lable: "زن", _id: "women" },
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
        ) : null}
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
