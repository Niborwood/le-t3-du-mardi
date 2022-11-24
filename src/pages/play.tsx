// COMPONENTS
import type { NextPage } from "next";
import {
  LayoutMenu,
  LayoutTitle,
  LayoutPrev,
  LayoutAbout,
  LayoutCTA,
} from "../components/layout";

const Play: NextPage = () => {
  return (
    <>
      <LayoutTitle>
        <div>Play</div>
      </LayoutTitle>
      <LayoutMenu />
      <LayoutPrev>
        <div>Play</div>
      </LayoutPrev>
      <LayoutAbout>
        <div>Play</div>
      </LayoutAbout>
      <LayoutCTA>
        <div>Play</div>
      </LayoutCTA>
    </>
  );
};

export default Play;
