const mongoose = require( 'mongoose');
const { Schema } = mongoose;

const investerSchema = new Schema({
    investor:  {
    type: String,
    required: true
}, 
    amount: {
    type: Number,
    required: true
},
  equity: {
    type: Number, 
    required: true
},
   comment: {
    type: String, 
    required: true
},
});

module.exports = mongoose.model("inverster",investerSchema);