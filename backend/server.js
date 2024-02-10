const express= require("express");
const mysql= require('mysql'); 
const cors= require('cors');

const app=express();
app.use(cors());
app.use(express.json()) //parse the data into json

const db=mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6682891",
    password: "2YVkxLidZZ",
    database: "sql6682891",
})

// Signup api
app.post('/signup', (req, res)=>{
    const sql= "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data); //in case no err.

    });
})

//login api
app.post('/login', (req, res)=>{
    const sql= "SELECT * FROM login WHERE `email`=? AND `password`=?";
    // const values = [
    //     req.body.email,
    //     req.body.password
    // ]
    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        console.log(`email aaya: ${req.body.email} and pass aaya: ${req.body.password}`)
        if(err){
            return res.json("Error");
        }
        if(data.length > 0)//means record is there
        {
            return res.json("Success");
        }else{
            return res.json("Failed");
        }

    });
})

//person profile page details
// Get user details API
app.post('/profile', (req, res) => {
    // Execute query to get the id of the user
    const getIdQuery = "SELECT id FROM login WHERE email=? AND password=?";
    db.query(getIdQuery, [req.body.email, req.body.password], (err, idData) => {
        if (err) {
            return res.json("Error");
        }
        if (idData.length > 0) {
            const userId = idData[0].id;

            console.log("userId we get bro is: ", userId); //✔
            // Execute query to get user details with person details
            const userDetailsQuery = `
                SELECT
                    login.name,
                    login.email,
                    COALESCE(person.dob, 'N/A') AS dob,
                    COALESCE(person.contact, 'N/A') AS contact,
                    COALESCE(person.age, 'N/A') AS age,
                    COALESCE(person.school, 'N/A') AS school
                FROM
                    login
                LEFT JOIN
                    person_details AS person ON login.id = person.id
                WHERE
                    login.id = ?
            `;
            db.query(userDetailsQuery, [userId], (err, userData) => {
                if (err) {
                    return res.json("Error");
                }
                if (userData.length > 0) {
                    // console.log("data we get is: ", userData[0]);
                    return res.json(userData[0]);
                } else {
                    return res.json("No user details found");
                }
            });
        } else {
            return res.json("User not found");
        }
    });
});

//edit profile detail
app.post('/update-profile', (req, res) => {
    console.log("detail hai :", req.body.email);
    // Execute query to get the id of the user
    const getIdQuery = "SELECT id FROM login WHERE email=? AND password=?";
    db.query(getIdQuery, [req.body.email, req.body.password], (err, idData) => {
        if (err) {
            return res.json("Error");
        }
        if (idData.length > 0) {
            const userId = idData[0].id;
            console.log("update userId is: ", userId);
            // Extract updated fields from the request body
            const { name, email, age, dob, contact, school } = req.body;
            // Update login table with updated name
            const updateLoginQuery = "UPDATE login SET name=? WHERE id=?";
            db.query(updateLoginQuery, [name, userId], (err) => {
                if (err) {
                    return res.json("Error updating login details");
                }
                // Check if the user exists in person_details
                const checkUserQuery = "SELECT * FROM person_details WHERE id=?";
                db.query(checkUserQuery, [userId], (err, userData) => {
                    if (err) {
                        return res.json("Error checking user details");
                    }
                    if (userData.length === 0) {
                        // If user does not exist, insert new row
                        const insertUserQuery = "INSERT INTO person_details (id, age, dob, contact, school) VALUES (?, ?, ?, ?, ?)";
                        db.query(insertUserQuery, [userId, age, dob, contact, school], (err) => {
                            if (err) {
                                return res.json("Error adding new user details");
                            }
                            return res.json("Profile updated successfully");
                        });
                    } else {
                        // If user exists, update their details
                        const updatePersonDetailsQuery = "UPDATE person_details SET age=?, dob=?, contact=?, school=? WHERE id=?";
                        db.query(updatePersonDetailsQuery, [age, dob, contact, school, userId], (err) => {
                            if (err) {
                                return res.json("Error updating person details");
                            }
                            return res.json("Profile updated successfully");
                        });
                    }
                });
            });
        } else {
            return res.json("User not found");
        }
    });
});



app.listen(8081, ()=>{
    console.log("listening on post 8081");
})