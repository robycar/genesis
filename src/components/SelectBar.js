import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "../styles/App.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // width: "20vw",
    width: "340px",
    display: "flex",
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
    flexDirection: "column",
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
        value={test}
        onChange={handleChange}
        labelWidth={labelWidth}
        // label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Prova1</MenuItem>
        <MenuItem value={20}>Prova2</MenuItem>
        <MenuItem value={30}>Prova3</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectBar;
