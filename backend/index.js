const express = require('express');
const db = require('./config/config.js');
const app = express();
var cors = require('cors');

const port = 3005;

app.use(cors());
app.use(express.json());



app.get('/list', async (req, response) => {

  /*
    This is an API for listing the students
    Request query parameters are: place, country
    req: This is the request
    response: This is the reponse
  **/
  try {

    console.log("Start of /list API")
    var list_query = "select * from studentschema.student_details";
    console.log("list_query - "+list_query)

    console.log("Executing DB query")
    const result = await db.query(list_query);
console.log(result)
    console.log("DB query executed")
    response.json(result.rows); } catch (err) { console.error(err);
    response.status(500).send('Internal Server Error');
  }
});

app.post('/create', async (req, response) => {

  console.log("api created");

  const jsonData = req.body;
  console.log(jsonData);

  console.log(req.query.name)

  try {
    var name = (jsonData.name);
    var age = (jsonData.age);
    var address = (jsonData.address);
    var course = (jsonData.course);
    console.log(name, age);
    var sql_query = "INSERT INTO studentschema.student_details( stu_name, age, address, course, sex)" +
      "VALUES( ' " + name + " ', '" + age + "' , '" + address + " ' , '" + course + "' , 'f')";
    console.log(sql_query);
    const result = await db.query(sql_query);
    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).send('Internal Server Error');
  }
});


app.delete('/delete/:id', async (req, response) => {
  console.log("api created")
  console.log(req.params.id)
  console.log('this is the delet request',req.params.id);
  try {

     var delete_query = "DELETE FROM studentschema.student_details WHERE stu_id =" + req.params.id;

    console.log(delete_query);
    const result = await db.query(delete_query);
    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).send('internal server error');
  }

});

// app.get('/update/:id',async(req,response) =>{
//   console.log('update api created')
//   console.log(req.params.id)
//   console.log('this is the data of update request',req.params.id);
//   try{
//     var updatedata_query = "SELECT ALL FROM studentschema.student_details WHERE stu_id =" + req.params.id;
//     console.log(updatedata_query);
//     const result = await db.query(updatedata_query);
//     response.json(result);
//     n
//   } catch(err) {
//     console.error(err);
//     response.status(500).send('internal server error');
//   }
// }

// )

app.post('/update', async (req, response) => {
  const jsonData = req.body;
  console.log(jsonData)


try {
    var name = jsonData.name
    var age = jsonData.age
    var id = jsonData.id
    var address = jsonData.address
    var course = jsonData.course
     var update_query = "UPDATE studentschema.student_details" +
      " SET stu_name = '" + name + "', " +
      "age = " + age + ", address = '" + address+ "'," + "course = '" +course + "'" + "WHERE stu_id = " + id + ";"

    const result = await db.query(update_query);
    response.json(result);

    console.log(update_query)

  } catch (err) {
    console.error(err);
    response.status(500).send('internal server error');
  }

}


)

app.listen(port, () => { console.log(`Server is listening at http://localhost:${port}`); });