import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Card from '@material-ui/core/Card';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { apiendpoint } from './Admin';
import Form from 'react-bootstrap/Form'
import { SystemUpdateAltRounded } from '@material-ui/icons';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



import { makeStyles, withStyles } from '@material-ui/core/styles';



export function StudentComp() {
    const [students, setstudents] = useState([]);
    const [addstudentflag, setaddstudentflag] = useState(true);
    const [stueditflag, setstueditflag] = useState(false)

    const [mentorlist, setmentorlist] = useState([])

    const unassigned = "unassigned"

    const [username, setusername] = useState("");
    const [userpic, setuserpic] = useState("");
    const [usertitle, setusertitle] = useState("");
    const [userphonenumber, setuserphonenumber] = useState("")
    const [useremail, setuseremail] = useState("")
    const [usermentor, setusermentor] = useState("")

    const [blank, setblank] = useState("")

    const [id, setid] = useState(null)

    function getUsers() {
        fetch(apiendpoint + "/students", {
            method: "GET",
            headers: { 'Access-Control-Allow-Origin': "*" }
        })
            .then((data) => data.json())
            .then((stud) => setstudents(stud))

    }
    function getmentors() {
        fetch(apiendpoint + "/mentors")
            .then((data) => data.json())
            .then((ment) => setmentorlist(ment))

    }


    useEffect(() => {
        getmentors();
        getUsers();
    }, []);

    function addUser() {
        fetch(apiendpoint + "/students",
            {
                method: "POST",
                headers: { 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*" },
                body: JSON.stringify(
                    {
                        name: username,
                        avatar: userpic,
                        job: usertitle,
                        mentor: usermentor,
                        phone: userphonenumber,
                        contact: useremail
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
        fetch(apiendpoint + "/students/" + id,
            { method: "DELETE" }
        )
            .then(() => getUsers())
    }

    function editUser(id, name, url, job, contact, mentor, phone) {
        setaddstudentflag(!addstudentflag)
        setid(id)
        addstudentflag ? setusername(name) : setusername("")
        addstudentflag ? setuserpic(url) : setuserpic("")
        addstudentflag ? setusertitle(job) : setusertitle("")
        addstudentflag ? setuserphonenumber(phone) : setuserphonenumber("")
        addstudentflag ? setuseremail(contact) : setuseremail("")

    }

    function updateUser() {
        fetch(apiendpoint + "/students/" + id,
            {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(
                    {
                        name: username,
                        url: userpic,
                        job: usertitle,
                        mentor: usermentor,
                        phone: userphonenumber,
                        contact: useremail
                    }),
            })
            .then((data) => data.json())
            .then(() => (getUsers(),
                removeContent(),
                handleClick()));

    }

    function removeContent() {
        setusername("");
        setuserpic("");
        setusertitle("");
        setuseremail("");
        setusermentor("");
        setuserphonenumber("");
        setblank("")
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': { marginTop: theme.spacing(2), },
        },
    }));
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



    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
    };


    return (
        <>
            <div className="form">
                <div className="subform">
                    <TextField
                        value={username} id="filled-basic" label="Name" variant="filled"
                        onChange={(event) => setusername(event.target.value)} />
                    <TextField
                        value={userpic} id="filled-basic" label="Profile url" variant="filled"
                        onChange={(event) => setuserpic(event.target.value)} />
                    <TextField
                        value={usertitle} id="filled-basic" label="Job Title" variant="filled"
                        onChange={(event) => setusertitle(event.target.value)} />
                </div>

                <div className="subform">
                    <TextField
                        value={userphonenumber} id="filled-basic" label="Phone no." variant="filled"
                        onChange={(event) => setuserphonenumber(event.target.value)} />
                    <TextField
                        value={useremail} id="filled-basic" label="Email" variant="filled"
                        onChange={(event) => setuseremail(event.target.value)} />

                    <Form.Select aria-label="Default select example"
                        onChange={(event) => setusermentor(event.target.value)}>
                        <option>Select Mentor...</option>
                        {
                            mentorlist.map((e) => (<option value={e.name}> {e.name} </option>))
                        }

                    </Form.Select>

                    


                </div>
                <Button variant="primary"
                    onClick={() => addstudentflag ? addUser() : updateUser()}
                >
                    {addstudentflag ? "Add Student" : "Update Student"}
                </Button>
            </div>


            <div className="cardbox">
                {students.map((user) => <User id={user._id} name={user.name} phone={user.phone} url={user.avatar} job={user.job} contact={user.contact} mentor={user.mentor} deletUser={deletUser} editUser={editUser} />)}
            </div>


            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Action Successfull
                </Alert>
            </Snackbar>
        </>
    );
}

function User({ id, name, url, job, contact, mentor, deletUser, editUser, phone }) {
    const history = useHistory();
    return (

        <Card
            onClick={() => history.push("/students/" + id)}
            id="user_card" className="user_card"
        >
            <img className="profilepic" src={url}></img>

            <div>
                <h1>{name}</h1>
                <h5 id="ijob">Profile : {job}</h5>
                <h5 id="iemail">email : {contact}</h5>
            </div>

            <div className="mentorblock">
                <h5 id="ijob">  Mentor :</h5>

                <h4> {mentor}</h4>

            </div>


            <div className="list_option">
                <Fab
                    onClick={() => editUser(id, name, url, job, contact, mentor, phone)}
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
