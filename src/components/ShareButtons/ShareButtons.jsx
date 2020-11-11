import React, { useEffect, } from "react";
import { withRouter } from "react-router-dom";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import { FacebookIcon, EmailIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { base } from "../../services/configService"
import { createBrowserHistory } from 'history'
const ShareButtons = () => {
 
  var history = createBrowserHistory()

 
  return (
    <div>
            <FacebookShareButton url={base+history.location.pathname}>
              <FacebookIcon size={32} round={true} /> 
            </FacebookShareButton>
            <EmailShareButton body={base+history.location.pathname}>
              <EmailIcon size={32} round={true} /> 
            </EmailShareButton>
            <TwitterShareButton>
              <TwitterIcon size={32} round={true} /> 
            </TwitterShareButton>
            <WhatsappShareButton>
              <WhatsappIcon size={32} round={true} /> 
            </WhatsappShareButton>
      
    </div>
  )
}


export default withRouter(ShareButtons);