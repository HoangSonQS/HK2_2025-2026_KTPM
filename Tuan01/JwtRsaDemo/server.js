const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const app = express()
app.use(express.json())

const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
})

console.log('Create RSA Key success!');

app.post('/login', (req, res) => {
    const user = {id: 1, username: 'hoangson', role: 'admin'}

    const accessToken = jwt.sign(user, privateKey, {algorithm: 'RS256', expiresIn: '1h'})

    console.log('Login success\nToken: ', accessToken);
    

    res.json({accessToken})
})


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send("Missing Token!");

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send("Invalid token!");
    }
}


app.get('/my-profile', verifyToken, (req, res) => {
    console.log(req.user);
    
    res.json({
        message: "Successfully access!",
        userInfo: req.user
    });
});

app.listen(3000, () => console.log('Server is running http://localhost:3000'));
