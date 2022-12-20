import React from "react";
import { weekday } from "../../utils";

export const FullscreenLoader = () => {
  return (
    <div className="grid h-screen w-screen place-items-center bg-emerald-600 p-4 font-clash text-6xl font-bold text-zinc-50 lg:text-8xl 2xl:text-9xl">
      <h2 className="animate-fade-in">Le top 3 du {weekday}.</h2>
    </div>
  );
};
