import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "300px",
  },
}));

function SelectBar(props) {
  const classes = useStyles();
  const [test, setTest] = React.useState("");
  const handleChange = (event) => {
    setTest(event.target.value);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">
        {" "}
        {props.nome}{" "}
      </InputLabel>
      <Select
        className={classes.select}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={test}
        onChange={handleChange}
        label="Test"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectBar;
