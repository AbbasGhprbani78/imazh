import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import DropDownSearch from "../../DropDown/DropDownSearch";
import Input from "../../Input/Input";
import ToggleInput from "../../ToggleInput/ToggleInput";
import Button1 from "../../Buttons/Button1";
export default function VideoTab() {
  return (
    <form onSubmit={""} className="form-tab">
      <div className={`item-container-setting animationcome`}>
        <div className={"wrap_row"}>
          <DropDownSearch
            items={[]}
            title={"رزولیشن ضبط ویدیو"}
            name={"resolution"}
            onChange={""}
            getOptionLabelProp={""}
            value={""}
            style1={"dropsetting"}
            style2={"background"}
          />
        </div>
        <div className={"wrap_row"}>
          <Input
            label={"وقفه در شروع ضبط ویدیو"}
            value={""}
            name={"stopvideo"}
            onChange={""}
            type={"text"}
          />
        </div>
        <div className={"wrap_row"}>
          <Input
            label={"پسوند"}
            value={""}
            name={"extension"}
            onChange={""}
            type={"text"}
          />
        </div>
        <div className={"wrap_row"}>
          <DropDownSearch
            items={[]}
            title={"framerate"}
            name={"framerate"}
            onChange={""}
            getOptionLabelProp={""}
            value={""}
            style1={"dropsetting"}
            style2={"background"}
          />
        </div>
        <ToggleInput select1={"pal"} select2={"NTSC"} />
      </div>
      <div className="wrap-buttom">
        <Button1 text={"ذخیره"} Onclick={""} icon={DoneIcon} />
      </div>
    </form>
  );
}
