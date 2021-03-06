import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/layout/layout-selectors";

import "./FeedbackBetaPage.scss";

const FeedbackBetaPage = () => {
  const currentTheme = useSelector(selectTheme);

  return (
    <div className={`FeedbackBetaPage ${currentTheme}-theme-d`}>
      <div className={`FeedbackBetaPage__quiz ${currentTheme}-theme-m`}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSecvAXMIQLLneP_4JZhGcZX0vqfiEr9hOBKpnCVE98ORoq6bw/viewform?embedded=true"
          width="640"
          height="3033"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="feedback_beta_version"
        >
          Chargement…
        </iframe>
      </div>
    </div>
  );
};

export default FeedbackBetaPage;
