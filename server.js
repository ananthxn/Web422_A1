
/*********************************************************************************
* WEB322 – Assignment 01
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Ananthakrishnan Arunkumar Student ID: 134658210 Date: 19 May
*
* Cyclic Web App URL:  
*
* GitHub Repository URL: 
*git
********************************************************************************/


const express = require('express');
const cors = require('cors');
const TripDB = require("./modules/tripDB.js");
const db = new TripDB();

require('dotenv').config();

const app = express();

const HTTP_PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'API Listening' });
})

app.post("/api/trips", (req, res) => {

    db.addNewTrip(req.body)
        .then((trip) => {
            res.status(201).json(trip);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
})

app.get("/api/trips", (req, res) => {
    const { page, perPage } = req.query;
    db.getAllTrips(page, perPage)
        .then((trips) => {
            res.status(201).json(trips);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
})

app.get("/api/trips/:id", (req, res) => {
    const {id} = req.params;

    db.getTripById(id)
        .then((trip) => {
            res.status(201).json(trip);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
})

app.put('/api/trips/:id', (req, res) => {
    const {id} = req.params;

    db.updateTripById(req.body, id)
        .then(() => {
            res.status(201).json({ message: `trip successfully updated` });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

app.delete("/api/trips/:id", (req, res) => {
    const {id} = req.params;

    db.deleteTripById(id)
        .then(() => {
            res.status(201).json({ message: `trip deleted successfully` });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
})


db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
