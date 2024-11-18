const mongoose = require('mongoose');

const custSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    address: {
        type: String,
        default: 'Not Provided'
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    subject: {
        type: String,
        default: 'General Inquiry'
    }
});

const cust = mongoose.model('Customers', custSchema);

module.exports = cust;