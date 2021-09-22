import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { apiendpoint } from './Admin';
import { Admin } from './Admin';
import { CustomizedSnackbars } from './Snackbar';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


export function MentorComp() {
    const [mentors, setmentors] = useState([]);
    const [addmentorflag, setaddmentorflag] = useState(true);
    const [id, setid] = useState(null)
    const [username, setusername] = useState("");
    const [userpic, setuserpic] = useState("");
    const [usertitle, setusertitle] = useState("");
    const [useremail, setuseremail] = useState("");

    function getUsers() {
        fetch(apiendpoint + "/mentors", {
            method: "GET",
            headers: { 'Access-Control-Allow-Origin': "*" }
        })
            .then((data) => data.json())
            .then((ment) => setmentors(ment));

    }
    useEffect(() => {
        getUsers();
    }, []);

    function addUser() {


        fetch(apiendpoint + "/mentors",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    name: username,
                    avatar: userpic,
                    feild: usertitle,
                    email: useremail
                }),
            })
            .then((data) => data.json())
            .then(() => (
                getUsers(),
                removeContent(),
                handleClick()
            )
            );
    }

    function deletUser(id) {
        fetch(apiendpoint + "/mentors/" + id,
            { method: "DELETE" }
        )
            .then(() => console.log("DELTED"))
            .then(() => getUsers())
    }

    function editUser(id, name, url, job, contact) {
        setaddmentorflag(!addmentorflag)
        setid(id)
        addmentorflag ? setusername(name) : setusername("")
        addmentorflag ? setuserpic(url) : setuserpic("")
        addmentorflag ? setusertitle(job) : setusertitle("")
        addmentorflag ? setuseremail(contact) : setuseremail("")

    }

    function updateUser() {
        fetch(apiendpoint + "/mentors/" + id,
            {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(
                    {
                        name: username,
                        url: userpic,
                        feild: usertitle,
                        email: useremail
                    }),
            })
            .then((data) => data.json())
            .then(() => (getUsers(),
                removeContent(),
                handleClick()
                ));

    }

    function removeContent() {
        setusername("");
        setuserpic("");
        setuseremail("");
        setusertitle("");
    }



    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {marginTop: theme.spacing(2),},},}));
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <div>
            <div className="form">
                <div className="subform">
                    <TextField
                        value={username} id="filled-basic" label="Name" variant="filled"
                        onChange={(event) => setusername(event.target.value)} />
                    <TextField
                        value={userpic} id="filled-basic" label="Profile url" variant="filled"
                        onChange={(event) => setuserpic(event.target.value)} />
                    <TextField
                        value={usertitle} id="filled-basic" label="Feild" variant="filled"
                        onChange={(event) => setusertitle(event.target.value)} />
                </div>

                <div className="subform">

                    <TextField
                        value={useremail} id="filled-basic" label="Email" variant="filled"
                        onChange={(event) => setuseremail(event.target.value)} />
                </div>
                <Button variant="primary"
                    onClick={() => addmentorflag ? addUser() : updateUser()}
                >
                    {addmentorflag ? "Add Mentor" : "Update Mentor"}
                </Button>
            </div>


            <div className="cardbox">
                {mentors.map((user) => <User id={user._id} name={user.name} url={user.avatar} job={user.feild} contact={user.email} deletUser={deletUser} editUser={editUser} />)}
            </div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Action Successfull
                </Alert>
            </Snackbar>
        </div>
    );
}

function User({ id, name, url, job, contact, deletUser, editUser }) {
    const history = useHistory();

    return (

        <Card
            onClick={() => history.push("/mentors/" + id)}
            id="user_card" className="user_card"
        >
            <img className="profilepic" src={url}></img>

            <div>
                <h1>{name}</h1>
                <h5 id="ijob">Profile : {job}</h5>
                <h5 id="iemail">email : {contact}</h5>
            </div>


            <div className="list_option">
                <Fab
                    onClick={() => editUser(id, name, url, job, contact)}
                    color="secondary" aria-label="edit">
                    <EditIcon />
                </Fab>
                <IconButton aria-label="delete"
                    onClick={() => deletUser(id)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>

        </Card>

    );

}
