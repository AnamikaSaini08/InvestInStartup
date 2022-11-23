const express = require("express");
const app = express();
const PORT = 8081;
const db = require('./dbConnection');
const Pitch = require('./pitchModel');
const pitchOffer = require('./InvesterModel');

app.use(express.json());

app.post('/pitches' , async (req , res)=>{

    if(!req.body || (req.body.equity > 100) || !req.body.entrepreneur){
        return res.status(400).json({status: 400 , message: "error in posting new pitch"});
    }

    const newPitch = new Pitch(req.body);
    try{
        const savedPitch = await newPitch.save();
        console.log(savedPitch);
        res.status(200).json(savedPitch.id);

    }catch(err){
        if(res.status(400)){
            return res.status(400).json({status: 400 , message: "error in posting new pitch"});
        }
        else{
            throw err;
        }
    }
   
});

app.post('/pitches/:id/makeOffer' , async(req , res)=>{

    if(!req.body || (req.body.equity > 100) || !req.body.investor){
        return res.status(400).json({status: 400 , message: "error in posting new offer"});
    }

    const pitchId = req.params.id;
    try{
        await Pitch.findById(pitchId);
    }catch(err){
        return res.status(404).json({status: 404 , message: "Not found Id for which offer made"});
    }

    const newOffer = new pitchOffer(req.body);
    try{
        const savedOffer = await newOffer.save();
        console.log(savedOffer);
       
        try{
            await Pitch.findByIdAndUpdate(offerId , {$push : {offer : savedOffer._id}});
        }catch(err){
            throw err;
        }
        res.status(201).json(JSON.stringify(savedOffer.id));
    }catch(err){
        return res.status(400).json({status: 404 , message: "error in making offer made"});
    }
});

app.get('/pitches' , async (req , res)=>{
    try{
        const allPitches = await Pitch.find();
        res.status(200).json(allPitches);
    }catch(err){
        throw err;
    }
})

app.get('/pitches/:id' , async (req , res)=>{
    try{
        const findPitch = await Pitch.findById(req.params.id);
        res.status(200).json(findPitch);
    }catch(err){
        return res.status(404).json({status: 404 , message:"non-existanec pitch"});
    }
})

app.listen(PORT , ()=>{
    db();
    console.log("Server Started");
})
