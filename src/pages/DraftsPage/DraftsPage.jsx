import React from "react";
import { useSelector } from "react-redux";
import DraftPreview from "../../components/CardsComponents/DraftPreview/DraftPreview";
import { selectTheme } from "../../redux/layout/layout-selectors";
import "./DrafstPage.scss";

const DraftsPage = () => {
  const currentTheme = useSelector(selectTheme);
  return (
    <div className={`DraftsPage ${currentTheme}-theme-d`}>
      <h2 className="title title-2">Vos brouillons</h2>
      <div className="DraftsPage__drafts">
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
        <DraftPreview />
      </div>
    </div>
  );
};

export default DraftsPage;
