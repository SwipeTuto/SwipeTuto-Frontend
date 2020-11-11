import React from "react";
import VerticalMenu from "../VerticalMenu/VerticalMenu";
import { ReactComponent as FacebookLogo } from "../../../assets/images/ellipsis-vertical.svg";

const ShareMenu = () => {
  return (
    <VerticalMenu type="share">
      <div>
        <FacebookLogo />
      </div>
    </VerticalMenu>
  );
};

export default ShareMenu;
