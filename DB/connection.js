import mongoose from "mongoose";

const DB_connection = async () => {
    await mongoose.connect(process.env.CONNECTION_URL_LOCAL)
        .then((res) => console.log('DB Connected Successfully'))
        .catch((err) => console.log('db connection failed', err))
}


export default DB_connection;
