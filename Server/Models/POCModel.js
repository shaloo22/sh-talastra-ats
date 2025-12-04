const mongo = require('mongoose');

const pocSchema = new mongo.Schema({
    client_id: {
        type: String,
        required: [true, "Client is must"]
    },
    location: {
        type: String,
        required: [true, "Location is must"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    poc_name: {
        type: String,
        required: [true, 'POC name is must']
    },
    poc_contact_number: {
        type: Number,
        required: [true, 'POC Contact Number is must']
    },
    status: {
        type: String,
        default: "ACTIVE",
    },
}, { timestamps: true });
const POC = mongo.models.POC || mongo.model('POC', pocSchema);

module.exports = POC;
