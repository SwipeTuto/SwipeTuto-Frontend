import React, { useEffect, useState } from "react";
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichTextInput.scss";
import { checkRegexInput, errorMessageToDisplay } from "../../helper";

const RichTextInput = ({ label, getDescriptionValue, firstValue }) => {
  // console.log(firstValue);
  const editorState = EditorState.createEmpty();
  const [content, setContent] = useState(editorState);
  const [contentInHTML, setContentInHTML] = useState();

  useEffect(() => {
    if (firstValue) {
      // console.log("enter");
      setContent(firstValue);
      const contentBlock = htmlToDraft(firstValue);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setContent(editorState);
      }
    }
    // if (firstValue === "") setContent("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setContentInHTML(draftToHtml(convertToRaw(content.getCurrentContent())));
    // console.log(contentInHTML);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    getDescriptionValue(contentInHTML);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentInHTML]);

  const onEditorStateChange = (editorState) => {
    // console.log(editorState);
    setContent(editorState);
  };

  return (
    <>
      <label className="FormInput__label">{label && label}</label>
      <Editor
        editorState={content}
        wrapperClassName="demo-editor"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        // onFocus={() => onEditorStateChange(onEditorStateChange)}
        // onChange={() => onEditorStateChange(onEditorStateChange)}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </>
  );
};

export default RichTextInput;
