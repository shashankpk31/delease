const mongoose = require("mongoose")
const dbdata=require("./dbdata")

const connect=()=>{
    mongoose.connect(`mongodb://${dbdata.HOST}:${dbdata.PORT}/${dbdata.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
}


module.exports = {
   connect
};