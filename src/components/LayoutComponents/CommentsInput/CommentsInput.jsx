import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
// import { ReactComponent as SendLogo } from "../../../assets/images/send.svg";

import "./CommentsInput.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { openConnexionPopup } from "../../../redux/layout/layout-actions";
import FormTextarea from "../../FormInputs/FormTextarea";

const CommentsInput = ({ handleAddCommentClick, id, firstValue }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const checkIfUser = () => {
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      return;
    }
  };

  const getValue = (name, value) => {
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      dispatch(openConnexionPopup());
    } else {
      handleAddCommentClick(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (firstValue) {
      setInputValue(firstValue);
    }
  }, [firstValue]);

  return (
    <form className="CommentsInput" onSubmit={(e) => handleSubmit(e)}>
      <FormTextarea
        idFor={id}
        name="comment"
        placeholder="Ajouter un commentaire..."
        type="text"
        getValue={getValue}
        onFocus={() => checkIfUser()}
        required={true}
        value={inputValue}
        firstValue={inputValue}
      />
      <CustomButton color="dark">Envoyer</CustomButton>
    </form>
  );
};

export default CommentsInput;
