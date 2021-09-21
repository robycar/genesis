/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SelectAutocompleteTestSuite(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={(a,i) => {
      props.onChange(i?.id)}}
      options={props.items??[]}
      getOptionLabel={(option) => option?.nome}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selezione Test Suite"
          variant="outlined"
        />
      )}
    />
  );
}

