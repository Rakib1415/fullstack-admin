require('dotenv').config();
const app = require('./app/app');
const connectDb = require('./db/db');

const PORT = process.env.PORT || 8000;

(async () => {
    try {
        await connectDb(process.env.MONGO_DB);
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
        console.log('Database Connected!');
    } catch (err) {
        console.log(err);
    }
})();
