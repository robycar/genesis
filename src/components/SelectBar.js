import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "../styles/App.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    // width: "20vw",
    width: "380px",
  },
  select: {
    widht: "380x",
    height: "40px",
    padding: "2%",
    alignItems: "center",
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  inputLabel: {
    fontSize: "2vh",
    alignSelf: "center",
  },
}));

function SelectBar(props) {
  const classes = useStyles();
  const [test, setTest] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = (event) => {
    setTest(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel
        className={classes.inputLabel}
        ref={inputLabel}
        id="demo-simple-select-outlined-label"
      >
        {props.nome}
      </InputLabel>
      <Select
        className={classes.select}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={test}
        onChange={handleChange}
        labelWidth={labelWidth}
        // label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ciao</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectBar;
