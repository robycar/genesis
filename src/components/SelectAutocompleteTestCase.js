/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SelectAutocompleteTestCase(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={(a, i) => {
        props.onChange(i?.id);
      }}
      options={props.items ?? []}
      getOptionLabel={(option) => option.nome}
      style={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} label="Selezione Test Case" variant="outlined" />
      )}
    />
  );
}
