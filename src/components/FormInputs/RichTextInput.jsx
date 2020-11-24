import React, { useEffect, useState } from "react";
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextInput = () => {
  const editorState = EditorState.createEmpty();
  // const [content, setContent] = useState(editorState);
  const [content, setContent] = useState(editorState);
  const [contentInHTML, setContentInHTML] = useState();
  // const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
  const html = "<p></p>";

  const onEditorStateChange = (editorState) => {
    setContent(editorState);
  };

  useEffect(() => {
    setContentInHTML(draftToHtml(convertToRaw(content.getCurrentContent())));
    console.log(contentInHTML);
  }, [content, contentInHTML]);

  // return <Editor editorState={editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" onEditorStateChange={onEditorStateChange} />;

  useEffect(() => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setContent(editorState);
    }
  }, []);

  // const contentBlock = htmlToDraft(html);
  // if (contentBlock) {
  //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //   const editorState = EditorState.createWithContent(contentState);
  //   setContent(editorState);
  // }

  return (
    <div>
      <Editor editorState={content} wrapperClassName="demo-wrapper" editorClassName="demo-editor" onEditorStateChange={onEditorStateChange} />
    </div>
  );
};

export default RichTextInput;
