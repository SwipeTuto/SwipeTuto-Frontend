import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextInput = () => {
  const [contentState, setContentState] = useState();

  useEffect(() => {
    console.log(contentState);
  }, [contentState]);

  const onContentStateChange = (contentState) => {
    setContentState(contentState);
  };

  return (
    <Editor
      initialContentState={contentState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onContentStateChange={onContentStateChange}
    />
  );
};

export default RichTextInput;
