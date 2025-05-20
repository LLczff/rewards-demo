import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { User } from "./types";
import { getData } from "./app/actions";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const response = NextResponse.next();

  if (!request.cookies.has("user")) {
    const user: User = await getData("/user/random");
    response.cookies.set("user", user._id);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon\\.ico|$).*)",
};
