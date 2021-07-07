import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

function MinHeightTextarea(props) {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      rowsMin={props.rowsMin}
      placeholder={props.placeholder}
    />
  );
}
export default MinHeightTextarea;
