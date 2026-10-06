const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const {logger} = require('./middleware/loggerMiddleware');
const tasksRoute = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

app.use(logger);
app.use("/tasks", tasksRoute);


app.get('/',(req, res, next) => {
    res.send("Hello World!");
})

app.use(errorHandler);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;





// require('dotenv').config();
// const express = require('express');
// const tasksRoute = require('./routes/taskRoutes');
// const {logger} = require('./middleware/loggerMiddleware');

// // const bodyParser = require('body-parser');
// const app = express();
// // app.use(bodyParser);
// app.use(logger);
// app.use(express.json());
// app.use("/tasks", tasksRoute); // OCP


// app.get('/',(req, res, next) => {
//     res.send("Hello World!");
// })


// // console.log(process.env);
// const PORT = parseInt(process.env.PORT);
// app.listen(PORT, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Server is running on port ", PORT) 
//     }
   
// })