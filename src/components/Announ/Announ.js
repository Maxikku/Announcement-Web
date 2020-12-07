import React, {useState} from "react";
import db from "../../firebase";
import firebase from "firebase";

import { makeStyles } from "@material-ui/core";
import {List, ListItem, Button, Modal, Input} from "@material-ui/core";
import "./Announ.css";

const useStyles = makeStyles((theme) => ({
    paper:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}))

function Announ(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inputTitle, setInputTitle] = useState('');
    const [inputDesc, setInputDesc] = useState('');


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateAnn = () => {
        db.collection('announs').doc(props.announ.id).set({
            title: inputTitle,
            description: inputDesc,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
        setOpen(false);
    };

    return (
        <>
        <Modal open={open}
               onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>Edit</h1>
                <Input type="text" value={inputTitle} placeholder={props.announ.announ.title}
                       onChange={event => setInputTitle(event.target.value)} />
                <Input type="text" value={inputDesc} placeholder={props.announ.announ.description}
                       onChange={event => setInputDesc(event.target.value)} />
                <Button variant="contained" color="secondary" onClick={updateAnn}>Update Announscement</Button>
            </div>
        </Modal>
        <List>
            <li>
                <div>
                    <h2>{props.announ.announ.title}</h2>
                    <p>{props.announ.announ.description}</p>
                    <span>{
                        new Date(props.announ.announ.timestamp?.toDate()).toLocaleString()
                    }</span>
                </div>
            </li>
            <div className='btns'></div>
                <Button variant="contained" color="secondary" onClick={event =>
                    db.collection('announs')
                        .doc(props.announ.id)
                        .delete()}>Remove</Button>

                    <Button  variant="contained" color="secondary" onClick={e => setOpen(true)}>Edit</Button>
        </List>
            </>
    )
}

export default Announ
