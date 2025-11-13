const mongo = require('mongoose');

const pocSchema = new mongo.Schema({
    client_id: {
        type: String,
        required: [true, "Client is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    poc_name: {
        type: String,
        required: [true, 'POC name is required']
    },
    poc_contact_number: {
        type: Number,
        required: [true, 'POC Contact Number is required']
    },
    designation: {                
        type: String,
        required: [true, 'Designation is required']
    },
    status: {
        type: String,
        default: "ACTIVE",
    },
}, { timestamps: true });         
const pocModel = mongo.model('poc', pocSchema);

module.exports = pocModel;
