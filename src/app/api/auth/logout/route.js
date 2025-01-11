import { cookies } from "next/headers";
import { middleware } from "../../middleware";
export async function POST(req) {
  const logResponse = await middleware(req);
  const cookieStore = cookies();

  cookieStore.delete("token");
  cookieStore.delete("refresh-token");

  const response = new Response(
    JSON.stringify({ message: "با موفقیت از حساب خارج شدید" }),
    {
      status: 200,
    }
  );

  if (logResponse) await logResponse(response);
  return response;
}
