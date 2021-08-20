import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(216, 216, 216, 0.1)",
    padding: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bullet: {
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    fontFamily: "Segoe UI Symbol",
  },
  pos: {
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#47B881",
    // color: "#FFFFFF",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <CardActions>
          <Button
            className={classes.button}
            size="large"
            startIcon={props.startIcon}
          >
            {props.titolo}
          </Button>
        </CardActions>

        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography className={classes.pos} variant="body2" component="p">
          Section overview goes here. CoderDocs is a free documentation template
          built on the popular Bootstrap framework. The design is super modern
          and clean and it’s made specifically for software developers. <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
