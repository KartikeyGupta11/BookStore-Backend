import mongoose from 'mongoose';

const dbConnect = (url) =>{
    return mongoose.connect(url);
}

// function dbConnect(url){
//     return mongoose.connect(url);
// }

export default dbConnect;