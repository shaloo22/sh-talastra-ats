const mongo = require('mongoose');

const clientSchema = new mongo.Schema({
    company_name: {
        type: String,
        required: [true, "First name is must"]
    },

    location: {
        type: String,
        required: [true, "Locatione is must"]
    },

    website: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    brief: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "ACTIVE",
    },
})
const clientModel = mongo.model('client', clientSchema)

module.exports = clientModel;