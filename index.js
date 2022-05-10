const express = require('express')
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());

// middle-tier
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized' })
    }

    const token = authHeader.split(' ')[1];
    // console.log(token);

    jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
        if (error) {
            return res.status(403).send({ message: 'forbidden' })
        }

        req.decoded = decoded;
        next();
    })

    // console.log('Inside', authHeader);
};

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', (req, res) => {
    const user = req.body;
    // console.log(user);

    /**
     * DANGER: do not check password here for large application
     * USE: proper process for HASHING & CHECKING
     * After completing all authentication related verification, issue JWT token
    */

    // approach a random email
    if (user.password === '123456') {
        const accessToken = jwt.sign(
            { email: user.email, },
            process.env.PRIVATE_KEY,
            { expiresIn: '1h' }
        );
        res.send({
            accessToken: accessToken,
            success: true
        });
    } else {
        res.send({
            success: false
        });
    }
})

app.get('/order', verifyJWT, (req, res) => {
    res.send([
        {
            "id": 1,
            "name": "Colly Paynter",
            "gender": "Female"
        }, {
            "id": 2,
            "name": "Vikky Baxendale",
            "gender": "Female"
        }, {
            "id": 3,
            "name": "Annora Smaridge",
            "gender": "Female"
        }, {
            "id": 4,
            "name": "Vittorio Trudgian",
            "gender": "Male"
        }, {
            "id": 5,
            "name": "Harley Davidovits",
            "gender": "Female"
        }, {
            "id": 6,
            "name": "Nertie Tewkesberry",
            "gender": "Female"
        }, {
            "id": 7,
            "name": "Kassandra Regglar",
            "gender": "Female"
        }, {
            "id": 8,
            "name": "Briggs Elverston",
            "gender": "Male"
        }, {
            "id": 9,
            "name": "Tammy Cogger",
            "gender": "Female"
        }, {
            "id": 10,
            "name": "Orland Gunnell",
            "gender": "Male"
        }
    ]);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
