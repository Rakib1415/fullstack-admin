const mongoose = require('mongoose');

function connectDb(connectionString) {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
mongoose.set('strictQuery', true);

module.exports = connectDb;
