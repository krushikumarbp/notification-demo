import React, { useState } from "react";
import Select from "react-select";
import { EditorState, Modifier } from "draft-js";
import {
  DynamicFieldOptionTypes,
  DynamicFieldsDropdownProps,
} from "../../common/contentEditorTypes";

import { _getDynamicFieldOptions } from "../../common/utils";

const DynamicFieldsDropdown: React.FC<DynamicFieldsDropdownProps> = ({
  editorState,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<DynamicFieldOptionTypes | null>(null);

  const _handleDropdownChange = (option: DynamicFieldOptionTypes | null) => {
    setSelectedOption(option);
    if (option && editorState && onChange) {
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        option.renderText,
        editorState.getCurrentInlineStyle()
      );
      onChange(
        EditorState.push(editorState, contentState, "insert-characters")
      );
    }
  };

  const options = _getDynamicFieldOptions();

  return (
    <div className="ce-toolbar--dynamic-field">
      <Select
        value={selectedOption}
        options={options}
        onChange={_handleDropdownChange}
        menuPortalTarget={document.body}
      />
    </div>
  );
};
export default DynamicFieldsDropdown;
