const express = require("express");
const bodyParser=require('body-parser');
const _ = require("lodash");
const yargs = require("yargs");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const parties= require('./api/routes/parties');
const hello= require('./api/routes/home');
const mongoose= require('mongoose');


// mongoose.connect('monagodb://localhost/politico') 
// .then(()=> console.log('Connected to mongoose db'))//#endregion
// .catch(err => console.log('Could not connect to mongoose db',err));
// app.use(morgan);
mongoose.connect(
  "mongodb://tmosco:politico@politico-shard-00-00-zhv7z.mongodb.net:27017,politico-shard-00-01-zhv7z.mongodb.net:27017,politico-shard-00-02-zhv7z.mongodb.net:27017/test?ssl=true&replicaSet=Politico-shard-0&authSource=admin&retryWrites=true"
,{
  useNewUrlParser: true } );
// mongoose.connect('mongodb + srv://tmosco:'+ 
// process.env.MONGO_ATLASS_PW + 
// 'politico@politico-zhv7z.mongodb.net/test?retryWrites=true');




const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger);


// Routes that handles Request
app.use('/api/v1/parties', parties);
app.use('/',hello);

app.use((req,res,next) =>{
const error = new Error('Not found');
error.status=404;
next(error); console.error();
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message:error.message
    }
  })

})





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}....`);
});


module.exports = app;