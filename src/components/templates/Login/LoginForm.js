"use client"
import { isRequired } from '@/utils/validate';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import styles from './Login.module.css'
import Button1 from '@/components/module/Buttons/Button1';
import Input from '@/components/module/Input/Input';
import Toast from '@/components/module/Toast/Toast';

export default function LoginForm() {
     const router = useRouter();
     const [showToast, setShowToast] = useState(false);
     const [loading, setLoading] = useState(false);
     const [toastInfo, setToastInfo] = useState({
       type: "",
       title: "",
       message: "",
     });

     const [formData, setFormData] = useState({
       username: "",
       password: "",
     });

     const [errors, setErrors] = useState({
       username: "",
       password: "",
     });

     const changeHandler = (e) => {
       const { name, value } = e.target;
       setFormData((prevData) => ({
         ...prevData,
         [name]: value,
       }));

       setErrors((prevErrors) => ({
         ...prevErrors,
         [name]: "",
       }));
     };

     const handlerSubmit = async (e) => {
       e.preventDefault();

       let formErrors = {};

       if (!isRequired(formData.username)) {
         formErrors.username = "نام کاربری الزامی است";
       }
       if (!isRequired(formData.password)) {
         formErrors.password = "رمز عبور الزامی است";
       }
       if (Object.keys(formErrors).length > 0) {
         setErrors(formErrors);
       } else {
         try {
           setLoading(true);
           const response = await axios.post(
             "http://localhost:3000/api/auth/login",
             formData
           );
           if (response.status === 200) {
             if (response.data.role === "a" || response.data.role === "d") {
               router.replace("/");
             } else if (response.data.role === "s") {
               router.replace("archive");
             }
           }
         } catch (error) {
           console.log(error);
           setShowToast(true);
           setToastInfo({
             type: "error",
             title: "خطا در ورود",
             message:
               error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
           });
         } finally {
           setLoading(false);
         }
       }
     };
  return (
    <>
      <form onSubmit={handlerSubmit} className={styles.form}>
        <div className={styles.wrap_input}>
          <Input
            name="username"
            label={"نام کاربری"}
            value={formData.username}
            onChange={changeHandler}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className={styles.wrap_input}>
          <Input
            name="password"
            label={"رمز عبور"}
            value={formData.password}
            onChange={changeHandler}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className={styles.wrap_button}>
          <Button1 text={"ورود"} type={"submit"} disable={loading} />
        </div>
      </form>
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
