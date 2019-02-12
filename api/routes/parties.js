const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose= require('mongoose');


const parties= require('../models/parties');
// const parties = [
//   {
//     id: 1,
//     name: "APC",
//     hqAddress: "Abuja",
//     logourl: "www.apc.com.ng"
//   },
//   {
//     id: 2,
//     name: "PDP",
//     hqAddress: "Lagos",
//     logourl: "www.pdp.com.ng"
//   }
// ];

router.get("/", (req, res,next) => {
  res.status(200).send(parties)

});


router.get("/:id", (req, res,next) => {
  // const party = parties.find(party => party.id === parseInt(req.params.id));
  // if (!party) {
  //   res.status(404).send("The party was not found");
  // } else {
  //   res.send(party);
  // }
  // res.send("All specific party")

  const id = req.params.id;
  parties.findById(id)
  .exec()
  .then(data=>{
    console.log("From the Database",data);
    if(data){
      res.status(200).json(data);
    }
    else{
      res.status(404).json({
        message:"ID is not Valid"
      });
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({error:err});
   });
});

function validateParty(party) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    hqAddress: Joi.string(),
    logourl: Joi.string()
  };
  return Joi.validate(party, schema);
}

router.post("/", (req, res, next) => {
  //using made validation
  // if(!req.body.name || req.body.name.length > 5){
  //     res.status(400).send("Name is required and should be a minimum of 3 character");
  // }

  // const result= validateParty(req.body);
  const { error } = validateParty(req.body); // same as result.error

  if (error) return res.status(400).send(error.details[0].message);
  
  // let partiesNames = parties.map(partiesNames => partiesNames.name);
  // let checkPartyName=partiesNames.includes(req.body.name);
  // if (checkPartyName) return res.status(400).send(`${req.body.name} is already a party name`);

const party= new parties({
  _id: new mongoose.Types.ObjectId(),
  name: req.body.name,
  hqAddress: req.body.hqAddress,
  logourl: req.body.logourl
});
 party.save()
 .then(result => {
   console.log(result);
   res.status(status).json({
     message: 'Party was created',
     party,
   });
 })
 .catch(err => {
   console.log(err)
  res.status(500).json({
    error:err
  })
 })
  // res.send(party);

});

router.patch("/:id", (req, res,next) => {
  let party = parties.find(party => party.id === parseInt(req.params.id));
  if (!party) return res.status(404).send("The party was not found");

  const { error } = validateParty(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update the party
  party.name = req.body.name;
  //return updated course to the client
  res.send(party);
});

router.delete("/:id", (req, res,next) => {
  //look up new party
  let party = parties.find(party => party.id === parseInt(req.params.id));
  // Not existing,return 404
  if (!party) return res.status(404).send("The party was not found");

  //delete
  const index = parties.indexOf(party);
  parties.splice(index, 1);

  //return the same course
  res.send(party);
});

module.exports = router;
