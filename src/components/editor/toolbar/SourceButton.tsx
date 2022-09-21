import React from "react";
import IconSource from "../../../svg/IconSource";
import { SourceButtonProps } from '../../../types/PropTypes'

const SourceButton = ({ toggleSource }: SourceButtonProps) => {
  return (
    <div>
      <button className="toolbar-source-btn" onClick={toggleSource}>
        <IconSource size={22} />
      </button>
    </div>
  );
};
export default SourceButton;
