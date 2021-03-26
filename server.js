import express from 'express'
import mysql from 'mysql'
import cors from 'cors'



const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use (cors());
app.use(express.json());


//connect DB
const db = mysql.createConnection({
    host:'eu-cdbr-west-03.cleardb.net',
    user:'bf6a4232071198',
    password: 'b37bf9df',
    database: 'heroku_eaf36263e6f5538',
    multipleStatements: true 
});


db.connect( (err) =>{
    if (err){
        throw err;
    }

    console.log('MySql Connected');
})


//CRUD functions



  app.get('/', (req, res) =>{
        db.query("SELECT * FROM users", (err, result) => {
            if (err){
                console.log(err);
            }else
            {
                console.log(result);
                res.send(result);
            }
        });
  })


  app.get('/Departments', (req, res) =>{
    db.query("SELECT * FROM department", (err, result) => {
        if (err){
            console.log(err);
        }else
        {
            console.log(result);
            res.send(result);
        }
    });
})


app.post ('/create' , (req, res) =>{
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const jobTitle = req.body.jobTitle;
    const  department = req.body.department

    db.query ("INSERT INTO users (lastName, firstName, jobTitle,  department) VALUES (?,?,?,?)", 
    [lastName, firstName, jobTitle, department], 
    (err, result) =>{
        if (err){
            console.log(err);
        }else{
            res.send("Vales Inserted");
        }
    } )
})


app.post ('/createdepartment' , (req, res) =>{
    const name= req.body.name;
    const pdepartment= req.body.pdepartment;

    db.query ("INSERT INTO department (name, pdepartment) VALUES (?,?)", 
    [name, pdepartment], 
    (err, result) =>{
        if (err){
            console.log(err);
        }else{
            res.send("Vales Inserted");
        }
    } )
})
  

app.put ('/update' , (req, res) =>{
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const jobTitle = req.body.jobTitle;
    const  department = req.body.department;
    const id = req.body.id;
    

    db.query ("UPDATE users SET lastName = ?, firstName = ?, jobTitle = ?, department = ? WHERE id = ? ", 
    [lastName, firstName, jobTitle, department, id], 
    (err, result) =>{
        if (err){
            console.log(err);
        }else{
            res.send("Vales Inserted");
        }
    } )

})


app.put ('/updatedepartment' , (req, res) =>{

  
    const checkname = req.body.checkname;
    const name= req.body.name;
    const id = req.body.id;
    db.query ("UPDATE department SET name = ? WHERE idd = ?; UPDATE department SET pdepartment = ? WHERE pdepartment = ?; UPDATE users SET department = ? WHERE department = ?;   ", 
    [name, id, name, checkname,name,checkname], 
    (err, result) =>{
        if (err){
            console.log(err);
            return
        }else{
            res.send("Vales Inserted");
            return
        }
    } );

})


app.put ('/movedepartment' , (req, res) =>{
    
  const pdepartment = req.body.pdepartment;
    const id = req.body.id;
    const lastid = req.body.lastid;
    const lastdepartment = req.body.lastdepartment;

    db.query (" UPDATE department t1 JOIN department t2 ON t1.idd = ? AND t2.idd = ? SET t1.pdepartment = ?", 
    [id, lastid , pdepartment], 
    (err, result) =>{
        if (err){
            console.log(err);
        }else{
            res.send("Vales Inserted");
        }
    } )

})







app.listen (port, () =>{
    console.log("Server started");
})
