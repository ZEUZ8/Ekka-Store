const mongoose = require('mongoose')


function connecting(url,cb){
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((result) => cb())
    .catch((err) => console.log(err));
}

module.exports = connecting ;
 
