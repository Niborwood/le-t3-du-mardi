import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../assets/ClashDisplay-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const og = async function () {
  const fontData = await font;

  // Fetch current topic name
  const url = process.env.VERCEL_URL;
  const currentTopicName = await fetch(
    `${
      process.env.NODE_ENV === "production" && "https://"
    }${url}/api/current-topic`
  ).then((res) => res.json());

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
              <span tw="text-9xl mb-12">
                Top 3 {currentTopicName || "n'importe quoi"}.
              </span>
            </h2>
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
