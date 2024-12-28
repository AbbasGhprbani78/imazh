import React from "react";
import DropDownSearch from "../../DropDown/DropDownSearch";

export default function ManualTab() {
  return (
    <form onSubmit={""}>
      <div className={` animationcome`}>
        <div className={"wrap_row"}>
          <DropDownSearch
            items={[]}
            title={"عملیات"}
            name={"action"}
            onChange={""}
            getOptionLabelProp={""}
            value={""}
            style1={"dropimage"}
            style2={"background"}
          />
        </div>
      </div>
    </form>
  );
}
