const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kev:kev1234@cluster0.fi0ga.mongodb.net", { useNewUrlParser: true, useUnifiedTopology: true });
const Device = require('./models/device');


const express = require('express');
const app = express();

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())


const port = process.env.PORT || 5000;


app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); });


app.get('/api/test', (req, res) => { 
    res.send('The API is working!');

});

app.post('/api/devices', (req, res) => { const { name, user, sensorData } = req.body; const newDevice = new Device({
    name,
    user,
    sensorData
});
newDevice.save(err => {
return err
? res.send(err)
: res.send('successfully added device and data');
}); });

app.post('/api/send-command', (req, res) => { 
    console.log(req.body);
});

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
     return err
       ? res.send(err)
       : res.send(devices);
    });
  });

app.listen(port, () => { console.log(`listening on port ${port}`);
});
