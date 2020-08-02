import React from "react";
import CustomButton from "../CustomButton/CustomButton";

import "./CommentsInput.scss";

const CommentsInput = ({
  newComment,
  handleInputValueChange,
  handleAddCommentClick,
}) => {
  return (
    <form className="CommentsInput">
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
      >
        Envoyer
      </CustomButton>
    </form>
  );
};

export default CommentsInput;
