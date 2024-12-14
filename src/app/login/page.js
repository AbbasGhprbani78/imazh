"use client"
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./Login.module.css";
import { useState } from "react";
import axios from "axios";
import { isRequired } from "@/utils/validate";
import Input from "@/components/module/Input/Input";
import Button1 from "@/components/module/Buttons/Button1";

export default function Login() {
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
        const response = await axios.post(`${""}//`);
        if (response.status === 200) {
         
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid
        container
        spacing={2.5}
        sx={{
          display: "flex",
          alignItems: "start",
          flexWrap: "wrap",
          height: "100dvh",
          maxHeight: "100dvh",
        }}
      >
        <Grid size={{ xs: 12, md: 4 }} sx={{ height: "100dvh" }}>
          <div className={styles.login_container}>
            <div className={styles.logo_wrapper}>
              <img src="/images/6.svg" alt="logo" />
            </div>
            <div className={styles.from_wrapper}>
              <div className={styles.from_top}>
                <span className={styles.form_title}>ورود</span>
                <p className={styles.form_text}>
                  نام کاربری و رمز عبور خود را وارد کنید
                </p>
              </div>
              <form onSubmit={handlerSubmit} className={styles.form}>
                <div className={styles.wrap_input}>
                  <Input
                    name="username"
                    label={"نام کاربری"}
                    value={formData.username}
                    onChange={changeHandler}
                  />
                  {errors.username && (
                    <span className="error">{errors.username}</span>
                  )}
                </div>
                <div className={styles.wrap_input}>
                  <Input
                    name="password"
                    label={"رمز عبور"}
                    value={formData.password}
                    onChange={changeHandler}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
                <div className={styles.wrap_button}>
                  <Button1 text={"ورود"} type={"submit"} />
                </div>
              </form>
            </div>
          </div>
        </Grid>
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{ height: "100dvh"}}
          className={styles.wrap_right}
        >
          <div className={styles.login_image}>
            <img src="/images/7.svg" alt="login image" />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
