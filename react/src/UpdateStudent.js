import React from 'react';
import './add_student.css';
import { useState } from 'react';
import { useEffect } from 'react';


function UpdateStudent(props) {
//    const[updateData,setUpdateData] = useState([]);
    const[updatestudent,setupdateStudent]=useState({id:props.id_num,name:props.name,
age:props.age,
address:props.address,
course:props.course})

useEffect( () => {
    // Function to fetch data from the API
console.log(props.id_num)
console.log(props.name)
    const fetchupdateData = function updateFields() {
        document.getElementById("name").value = props.name
        document.getElementById("age").value = props.age
        document.getElementById("address").value = props.address
        document.getElementById("course").value = props.course
        
    }
    fetchupdateData(); // Call the fetchData function when the component mounts
   },[]);




  const handleChange = (e) => {
    setupdateStudent({
      ...updatestudent,
      [e.target.name]: e.target.value
    });
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch(`http://localhost:3005/update`, {
        method  : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatestudent)
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
    
<form className='add_student_form'  onSubmit={updateStudent}>

        <header className='form_header'>Update student Info</header>
        <div>
        <label> Full Name: </label>
        <input className='input_field' id='name' onChange={handleChange} name="name" value={updatestudent.name}/><br/>
        </div>
        <div>
        <label>Age: </label>
            <input className='input_field' id='age' onChange={handleChange} name="age"  value={updatestudent.age}/><br/> </div>
            <div>
            <label>Address: </label>
            <input className='input_field' id='address' onChange={handleChange} name="address"  value={updatestudent.address}/><br/>
            </div>
            <div>

            <label>Course: </label>
            <input className='input_field' id='course' onChange={handleChange} name="course"  value={updatestudent.course}/>
            </div>
            <button className='add_button' type='submit'>Update</button>
        </form>
        /* <div className='button_div'>
        <button className='add_button' onClick={props.disable}>Add</button>
        </div> */

   


  )
}

export default UpdateStudent;
