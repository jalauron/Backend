const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');

//Routes Here
const authRoute1 = require('./routes/authRoute1');
const userRoute1 = require('./routes/userRoute1');
const deptRoute1 = require('./routes/deptRoute1');
const coursesRoute1 = require('./routes/coursesRoute1');
const studentsRoute1 = require('./routes/studentsRoute1');

const app = express();

app.use(bodyParser.json()); 
app.use(cors());

app.get('/', function(req, res){ 
    res.send("JAYME LAURON");
});

// Endpoint Here
app.use('/api/auth', authRoute1);
app.use('/api/user', userRoute1);
app.use('/api/departments', deptRoute1);
app.use('/api/courses', coursesRoute1);
app.use('/api/students', studentsRoute1);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});