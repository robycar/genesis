import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonNotClickedGreen from "../../components/ButtonNotClickedGreen";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Fade, Paper, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BackupIcon from "@material-ui/icons/Backup";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import "../../styles/App.css";
import accessControl from "../../service/url.js";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const useStyles = styled((theme) => ({
    imgS: {
        flex: 1,
        width: 50,
        height: 100,
        resizeMode: 'contain'
    },
    loadTestC: {
        display: "flex",
        alignItems: "center",
        marginTop: "15px",
        marginBottom: "15px",
        padding: "10px",
        justifyContent: "center",
    },
    btnStart: {
        color: "red",
        backgroundColor: "red",
        width: "100px",
        padding: "10px",
        size: "lg",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paperModale: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: "3%",
        height: "fit-content",
        width: 500,
        position: "relative",
    },
    intestazione: {
        color: "#47B881",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        transform: "scale(1.8)",
        color: "#47B881",
    },
    info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "6%",
        justifyContent: "center",
    },
    bottone: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "6%",
        justifyContent: "center",
    },
}));

let bearer = `Bearer ${localStorage.getItem("token")}`;

export default function TestCaseCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [id, setId] = useState();
    const [idToRun, setIdToRun] = useState();
    const [dataLoad, setTestCaseLoad] = useState(null);
    const [dataRun, setIdTestCaseRun] = useState(null);
    const [openRun, setOpenRun] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const testCaseLoader = () => {
        loadTestCase(props.id);
    };

    const hadleLoadData = (rowDataaa) => {
        runCaseLoder(rowDataaa.id);
    };

    const runCaseLoder = () => {
        runTestCase(idToRun);
    }

    const handleCloseRun = () => {
        setOpenRun(false);
    };


    const handleOpen = () => {
        setOpenRun(true);
        setIdToRun(props.id);
    };

    const loadTestCase = (id) => {

        var urlLoad = `/api/testcase/load/${id}`;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearer);
        myHeaders.append("Access-Control-Allow-Origin", accessControl);
        myHeaders.append("Access-Control-Allow-Credentials", "true");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(urlLoad, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTestCaseLoad(result.list);
            })
            .catch((error) => console.log("error", error));

    };

    const runTestCase = (idRun) => {

        var urlLoad = `/api/testcase/runloaded/${idRun}`;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearer);
        myHeaders.append("Access-Control-Allow-Origin", accessControl);
        myHeaders.append("Access-Control-Allow-Credentials", "true");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(urlLoad, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIdTestCaseRun(result.list);
            })
            .catch((error) => console.log("error", error));

    };

    return (
        <Card sx={{ maxWidth: 600 }}>

            <CardActions disableSpacing>
                <div>
                    <p> Nome : <b> {props.nome} </b> </p>
                </div>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Test Case ID :</Typography>
                    <Typography paragraph>
                        <h2>{props.id}</h2>
                    </Typography>
                    <Typography paragraph>Descrizione :</Typography>
                    <Typography paragraph>
                        <h2>{props.desc}</h2>
                    </Typography>
                    <Typography paragraph>Creato da :</Typography>
                    <Typography paragraph>
                        <h2>{props.createdBy}</h2>
                    </Typography>
                    <Typography paragraph>Azioni :</Typography>
                    <Typography paragraph>
                        <div className={classes.loadTestC}>
                            <ButtonNotClickedGreen
                                size="small"
                                variant="contained"
                                color="primary"
                                nome="Carica Test"
                                id={props.id}
                                onClick={testCaseLoader}
                            />
                            <Button
                                className={classes.btnStart}
                                variant="contained"
                                onClick={handleOpen}
                            >
                                Start
                            </Button>
                        </div>

                    </Typography>
                    {/* ------------------ MODALE AVVIA TEST CASE --------------------- */}
                    <div>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openRun}
                            onClose={handleCloseRun}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openRun}>
                                <Paper className={classes.paperModale} elevation={1}>
                                    <div>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <BackupIcon className={classes.icon} />
                                            </ListItemIcon>
                                            <Typography className={classes.intestazione} variant="h4">
                                                Lancio Test Case
                                            </Typography>
                                        </ListItem>

                                        <Divider className={classes.divider} />
                                        <Typography className={classes.info}>
                                            <p>Vuoi lanciare il test case da te selezionato ?</p>
                                        </Typography>
                                        <Divider />

                                        <div className={classes.bottone}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={hadleLoadData}
                                            >
                                                Lancio
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleCloseRun}
                                            >
                                                Annulla
                                            </Button>
                                        </div>
                                    </div>
                                </Paper>
                            </Fade>
                        </Modal>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}
