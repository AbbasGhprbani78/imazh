"use client";
import styles from "./Header.module.css";
import Offcanvas from "../Offcanvas/Offcanvas";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Modal from "../Modal/Modal";
import Button1 from "../Buttons/Button1";
import KeyIcon from "@mui/icons-material/Key";
import Input from "../Input/Input";
import Toast from "../Toast/Toast";
import { isRequired } from "@/utils/validate";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const [me, setMe] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [imageProfile, setImageProfile] = useState("");
  const [password, setPassword] = useState("");
  const [originalProfile, setOriginalProfile] = useState({
    img: "",
    username: "",
  });

  const [profile, setProfile] = useState({
    img: "",
    username: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    type: "",
    title: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    username: "",
  });

  const handleChangeProfileInput = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: files[0],
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const getMe = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me");
      if (response.status === 200) {
        setMe(response.data);
        profile.username = response.data.username;
        profile.img = response.data.img;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOutHnadler = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {}
      );
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changePassowrdHandler = async () => {
    let formErrors = {};
    if (!isRequired(password)) {
      formErrors.password = "رمز نمی تواند خالی باشد";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        setLoading(true);
        const response = await axios.put(
          "http://localhost:3000/api/auth/me/changepassword",
          { password }
        );
        if (response.status === 200) {
          setPassword("");
          setShowModal(false);
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت امیز",
            message: response?.data?.message,
          });
        }
      } catch (error) {
        console.log(error);
        setToastInfo({
          type: "error",
          title: "خطا در تغییر زمزعبور",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const chnageProfile = async () => {
    let formErrors = {};
    if (!isRequired(profile.username)) {
      formErrors.username = "نام کاربری الزامی است";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("img", profile.img);
      try {
        const response = await axios.put(
          "http://localhost:3000/api/auth/me",
          formData
        );
        if (response.status === 200) {
          setShowModal(false);
          setShowToast(true);
          setToastInfo({
            type: "success",
            title: "عملیات موفقیت امیز",
            message: response?.data?.message,
          });
          setIsEdit(false);
          getMe();
        }
      } catch (error) {
        console.log(error);
        setToastInfo({
          type: "error",
          title: "خطا در تغییر پروفایل",
          message:
            error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openProfileModal = () => {
    setOriginalProfile({ ...profile });
    setShowModal(true);
    setTypeModal(1);
  };
  const openPasswordModal = () => {
    setShowModal(true);
    setTypeModal(2);
  };
  const openLogoutModal = () => {
    setShowModal(true);
    setTypeModal(3);
  };

  const closeModal = () => {
    setProfile({ ...originalProfile });
    setShowModal(false);
    setImageProfile("");
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <header className={`${styles.header} `}>
        <Offcanvas
          openProfileModal={openProfileModal}
          openPasswordModal={openPasswordModal}
          openLogoutModal={openLogoutModal}
          me={me}
        />
        <nav className={styles.navbar}>
          <div className={styles.logo_wrapper}>
            <Image src="/images/6.svg" alt="logo" width={40} height={40} />
          </div>
          <ul className={styles.list}>
            {me?.role == "d" ? (
              <>
                <Link
                  className={`${styles.list_item} ${
                    isActive("/") && styles.active
                  }`}
                  href="/"
                >
                  صفحه اصلی
                </Link>
                <Link
                  className={`${styles.list_item} ${
                    isActive("/archive") && styles.active
                  }`}
                  href="/archive"
                >
                  آرشیو
                </Link>
              </>
            ) : me?.role === "a" ? (
              <>
                <Link
                  className={`${styles.list_item} ${
                    isActive("/") && styles.active
                  }`}
                  href="/"
                >
                  صفحه اصلی
                </Link>
                <Link
                  className={`${styles.list_item} ${
                    isActive("/archive") && styles.active
                  }`}
                  href="/archive"
                >
                  آرشیو
                </Link>
                <Link
                  className={`${styles.list_item} ${
                    isActive("/setting") && styles.active
                  }`}
                  href="/setting"
                >
                  تنظیمات
                </Link>
              </>
            ) : me?.role === "s" ? (
              <>
                <Link
                  className={`${styles.list_item} ${
                    isActive("/archive") && styles.active
                  }`}
                  href="/archive"
                >
                  آرشیو
                </Link>
              </>
            ) : null}
          </ul>
        </nav>
        <div className={styles.profile_image_wrapper}>
          <Image
            src={me.img ? me.img : "/images/5.svg"}
            alt="profile"
            width={40}
            height={40}
          />
          <div className={styles.wrap_useraction}>
            <ul className={styles.list_useraction}>
              <li className={styles.useraction_item} onClick={openProfileModal}>
                <PersonIcon className={styles.icon_action} />
                <span className={styles.action_text_user}>حساب کاربری</span>
              </li>
              <li
                className={styles.useraction_item}
                onClick={openPasswordModal}
              >
                <KeyIcon className={styles.icon_action} />
                <span className={styles.action_text_user}>
                  تغییر رمز کاربری
                </span>
              </li>
              <li className={styles.useraction_item} onClick={openLogoutModal}>
                <LogoutOutlinedIcon className={styles.icon_action} />
                <span className={styles.action_text_user}>خروج</span>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Modal
        title={
          typeModal === 1
            ? "ویرایش پروفایل"
            : typeModal === 2
            ? "تغییر رمز"
            : "خروج"
        }
        onClick={closeModal}
        showModal={showModal}
      >
        {typeModal === 1 ? (
          <>
            <div className={styles.wrap_image_profile}>
              <Image
                src={
                  imageProfile
                    ? imageProfile
                    : profile?.img
                    ? profile.img
                    : "/images/5.svg"
                }
                width={90}
                height={90}
                alt="profile"
              />
              <label
                htmlFor="file"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  cursor: "pointer",
                }}
              ></label>
              <input
                name="img"
                type="file"
                id="file"
                style={{ display: "none" }}
                accept="image/*"
                disabled={!isEdit}
                onChange={(e) => {
                  handleChangeProfileInput(e);
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setImageProfile(URL.createObjectURL(file));
                  } else {
                    console.error("No file selected");
                  }
                }}
              />
            </div>
            <div className={styles.wrap_input}>
              <Input
                value={profile.username}
                onChange={handleChangeProfileInput}
                name={"username"}
                label={"نام کاربری"}
                disable={!isEdit}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>
            <Input
              value={
                me?.role === "a"
                  ? "ادمین"
                  : me?.role === "d"
                  ? "پزشک"
                  : me?.role === "s"
                  ? "منشی"
                  : ""
              }
              name={"role"}
              label={"نقش کاربر"}
              disable={true}
            />
            <div className={styles.wrap_btn_actions}>
              <Button1
                disable={loading}
                text={"تایید"}
                Onclick={chnageProfile}
              />
              <Button1 text={"ویرایش"} Onclick={() => setIsEdit(true)} />
            </div>
          </>
        ) : typeModal === 2 ? (
          <>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name={"password"}
              label={"رمز"}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <div className={styles.wrap_btn_actions}>
              <Button1
                disable={loading}
                text={"تایید"}
                Onclick={changePassowrdHandler}
              />
            </div>
          </>
        ) : (
          <>
            <p className={styles.text_model}>آیا از حساب کاربری خارج میشوید؟</p>
            <div className={styles.wrap_btn_actions}>
              <Button1 text={"خیر"} Onclick={() => setShowModal(false)} />
              <Button1
                disable={loading}
                text={"بله"}
                Onclick={logOutHnadler}
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
    </>
  );
}
