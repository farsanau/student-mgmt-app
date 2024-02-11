import React from 'react';
import './add_student.css';
import { useState } from 'react';
//import e from 'express';

function AddStudentForm(props) {

    const[student,setStudent]=useState({name:'',
age:'',
address:'',
course:''})


  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch('http://localhost:3005/create', {
        method  : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (response.ok) {
        // Handle successful response
        console.log('Form data submitted successfully');
      } else {
        // Handle errors if needed
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    
<form className='add_student_form'  onSubmit={handleSubmit}>

        <header className='form_header'>Add student Form</header>
        <div>
        <label> Full Name: </label>
        <input className='input_field' onChange={handleChange} name="name" value={student.name}/><br/>
        </div>
        <div>
        <label>Age: </label>
            <input className='input_field' onChange={handleChange} name="age"  value={student.age}/><br/>
            </div>
            <div>
            <label>Address: </label>
            <input className='input_field' onChange={handleChange} name="address"  value={student.address}/><br/>
            </div>
            <div>

            <label>Course: </label>
            <input className='input_field' onChange={handleChange} name="course"  value={student.course}/>
            </div>
            <button className='add_button' type='submit'>Add</button>
        </form>
        //  <div className='button_div'>
        // <button className='add_button' onClick={props.disable}>Add</button>
        // </div> 

   


  )
}

export default AddStudentForm;
