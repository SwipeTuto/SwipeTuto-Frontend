import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { ReactComponent as SendLogo } from "../../../assets/images/send.svg";

import "./CommentsInput.scss";

const CommentsInput = ({
  className,
  newComment,
  handleInputValueChange,
  handleAddCommentClick,
  placeholderText,
}) => {
  return (
    <form className={className ? className : "CommentsInput"}>
      <textarea
        placeholder="Ajouter un commentaire..."
        className="CommentsInput__newComment--input"
        type="text"
        value={newComment}
        onChange={(e) => handleInputValueChange(e)}
      />
      <CustomButton
        color="dark"
        disabled={newComment === "" ? "disabled" : ""}
        onClick={(e) => handleAddCommentClick(e)}
        className="custom-button CommentsInput__newComment--sendPC"
      >
        Envoyer
      </CustomButton>
      <CustomButton
        color="dark"
        disabled={newComment === "" ? "disabled" : ""}
        onClick={(e) => handleAddCommentClick(e)}
        className="custom-button CommentsInput__newComment--sendMobile"
      >
        <SendLogo />
      </CustomButton>
    </form>
  );
};

export default CommentsInput;
