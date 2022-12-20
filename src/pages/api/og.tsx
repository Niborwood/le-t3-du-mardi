import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import { prisma } from "../../server/db/client";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../assets/ClashDisplay-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const og = async function (req: NextRequest) {
  const fontData = await font;
  const { searchParams } = req.nextUrl;
  const top = searchParams.get("top");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#059669",
        }}
      >
        <div tw="bg-emerald-600 flex w-full h-full items-center justify-center">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between">
            <h2 tw="flex flex-col text-3xl sm:text-4xl tracking-tight text-zinc-50 text-left">
              <span tw="mb-4">Aujourd&apos;hui, c&apos;est top 3.</span>
              <span tw="text-9xl mb-12">Top 3 {top}.</span>
            </h2>
            {/* <div tw="rounded-lg border border-4 p-4 border-zinc-50 flex text-3xl uppercase items-center">
              <span tw="mr-8 text-zinc-50">Voter</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="transparent"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div> */}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Clash",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
};

export default og;
