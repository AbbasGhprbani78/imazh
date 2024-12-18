import React from "react";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/serverHelpers";

const Layout = async ({ children }) => {
  const user = await authUser();

  if (user) {
    if (user.role !== "a") {
      return redirect("/login");
    }
  } else {
    return redirect("/login");
  }

  return <>{children}</>;
};

export default Layout;
