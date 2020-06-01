const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);
router.get('/tracks', async (req, res) => {
    try{
        console.log('i am rahul');

        const tracks = await Track.find({ userId: req.user._id });
        res.send(tracks);
    }
    catch(err) {
    }
   

});
router.post('/tracks', async(req,res) => {

    const {name, locations} = req.body;
    console.log(name);
    if(!name || !locations) {
        return res.status(422).send({error:"You must provide valid name and location"});
    }
    try {
        const track = new Track({name,locations,userId: req.user._id});
        await track.save();
        res.send(track);
    }
    catch(err){
        return res.status(422).send({error: err.message});
    }


});

module.exports = router;