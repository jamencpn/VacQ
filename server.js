const express = require('express');
const dotenv = require('dotenv');
const res = require('express/lib/response');
const cookieParser = require('cookie-parser'); 
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

//Rate Limiting
const limiter=rateLimit({
    windowsMs:10*60*1000,
    max: 100
})

// Route files
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

const connectDB = require('./config/db');
//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Body parser
const app=express();
app.use(express.json());
app.use(cors()); // requests across domain
app.use(helmet()); // header protection
app.use(limiter); // limit requests max/time
app.use(hpp()); // pram pollution
app.use(mongoSanitize());  // Injection (input query {"$gt":""})
app.use(xss()); // remove </script> input
app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments',appointments);
app.use(cookieParser());

const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandleRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});