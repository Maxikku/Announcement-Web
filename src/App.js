import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import firebase from "firebase";
import Announ from "./components/Announ/Announ";

import './App.css';
import db from "./firebase";


function App() {

    const [announs, setAnnouns] = useState([]);
    const [inputTitle, setInputTitle] = useState('');
    const [inputDe, setInputDe] = useState('');
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        db.collection('announs').onSnapshot(snapshot => {
            setAnnouns(snapshot.docs.map(doc => ({id: doc.id, announ: doc.data()})))
        })
    }, [inputTitle]);

    // const search = (event) => {
    //     event.preventDefault();
    //    const result = db.collection('announs').filters
    // }

    const addAnnoun = (event) => {
        event.preventDefault();
        db.collection('announs').add({
            title: inputTitle,
            description: inputDe,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        // setAnnouns([...announs, inputTitle]);
        setInputTitle('');
        setInputDe('')
    };

    return (
    <div className="App">
            <h1>Announcements</h1>
            <form>
                <FormControl>
                    <InputLabel>Write a title</InputLabel>
                    <Input value={inputTitle} type="text"
                           onChange={event => setInputTitle(event.target.value)}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Write a description</InputLabel>
                    <Input value={inputDe} type="text"
                           onChange={event => setInputDe(event.target.value)}/>
                </FormControl>

                <Button disabled={!inputTitle} type="submit" onClick={addAnnoun} variant="contained" color="secondary">Add
                    Announ</Button>
            </form>
            <div className='seacrhForm'>
                    <Input placeholder='Search...' onChange={e => {setSearchTerm(e.target.value)}} value={searchTerm} />
                {announs.filter((val) => {
                    if (searchTerm == '') {
                        return val
                    } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return
                    }
                }).map((val, key) => {
                    return <div key={key}> {val.title} </div>
                })}
                <ul>
                    {announs.map(announ => (
                        <Announ announ={announ}/>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
