import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/layout/layout-selectors";
import FormSelect from "../../FormInputs/FormSelect";
import FormTextarea from "../../FormInputs/FormTextarea";
import CustomButton from "../CustomButton/CustomButton";
import { ReactComponent as CloseLogo } from "../../../assets/images/close.svg";

import "./SignalPopup.scss";
import { closeSignalPopup } from "../../../redux/layout/layout-actions";
import { selectSignalInfos } from "../../../redux/layout/layout-selectors";
import { signalContent } from "../../../services/userService";

const SignalPopup = ({ card_id, user_id, comment_id }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const signalInfos = useSelector(selectSignalInfos);
  const [signal, setSignal] = useState({
    reason: "indésirable",
    description: "",
    id_card: signalInfos && signalInfos.id_card,
    id_user: signalInfos && signalInfos.id_user,
    id_comment: signalInfos && signalInfos.id_comment,
  });

  const getValue = (name, value) => {
    let signalCopy = signal;
    signalCopy = { ...signalCopy, [name]: value };
    setSignal(signalCopy);
  };

  const handleClose = () => {
    dispatch(closeSignalPopup());
  };

  const handleSubmit = () => {
    signalContent(signal);
    dispatch(closeSignalPopup());
  };

  return (
    <div
      className="SignalPopup"
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
    >
      <div className={`SignalPopup__wrapper ${currentTheme}-theme`}>
        <CloseLogo
          className="SignalPopup__close"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        />
        <h2 className="title title-2">Signalement</h2>
        <form
          onSubmit={() => handleSubmit()}
          onClick={(e) => e.stopPropagation()}
        >
          <FormSelect
            idFor="reason"
            label="Vous souhaitez émettre un signalement pour cause de :"
            name="reason"
            getValue={getValue}
          >
            <option value="indésirable">Contenu indésirable</option>
            <option value="nudité">Nudité</option>
            <option value="violence">Violence</option>
            <option value="harcelement">Harcèlement</option>
            <option value="interdit">Contenu interdit</option>
            <option value="haine">Discours haineux</option>
            <option value="url">Page introuvable</option>
            <option value="autre">Autre (préciser)</option>
          </FormSelect>
          <FormTextarea
            idFor="description"
            label="Expliquer pourquoi vous signalez ce contenu :"
            type="text"
            name="description"
            getValue={getValue}
            required={true}
          />

          <CustomButton color="dark">Envoyer</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default SignalPopup;
