import styles from "./Header.module.css";
import Offcanvas from "../Offcanvas/Offcanvas";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <header className={`${styles.header} `}>
      <Offcanvas />
      <nav className={styles.navbar}>
        <div className={styles.logo_wrapper}>
          <img src="/images/6.svg" alt="logo" />
        </div>
        <ul className={styles.list}>
          <Link
            className={`${styles.list_item} ${isActive("/") && styles.active}`}
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
        </ul>
      </nav>
      <div className={styles.profile_image_wrapper}>
        <img src="/images/5.svg" alt="profile" />
      </div>
    </header>
  );
}
