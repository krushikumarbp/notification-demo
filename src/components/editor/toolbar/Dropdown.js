import { EditorState, Modifier } from "draft-js";
import React, { Component } from "react";
import Select from "react-select";
import { dropdownOptions } from "../../../utils/ToobarOptions";

class Dropdown extends Component {
  state = {
    value: dropdownOptions[0],
  };
  handleDropdownChange = (option) => {
    this.setState({ value: option }, () => {
      const { editorState = EditorState.createEmpty(), onChange = () => {} } =
        this.props;
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        option.dispvalue,
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

export default Dropdown;
