import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

function MinHeightTextarea() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      rowsMin={3}
      placeholder="Minimum 3 rows"
    />
  );
}
export default MinHeightTextarea;
