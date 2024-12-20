import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { verifyAccessToken } from "./auth";

const prisma = new PrismaClient();

const getUserFromToken = async () => {
  try {
    const cookieStore =await cookies();
    const cookieToken = cookieStore.get("token");

    if (!cookieToken) return null;

    const tokenPayload = verifyAccessToken(cookieToken.value);
    if (!tokenPayload) return null;

    const user = await prisma.user.findUnique({
      where: {
        username: tokenPayload.username,
      },
    });

    return user;
  } catch (error) {
    console.error("Error in getUserFromToken:", error);
    return null;
  }
};

const authUser = async () => {
  try {
    const user = await getUserFromToken();
    return user;
  } catch (error) {
    console.error("Error in authUser:", error);
    return null;
  }
};

const authAdmin = async () => {
  try {
    const user = await getUserFromToken();
    if (user && user.role === "a") {
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error in authAdmin:", error);
    return null;
  }
};

export { authUser, authAdmin };
