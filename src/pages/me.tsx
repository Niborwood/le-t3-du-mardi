import type { NextPage } from "next";
import {
  LayoutAbout,
  LayoutCTA,
  LayoutMenu,
  LayoutPrev,
  LayoutTitle,
} from "../components/layout";

const Me: NextPage = () => {
  return (
    <>
      <LayoutTitle empty />
      <LayoutMenu />

      <LayoutPrev />
      <LayoutAbout />

      <LayoutCTA>
        <div>Me</div>
      </LayoutCTA>
    </>
  );
};

export default Me;
