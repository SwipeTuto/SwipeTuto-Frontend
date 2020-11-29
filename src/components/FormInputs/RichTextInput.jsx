import React, { useEffect, useRef, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichTextInput.scss";

const RichTextInput = ({ label, getDescriptionValue, firstValue }) => {
  const editorState = EditorState.createEmpty();
  const [content, setContent] = useState(editorState);
  const [contentInHTML, setContentInHTML] = useState();
  const editor = useRef(null);

  useEffect(() => {
    if (firstValue) {
      setContent(firstValue);
      const contentBlock = htmlToDraft(firstValue);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setContent(editorState);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setContentInHTML(draftToHtml(convertToRaw(content.getCurrentContent())));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    getDescriptionValue(contentInHTML);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentInHTML]);

  const onEditorStateChange = (editorState) => {
    setContent(editorState);
  };

  return (
    <>
      <label className="FormInput__label">{label && label}</label>
      <Editor
        // blockRendererFn={myBlockRenderer}
        ref={editor}
        editorState={content}
        wrapperClassName="demo-editor"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
        }}
      />
    </>
  );
};

export default RichTextInput;