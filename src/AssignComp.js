import React, { useCallback, useEffect, useState } from 'react';
import { Admin } from './Admin';
import { useHistory } from 'react-router';
import { apiendpoint } from './Admin';
import Card from '@material-ui/core/Card';
import Button from 'react-bootstrap/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Form from 'react-bootstrap/Form'
import { SystemUpdateAltRounded } from '@material-ui/icons';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { filter } from 'domutils';
import { isIdentifierChar } from 'acorn';
import { isIdentifier } from 'typescript';


export function AssignComp() {

    const [students, setstudents] = useState([]);
    const [mentorlist, setmentorlist] = useState([]);

    const[usermentor,setusermentor]=useState("")

    const [checkedstudents,setcheckedstudents]=useState([]);
    const [checkstatus,setcheckstatus]=useState(false)
    const [stat,changestat]=useState(false)
    var cstd=[]

    function getUsers() {
        fetch(apiendpoint + "/UpdateMultiple", {
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
        //editchecklist();
    }, []);
 
    function editchecklist(iid,istatus){
        console.log("incoming status  "+iid +" "+istatus)

        // if(checkidExist1(iid))
        // {
        //     cstd.push(iid)
        // }
        // else
        // {
        //     cstd=cstd.filter((e)=>e != iid)  
        // }
        // console.log("cstd array",cstd)

        if(checkidExist2(iid))
        {
            
            setcheckedstudents([...checkedstudents,iid])
        }
        else
        {
            setcheckedstudents(checkedstudents.filter((e)=>e!==iid))
        }
        
           // console.log("checkedstudents aarray\n",checkedstudents)
        
        
    }

    
    function checkidExist1(iid){
        const res=cstd.filter((e)=>e==iid)
        return(res.length===0 ? true: false)
        
    }
    function checkidExist2(iid){
        const res=checkedstudents.filter((e)=>e==iid)
        return(res.length===0 ? true: false)
    }

    function updateMultiple() {

       console.log(cstd,usermentor)

        fetch(apiendpoint + "/UpdateMultiple",
            {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({data: cstd ,mentor :usermentor}),
            })
            .then((data) => data.json())
            .then(() => (getUsers()))
    }

    console.log("checkedstudents aarray\n",checkedstudents)
    return (
        <div>
            <div className="">
                <h1>UNASSIGNED STUDENTS</h1>

            </div>
            <Form.Select 
            onChange={(event) => setusermentor(event.target.value)}
            aria-label="Default select example">
            <option>Select Mentor...</option>
            {
                 mentorlist.map((e) => (<option value={e.name}> {e.name} </option>))
            }
            </Form.Select>

            <Button variant="primary" onClick={()=>updateMultiple()}>
                apply
            </Button>


            <div className="">
                <div className="cardbox">
                    {students.map((user) => <User id={user._id} name={user.name} phone={user.phone} url={user.avatar} job={user.job} contact={user.contact} checkedstudents={checkedstudents} setcheckedstudents={setcheckedstudents} checkstatus={checkstatus} setcheckstatus={setcheckstatus} editchecklist={editchecklist}/>)}
                </div>

            </div>


        </div>
    );
}


function User({ id, name, url, job, contact, mentor, phone ,checkedstudents,setcheckedstudents, checkstatus,setcheckstatus,editchecklist}) {
    const history = useHistory();
    return (

        <Card
            // onClick={() => console.log(id)}
            id="user_card" className="user_card"
        >
            <Form>
                <Form.Check
                    onClick={()=>(editchecklist(id,true))}
                    aria-label="option 1"
                    type="checkbox"
                />
            </Form>


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


        </Card>

    );

}