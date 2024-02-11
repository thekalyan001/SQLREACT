//node --inspect ./bin/www
https://medium.com/@gsandamali30/jwt-based-user-authentication-using-reactjs-node-express-and-mysql-41b5bedde11f
https://medium.com/@gsandamali30/jwt-based-user-authentication-using-reactjs-node-express-and-mysql-d5deff9edc36
https://medium.com/@gsandamali30/jwt-based-user-authentication-using-reactjs-node-express-and-mysql-248141bd99f8


create folder backend


backend->
add package.json using->npm init -y
mysql, express, cors(for backend api in frontend), nodemon, -> npm i mysql express cors nodemon

For writing file create server.js
cd..

npx create-react-app frontend (it will create frontend folder of react)
create Login.js and write code.
npm i '@mui/material'
npm i '@emotion/react' 
npm i '@emotion/styled'
npm i 'react-hook-form'  
npm install react-router-dom


Create Signup.js and write code.


in app.js add import { BrowserRouter, Routes, Route } from 'react-router-dom';


-------Backend-
server.js write express.js code

and in backend->package.json file add "start": "nodemon server.js"

  const onSubmit = (data) => {
    //backend code call function for insert into db
    if(data.name!="" && data.username != "" &&data.password != ""){

    }
  };

install axios--
npm install axios



CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(20),
    email VARCHAR(30),
    PASSWORD VARCHAR(20)
);


see server side for server side console.


/** bhasad sql**/
CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(20),
    email VARCHAR(30),
    PASSWORD VARCHAR(20)
);

SELECT * FROM login
SELECT id FROM login WHERE email='test@gmail.com' AND PASSWORD='111111'


CREATE TABLE person_details (
CREATE TABLE person_details (
    id INT PRIMARY KEY,
    dob DATE,
    contact VARCHAR(15),
    age INT,
    school VARCHAR(50)
);
SELECT * FROM person_details WHERE id=3
ALTER TABLE person_details MODIFY COLUMN id INT PRIMARY KEY;


INSERT INTO person_details (id, dob, contact, age, school)
VALUES (3, '1990-01-02', '23232322', 20, 'Total School');,
('2000-01-02', '99873733', 40, 'Test School');



#peofile data api
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
    login.id = 3;


-------------------
This code follows the principles of a RESTful API by utilizing HTTP methods (in this case, POST), 
defining clear endpoints ('/update-profile'), and returning JSON responses. 
Therefore, it can be considered a RESTful API endpoint.