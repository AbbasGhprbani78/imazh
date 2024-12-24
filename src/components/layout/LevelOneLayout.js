import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { verifyAccessToken } from "@/utils/auth";

const prisma = new PrismaClient();

const Layout = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await prisma.user.findUnique({
        where: {
          username: tokenPayload.username,
        },
      });
    }
  }

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
