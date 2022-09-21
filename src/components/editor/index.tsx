import { ContentState, convertToRaw, EditorState } from "draft-js";
import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { toolbarOptions } from "../../utils/ToobarOptions";
import "../../styles/Editor.css";
import Dropdown from "./toolbar/Dropdown";
import SourceButton from "./toolbar/SourceButton";

class NotificationEditor extends Component {
  [x: string]: any;
  state: {
    editorState: EditorState;
    contentState: null;
    toggleSource: boolean;
    sourceValue: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      contentState: null,
      toggleSource: false,
      sourceValue: "",
    };
  }

  _toggleSource = () => {
    const { editorState } = this.state;
    if (this.state.toggleSource) {
      const contentBlock = htmlToDraft(this.state.sourceValue);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          toggleSource: false,
          editorState: editorState,
        });
      }
    } else {
      this.setState({
        toggleSource: true,
        sourceValue: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      });
    }
  };

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };
  updateContentState = (contentState: any) => {
    this.setState({
      contentState,
    });
  };

  handleOnSourceChange = (e: any) => {
    this.setState({ sourceValue: e.target.value });
  };

  getCurrentState = () => {
    const { editorState } = this.state;
    const editorCurrentState = editorState.getCurrentContent();
    const row = draftToHtml(convertToRaw(editorCurrentState));
    console.log(JSON.stringify(this.state.contentState));
    console.log(row);
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="editor-container">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName={
            this.state.toggleSource ? "demo-editor hide" : "demo-editor"
          }
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.updateContentState}
          toolbarClassName={
            this.state.toggleSource ? "my-toolbar disabled" : "my-toolbar"
          }
          toolbarCustomButtons={[
            <Dropdown />,
            <SourceButton toggleSource={this._toggleSource} />,
          ]}
          toolbar={toolbarOptions}
        />
        {this.state.toggleSource && (
          <div className="source">
            <textarea
              onChange={this.handleOnSourceChange}
              value={this.state.sourceValue}
            />
          </div>
        )}
        <button onClick={this.getCurrentState}>Submit</button>
      </div>
    );
  }
}

export default NotificationEditor;
