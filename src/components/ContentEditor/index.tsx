import React, { FormEvent, useState } from "react";
import Draft, { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { toolbarOptions } from "./Toolbar/toolbarOptions";
import DynamicFieldsDropdown from "./Toolbar/DynamicFieldsDropdown";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./contentEditor.css";
import HTMLSource from "./Toolbar/HtmlSource";

const ContentEditor: React.FC = () => {
  const [isSourceVisible, setIsSourceVisible] = useState<boolean>(false);
  const [htmlSource, setHtmlSource] = useState<string>("");

  const [editorState, setEditorState] = useState<Draft.EditorState>(
    EditorState.createEmpty()
  );

  const _setHtmlSource = (value: string) => {
    setHtmlSource(value);
  };

  const _handleSourceChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    _setHtmlSource(value);
  };

  const _onEditorStateChange = (es: Draft.EditorState) => {
    setEditorState(es);
  };

  const _setIsSourceVisible = () => {
    console.log("hello");
    if (isSourceVisible) {
      const contentBlock = htmlToDraft(htmlSource);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    } else {
      const sourceValue = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      setHtmlSource(sourceValue);
    }
    setIsSourceVisible(!isSourceVisible);
  };

  return (
    <div className="cs-editor-wrapper">
      <Editor
        editorState={editorState}
        wrapperClassName="ce-wrapper"
        editorClassName={isSourceVisible ? "ce-editor hide" : "ce-editor"}
        onEditorStateChange={_onEditorStateChange}
        toolbarClassName={
          isSourceVisible ? "cs-toolbar disabled" : "cs-toolbar"
        }
        toolbar={toolbarOptions}
        toolbarCustomButtons={[
          <DynamicFieldsDropdown />,
          <HTMLSource toggleSource={_setIsSourceVisible} />,
        ]}
      />
      {isSourceVisible && (
        <div className="cw-source">
          <textarea
            onChange={_handleSourceChange}
            value={htmlSource}
            className="cw-source--textarea"
          />
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
