import express from "express";
import cors from 'cors';
import morgan from "morgan";
import connect from "./Database/Connection.js";
import router from "./Router/route.js";

const app = express();
const PORT = 5500;

/**Middlewares*/
app.use(express.json())
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers will know about our stack

/** Http GET Route **/
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request');
})

/** API Routes **/
app.use('/api', router)


/** Start Server only when we have valid connection**/
connect().then(() => {
    try {
        app.listen(PORT, (req, res) => {
            console.log(`Server running on PORT ${PORT}`)
        })
    } catch (error) {
        console.log('Cannot connect to the server', { message: error.message })
    }
}).catch(error => {
    console.log('Invalid database connection...!')
})

