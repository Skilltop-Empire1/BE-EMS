require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');


// const cookieParser = require('cookie-parser');
const cors = require('cors');

// const auth = require('./routes/auth');
const organization = require('./routes/organization')
// const staff = require('./routes/staff')

// const doctor = require('./routes/doctor');
// const nurse = require('./routes/nurse');
// const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(cors());

// Routes
app.use('/EMS/organization', organization)
// app.use('/api/v1', staff);
// app.use('/api/v1', auth);

// app.use('/api/v1', doctor);
// app.use('/api/v1', nurse);

// Sync database and start server
db.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
