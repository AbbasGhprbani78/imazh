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
import Button2 from "../Buttons/Button2";
import CloseIcon from "@mui/icons-material/Close";
import Toast from "../Toast/Toast";
import { isRequired } from "@/utils/validate";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
  const [me, setMe] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [password, setPassword] = useState("");
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

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me");
        if (response.status === 200) {
          console.log(response.data);
          setMe(response.data);
          profile.username = response.data.username;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMe();
  }, []);

  const logOutHnadler = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {}
      );
      if (response.status === 200) {
        router.replace("/login");
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
        const response = await axios.patch("");
        if (response.status === 200) {
          setPassword("");
          setShowModal(false);
          setShowToast(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    }
  };

  const changeProfileHandler = async () => {};

  return (
    <>
      <header className={`${styles.header} `}>
        <Offcanvas />
        <nav className={styles.navbar}>
          <div className={styles.logo_wrapper}>
            <img src="/images/6.svg" alt="logo" />
          </div>
          <ul className={styles.list}>
            {me.role == "d" ? (
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
            ) : me.role === "a" ? (
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
                  c
                  className={`${styles.list_item} ${
                    isActive("/setting") && styles.active
                  }`}
                  href="/setting"
                >
                  تنظیمات
                </Link>
              </>
            ) : me.role === "s" ? (
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
          <img src="/images/5.svg" alt="profile" />
          <div className={styles.wrap_useraction}>
            <ul className={styles.list_useraction}>
              <li
                className={styles.useraction_item}
                onClick={() => {
                  setShowModal(true);
                  setTypeModal(1);
                }}
              >
                <PersonIcon className={styles.icon_action} />
                <span className={styles.action_text_user}>حساب کاربری</span>
              </li>
              <li
                className={styles.useraction_item}
                onClick={() => {
                  setShowModal(true);
                  setTypeModal(2);
                }}
              >
                <KeyIcon className={styles.icon_action} />
                <span className={styles.action_text_user}>
                  تغییر رمز کاربری
                </span>
              </li>
              <li
                className={styles.useraction_item}
                onClick={() => {
                  setShowModal(true);
                  setTypeModal(3);
                }}
              >
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
        onClick={() => setShowModal(false)}
        showModal={showModal}
      >
        {typeModal === 1 ? (
          <>
            <div className={styles.wrap_image_profile}>
              <img src="/images/5.svg" alt="profile" />
              <label
                htmlFor="file"
                style={{ width: "100%", height: "100%" }}
              ></label>
              <input
                type="file"
                id="file"
                value={profile.img}
                onChange={handleChangeProfile}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.wrap_input}>
              <Input
                value={profile.username}
                onChange={handleChangeProfile}
                name={"username"}
                label={"نام کاربری"}
              />
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
                Onclick={changeProfileHandler}
              />
              <Button1
                disable={loading}
                text={"ویرایش"}
                Onclick={() => setIsEdit(true)}
              />
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
              <Button2 onClick={() => setShowModal(false)} icon={CloseIcon} />
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
      <Toast />
    </>
  );
}
