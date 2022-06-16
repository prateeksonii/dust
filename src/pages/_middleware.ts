import { nanoid } from "nanoid";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const response = NextResponse.next();

  console.log(req.cookies["poll-token"]);

  if (req.cookies["poll-token"]) return;

  response.cookie("poll-token", nanoid(), {
    sameSite: "strict",
  });

  return response;
}
