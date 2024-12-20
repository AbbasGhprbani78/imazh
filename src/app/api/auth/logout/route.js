import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  cookieStore.delete("token");
  cookieStore.delete("refresh-token");

  return new Response(JSON.stringify({ message: "با موفقیت از حساب خارج شدید" }), {
    status: 200,
  });
}
