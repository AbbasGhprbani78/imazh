import { cookies } from "next/headers";
import UserModel from "../../models/User";
import connectToDB from "../../configs/db";
import { verifyAccessToken } from "./auth";

const authUser = async () => {
  connectToDB();
  const token =await cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ username: tokenPayload.username });
    }
  }
  return user;
};

const authAdmin = async () => {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ username: tokenPayload.username });
      if (user.role === "a") {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export { authUser, authAdmin };
