const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cust = require('./models/customer');

const app = express();

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(bodyParser.json());

async function main() {
    try {
        // Removed the deprecated options `useNewUrlParser` and `useUnifiedTopology`
        console.log('Connected to the');
        await mongoose.connect("mongodb://localhost:27017/Backend-The_AssignerDB");
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Database connection failed', err);
    }
}

main().catch(console.error);
app.route('/contactus')
    .post(async (req, res) => {
        const { name, email, phone, address, message, subject } = req.body;

        // Validate incoming data
        if (!name || !email || !message) {
            return res.json({ response: 'Name, email, and message are required' });
        }

        // Create new customer entry
        const cust = new Cust({
            name,
            email,
            phone,
            address: address || 'Not Provided',
            message,
            subject: subject || 'General Inquiry'
        });

        try {
            await cust.save(); // Save the customer data to MongoDB
            res.json({ response: 'User is saved successfully' });
        } catch (err) {
            console.error('Error saving customer:', err);
            res.status(500).json({ response: 'Error saving customer data' });
        }
    });


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

