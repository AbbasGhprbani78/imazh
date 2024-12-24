import DropDownSearch from "@/components/module/DropDown/DropDownSearch";
import LeftSection from "@/components/module/LeftSection/LeftSection";
import RightSection from "@/components/module/RightSection/RightSection";
import Grid from "@mui/material/Grid2";
import React from "react";
import styles from "./UserArchive.module.css";

export default function CustomerArchive() {
  return (
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
          </RightSection>
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: "100%" }}>
          <LeftSection saveItem={""} loading={""} />
        </Grid>
      </Grid>
    </Box>
  );
}
