import React from 'react';
import './student_list.css';
import AddStudentForm from './Add_student_form';
import UpdateStudent from './UpdateStudent';
import { useEffect } from 'react';
import { useState } from 'react';


function StudentList() {

    const[addClick,setAddClick] = useState(false);
    const[data,setData] = useState([]);
    const [updateDataform, setUpdateDataform] = useState(false);
    const [updateid,setupdateid] = useState(null);
    const [updatename,setupdatename] = useState(null);
    const [updateage,setupdateage] = useState(null);
    const [updateaddress,setupdateaddress] = useState(null);
    const[updatecourse,setupdateCourse] = useState(null);


   useEffect( () => {
    // Function to fetch data from the API

    const fetchData = async () =>{
        try{
            const response = await fetch('http://localhost:3005/list',{method:'GET'});
            if (response.ok){
                const fetchedData =  await response.json();
                setData(fetchedData);
            }
            else{
                console.error('Failed to fetch data');
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    fetchData(); // Call the fetchData function when the component mounts
   },[]);

  

 function showForm(){
    setAddClick(true)
 }

 function showUpdateForm(id,name,age,address,course){
  
  setupdateid(id)
  setupdatename(name)
  setupdateage(age)
  setupdateaddress(address)
  setupdateCourse(course)
  setUpdateDataform(true)
 }

function deleteStudent(id){

    console.log('deleting id',id);
    fetch(`http://localhost:3005/delete/${id}`, {method:'DELETE',
    headers: { 'Content-Type': 'application/json' }})  .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        // Handle success cases if needed
        console.log('Data deleted successfully');
        // Perform other actions after successful deletion
      })
      .catch((error) => {
        // Handle errors that might occur during the delete request
        console.error('There was a problem with the DELETE operation:', error);
      });

}

// function updateStudent(){
//     console.log("updating")
//     fetch('http://localhost:3005/update',{
//         method:'POST',headers:{'Content-Type': 'application/json'},
//         body:JSON.stringify(updatedData),
//     })
//     .then(response=>{
//       if(!response.ok){
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data=>{
//       console.log('Data updated successfully:', data);
//     })
//     .catch(error => {
//       console.error('Error updating data:', error);
//       // Handle errors, show a message, or perform other error-handling actions
//     });
// };


  return (
    <div>

<div>
      <h1 className='list_heading'>STUDENT LIST</h1>
      <table className='student_list'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Course</th>
            <th>Sex</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.stu_id}>
              <td>{item.stu_id}</td>
              <td>{item.stu_name}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>{item.course}</td>
              <td>{item.sex}</td>
 <td>
    <div className='edit_delete'>
    <button className='edit' onClick={()=>showUpdateForm(item.stu_id,item.stu_name,item.age,item.address,item.course)}>Edit</button>
    
    <button className='delete' onClick={()=>deleteStudent(item.stu_id)}>Delete</button>
    </div>

</td>
            </tr>
          ))}
     
        </tbody>
      </table>
    </div>

            
 <div className='add_button_div'>
        <button onClick={showForm} className='add_student'>
            Add New Student +
        </button>
        </div>
       {addClick?<AddStudentForm disable={() =>setAddClick(false)}/>:null} 
       {updateDataform?<UpdateStudent id_num ={updateid} name ={updatename} age={updateage} address ={updateaddress} course={updatecourse}disable={() =>setUpdateDataform(false)}/>:null} 
    </div>
 
    
       
   



  );
}

export default StudentList;








