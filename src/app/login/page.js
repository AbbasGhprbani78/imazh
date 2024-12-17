import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./Login.module.css";
import LoginForm from "@/components/templates/Login/LoginForm";

export default function Login() {
  return (
    <>
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
                <LoginForm />
              </div>
            </div>
          </Grid>
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ height: "100dvh" }}
            className={styles.wrap_right}
          >
            <div className={styles.login_image}>
              <img src="/images/7.svg" alt="login image" />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
