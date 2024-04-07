const mongoose = require('mongoose');
require('dotenv').config()

function connectToMongodb(){
    mongoose.connect("mongodb+srv://arhato23:OrYpCrdZUZwhlVCo@cluster0.4jszfhn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0" || process.env.DATABASE_URL)
    .then(()=>
        console.log("Connected to database.")
    ).catch(err=>
        console.log(`Failed connection to database:\n${err}`)
    );
}
module.exports = { connectToMongodb };
