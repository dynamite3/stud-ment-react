import React, { useEffect, useState }  from 'react';
import Form from 'react-bootstrap/Form';
import { apiendpoint } from './Admin';
import Button from 'react-bootstrap/Button';
import Card from '@material-ui/core/Card';

export function FilterbyMentor() {

    const [mentorlist, setmentorlist] = useState([])
    const[usermentor,setusermentor]=useState("")
    const [students, setstudents] = useState([]);
    const[filterflag,setfilterflag]=useState("false")

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
        getUsers();
        getmentors();
    }, []);

return (
        <div>
            <h1>FilterbyMentor</h1>

            <Form.Select 
            onChange={(event) => setusermentor(event.target.value)}
            aria-label="Default select example">
            <option>Select Mentor...</option>
            {
                 mentorlist.map((e) => (<option value={e.name}> {e.name} </option>))
            }
            </Form.Select>
            <Button variant="primary" className="filterbut"
                onClick={()=>setfilterflag(!filterflag)}
                >
            Filter</Button>
            {
                filterflag ? <ListMentorStudents mentor={usermentor} students={students}/>:""
            }
            
        </div>
    );

}


function ListMentorStudents({mentor,students}){
    
    
    const filtered=students.filter((e)=>(mentor===(e.mentor)))
    
    return(
        <div className="cardbox">
                {
                    filtered.map( (user)=> 
                        <User id={user._id} name={user.name} phone={user.phone} url={user.avatar} job={user.job} contact={user.contact} mentor={user.mentor} />)
                }
        </div>

    )
}


function User({ id, name, url, job, contact, mentor, phone }) {
    
    return (

        <Card
            id="user_card" className="user_card">
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
