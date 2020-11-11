import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { base } from "../../../services/configService";
import { createBrowserHistory } from "history";
import VerticalMenu from "../VerticalMenu/VerticalMenu";
import { ReactComponent as CopyLogo } from "../../../assets/images/copy.svg";
import "./ShareMenu.scss";
import { copyToClipboard } from "../../../helper";

const ShareMenu = ({ addclass, test }) => {
  var history = createBrowserHistory();

  useEffect(() => {
    console.log(addclass);
    console.log(test);
  }, [addclass, test]);

  const handleClipboardCopy = (text) => {
    copyToClipboard(text);
  };

  return (
    <VerticalMenu addclass={addclass} type="share">
      <FacebookShareButton url={base + history.location.pathname}>
        <FacebookIcon size={45} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={base + history.location.pathname}>
        <TwitterIcon size={45} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={base + history.location.pathname}>
        <WhatsappIcon size={45} round={true} />
      </WhatsappShareButton>
      <EmailShareButton body={base + history.location.pathname}>
        <EmailIcon size={45} round={true} />
      </EmailShareButton>
      <div
        className="ShareMenu__copy"
        onClick={() =>
          handleClipboardCopy(`${base}${history.location.pathname}`)
        }
      >
        {" "}
        <CopyLogo />
      </div>
    </VerticalMenu>
  );
};

export default withRouter(ShareMenu);
