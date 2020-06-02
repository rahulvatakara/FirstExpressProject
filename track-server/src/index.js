require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middleware/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
const mongoUri = 'mongodb+srv://admin:mongo123@ckr-2vvr5.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo');

});
mongoose.connection.on('error', err => {
    console.error('Error connecion', err);

});
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(5000, () => {
    console.log('Listening on port 5000')
});
