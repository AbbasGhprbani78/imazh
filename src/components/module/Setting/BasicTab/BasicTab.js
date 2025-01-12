import React from "react";
import styles from "./BasicTab.module.css";
import DropDownSearch from "../../DropDown/DropDownSearch";
import Input from "../../Input/Input";
import Button1 from "../../Buttons/Button1";
import DoneIcon from "@mui/icons-material/Done";
export default function BasicTab() {
  return (
    <form onSubmit={""} className={"form-tab"}>
      <div className={`item-container-setting animationcome`}>
        <div className={"wrap_row"}>
          <DropDownSearch
            items={[]}
            title={"درایو نگهداری اطلاعات"}
            name={"drive"}
            onChange={""}
            getOptionLabelProp={""}
            value={""}
            style1={"dropsetting"}
            style2={"background"}
          />
        </div>
        <div className={"wrap_row"}>
          <Input
            label={"پورت کام"}
            value={""}
            name={"port"}
            onChange={""}
            type={"text"}
          />
        </div>
        {/* <ToggleInput select1={"کابل"} select2={"wifi"} title={"نوع اتصال"} /> */}
      </div>
      <div className="wrap-buttom">
        <Button1 text={"ذخیره"} Onclick={""} icon={DoneIcon} />
      </div>
    </form>
  );
}
