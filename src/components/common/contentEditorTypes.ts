import Draft from "draft-js";
export interface DynamicFieldOptionTypes {
  value: string;
  renderText: string;
  label: string;
}

export interface DynamicFieldsDropdownProps {
  editorState?: Draft.EditorState;
  onChange?: (state: Draft.EditorState) => void;
}

export interface HTMLSourceProps extends DynamicFieldsDropdownProps {
  toggleSource: () => void; 
}
