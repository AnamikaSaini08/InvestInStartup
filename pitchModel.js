const mongoose = require( 'mongoose');
const { Schema } = mongoose;

const pitchSchema = new Schema({
  entrepreneur:  {
    type: String,
    required: true
}, 
  pitchTitle: {
    type: String,
    required: true
},
  pitchIdea:   {
    type: String,  
    required: true
},
  askAmount: {
    type:  Number,  
    required: true
},
  equity: {
    type: Number, 
    required: true
},
  offer:{
    type: []
  }
});

module.exports = mongoose.model("pitch",pitchSchema);