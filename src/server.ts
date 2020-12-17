
require('dotenv').config();
import mongoose from 'mongoose';
import App from './app'
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION REJECTION! ');
    console.log(err.name, err.message);

    process.exit(1);
});
const PORT = process.env.PORT || 8080;
const server = App.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});
mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connections');
}).catch(() => {
    console.log('DB Connect Failure')
})

process.on('unhandleRejection', err => {
    console.log('UNHANDLER REJECTION! ');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    });
});
