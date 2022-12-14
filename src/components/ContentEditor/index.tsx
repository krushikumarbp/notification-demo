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
import DocumentDownload from "./Toolbar/DocumentDownload";

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

  const _setExportToWord = () => {
    _exportToWord(`word-content-${new Date().toJSON().slice(0, 10)}`);
  };

  const _exportToWord = (filename: string = ""): void => {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html =
      preHtml +
      draftToHtml(convertToRaw(editorState.getCurrentContent())) +
      postHtml;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + ".doc" : "document.doc";

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    const nav = window.navigator as any;

    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
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
          <DocumentDownload exportToWord={_setExportToWord} />,
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
