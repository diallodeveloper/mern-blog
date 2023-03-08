const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
dotenv.config();


const PORT = process.env.PORT | 4000


// middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4000'
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
// app.use("/api/users", userRoute);

mongoose.connect(process.env.MONGO_URL,
    {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((e) => {
        console.log("Couldn't connect to MongoDB: " + e);
    })



// app.post('/register', async (req, res) => {
//     const {username, password} = req.body;
//     try {
//         const userDoc = await User.create({username, password})
//         res.json(userDoc)
//     } catch (e) {
//         res.status(400).json(e)
//     }
// })

app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
})