import React, {useSelector} from "react";
import { withRouter } from "react-router-dom";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, EmailIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { base } from "../../../services/configService";
import { createBrowserHistory } from "history";
import VerticalMenu from "../VerticalMenu/VerticalMenu";
import { ReactComponent as CopyLogo } from "../../../assets/images/copy.svg";
import "./ShareMenu.scss";
import { copyToClipboard } from "../../../helper";
import { useDispatch } from "react-redux";
import { openNotificationPopup } from "../../../redux/layout/layout-actions";
import { selectClickedCard } from "../../../redux/filter/filter-selectors"

const ShareMenu = ({ addclass, test }) => {


  var history = createBrowserHistory();
  const dispatch = useDispatch();

  const handleClipboardCopy = async (text) => {
    const isCopied = await copyToClipboard(text);
    if (isCopied) {
      dispatch(openNotificationPopup("URL Copié dans le presse-papier !"));
    } else {
      dispatch(openNotificationPopup("La copie automatique à échouée ..."));
    }
  };
  const emailBody = `
   vous partage une carte
  `
  return (
    <VerticalMenu addclass={addclass} type="share">
      <FacebookShareButton 
        url={base + history.location.pathname}
        quote={"SwipeTuto - Swap end learn"}
        hashtag={`#${clickedCard.categorie[0].name}`}
      >
        <FacebookIcon size={45} round={true} />
      </FacebookShareButton>

      <TwitterShareButton 
        url={base + history.location.pathname}
        title={clickedCard.name}
        hashtag={`#${clickedCard.categorie[0].name}`}
      >
        <TwitterIcon size={45} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton 
        url={base + history.location.pathname}
        title={clickedCard.name}
        separator=":: "
      >
        <WhatsappIcon size={45} round={true} />
      </WhatsappShareButton>

      <EmailShareButton 
        url={base + history.location.pathname}
        subject={clickedCard.name}  
        body={emailBody}
        openShareDialogOnClick={false}
      >
        <EmailIcon size={45} round={true} />
      </EmailShareButton>
      <div className="ShareMenu__copy" onClick={() => handleClipboardCopy(`${base}${history.location.pathname}`)}>
        {" "}
        <CopyLogo />
      </div>
    </VerticalMenu>
  );
};

export default withRouter(ShareMenu);
