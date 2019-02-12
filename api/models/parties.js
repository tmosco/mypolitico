const mongoose= require('mongoose');

const partyShema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    hqAddress:String,
    logourl:String
});

module.exports= mongoose.model('party', partyShema);


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
});