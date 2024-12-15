"use client";
import styles from "./Header.module.css";
import Offcanvas from "../Offcanvas/Offcanvas";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
  const [role, setRole] = useState("");

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me");
        if (response.status === 200) {
          console.log(response.data);
          setRole(response.data.role);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMe();
  }, []);

  const logOutHnadler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {}
      );
      if (response.status === 200) {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={`${styles.header} `}>
      <Offcanvas />
      <nav className={styles.navbar}>
        <div className={styles.logo_wrapper}>
          <img src="/images/6.svg" alt="logo" />
        </div>
        <ul className={styles.list}>
          {role == "d" ? (
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
              <li onClick={logOutHnadler} className={`${styles.list_item}`}>
                خروج
              </li>
            </>
          ) : role === "a" ? (
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
              <li onClick={logOutHnadler} className={`${styles.list_item}`}>
                خروج
              </li>
            </>
          ) : role === "s" ? (
            <>
              <Link
                className={`${styles.list_item} ${
                  isActive("/archive") && styles.active
                }`}
                href="/archive"
              >
                آرشیو
              </Link>
              <li onClick={logOutHnadler} className={`${styles.list_item}`}>
                خروج
              </li>
            </>
          ) : null}
        </ul>
      </nav>
      <div className={styles.profile_image_wrapper}>
        <img src="/images/5.svg" alt="profile" />
      </div>
    </header>
  );
}
