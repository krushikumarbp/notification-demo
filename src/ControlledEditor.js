import { ContentState, convertToRaw, EditorState, Modifier } from "draft-js";
import { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import htmlToDraft from "html-to-draftjs";
import IconSource from "./IconSource";

const dropdownOptions = [
  {
    label: "Slect Dropdown",
    value: ""
  },
  {
    label: "Select Option 1",
    value: "optionOne"
  },
  {
    label: "Select Option 2",
    value: "optionTwo"
  }
];

class RenderCustomDropdown extends Component {
  state = {
    value: dropdownOptions[0]
  };
  handleDropdownChange = (option) => {
    this.setState({ value: option }, () => {
      const { editorState, onChange } = this.props;
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        option.value,
        editorState.getCurrentInlineStyle()
      );
      onChange(
        EditorState.push(editorState, contentState, "insert-characters")
      );
    });
  };

  render() {
    return (
      <div className="editor-select">
        <Select
          value={this.state.value}
          options={dropdownOptions}
          onChange={this.handleDropdownChange}
          menuPortalTarget={document.body}
        />
      </div>
    );
  }
}

const RenderSourceButton = ({ toggleSource }) => {
  return (
    <div>
      <button className="toolbar-source-btn" onClick={toggleSource}>
        <IconSource size={22} />
      </button>
    </div>
  );
};

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      contentState: null,
      toggleSource: false,
      sourceValue: ""
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
          editorState: editorState
        });
      }
    } else {
      this.setState({
        toggleSource: true,
        sourceValue: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      });
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };
  updateContentState = (contentState) => {
    this.setState({
      contentState
    });
  };

  handleOnSourceChange = (e) => {
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
    const toolbarOptions = {
      options: [
        "inline",
        "blockType",
        "fontSize",
        "fontFamily",
        "list",
        "textAlign",
        "link",
        "remove",
        "history"
      ],
      className: "editor-toolbar-class",
      inline: {
        className: "editor-toolbar-class",
        options: ["bold", "italic", "underline", "strikethrough"]
      },
      blockType: {
        className: "editor-toolbar-class"
      },
      fontSize: {
        className: "editor-toolbar-class"
      },
      fontFamily: {
        className: "editor-toolbar-class"
      },
      list: {
        className: "editor-toolbar-class"
      },
      textAlign: {
        className: "editor-toolbar-class"
      },
      link: {
        className: "editor-toolbar-class"
      },
      remove: {
        className: "editor-toolbar-class"
      },
      history: {
        className: "editor-toolbar-class"
      }
    };
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
            <RenderCustomDropdown />,
            <RenderSourceButton toggleSource={this._toggleSource} />
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

export default ControlledEditor;
