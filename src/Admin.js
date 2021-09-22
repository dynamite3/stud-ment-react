import React, { useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { HighlightOffOutlined, RepeatOutlined } from '@material-ui/icons';
import { StudentComp } from './StudentComp';
import { useHistory } from 'react-router';
import { MentorComp } from './MentorComp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AssignComp } from './AssignComp';
import { FilterbyMentor } from './FilterbyMentor';


//export const apiendpoint = "https://student-mentorapp.herokuapp.com"
export const apiendpoint = "http://localhost:4500"

export function Admin() {
    const [mainflag, setmainflag] = useState(null)

    const history = useHistory();
    return (
        <Container className="maincontainer">
            <Row className="r1">
                <Button variant="primary" onClick={() => {
                    setmainflag(1);
                    history.push("/students")
                }}>Student</Button>
                <Button variant="success" onClick={() =>{
                    setmainflag(2);
                    history.push("/mentors")
                }}>Mentor</Button>
                <Button variant="secondary" onClick={() => {
                    setmainflag(4);
                    history.push("/FilterbyMentor")
                }}>Filter By Mentor</Button>
                <Button variant="warning" onClick={() => {
                    setmainflag(3);
                    history.push("/UpdateMultiple")
                }}>Update Multiple Students </Button>
                
            </Row>

            <Row className="r2">

                {mainflag == 1 ? <StudentComp /> : mainflag == 2 ? <MentorComp/> : mainflag==4 ? <FilterbyMentor/> : mainflag==3 ? <AssignComp/>:""}


            </Row>
        </Container>
    );
}


