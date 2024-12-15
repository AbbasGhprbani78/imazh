import { verifyAccessToken } from "@/utils/auth";
import connectToDB from "../../../../../configs/db";
import { cookies } from "next/headers";
import UserModel from "../../../../../models/User";

export async function GET(req) {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne(
        { username: tokenPayload.username },
        "-password -refreshToken -__v"
      );
    }
    return Response.json(user);
  } else {
    return Response.json(
      {
        data: null,
        message: "دسترسی مجاز نیست",
      },
      { status: 401 }
    );
  }
}
