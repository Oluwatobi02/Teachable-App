const PORT = 8000
const express = require('express')

const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()
const bcrypt = require('bcrypt')
const uri = process.env.URI
const app = express()



app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.json('Hello to my app')
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }
        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 600 * 2400,
        })
        res.status(201).json({ token, userId: generatedUserId })
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }

})


app.post('/login', async (req,res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body


    try {
        
        await client.connect()
        
        const database = client.db('app-data')

        const users = database.collection('users')

        const user = await users.findOne({ email })

       const correctPassword =  await bcrypt.compare(password, user.hashed_password)
        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 600 * 2400
            })
            res.status(201).json({ token, userId: user.user_id })
        }
        res.status(400).json('Invalid Credentials')
    
    } catch (err) {
        console.log(err)
    } finally {
        client.close()
    }
})



app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {

        await client.connect() 
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)
        res.send(user)
    
    } finally {
        await client.close()
    }
})



app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)

     try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const pipeline = 
        [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ]
        const foundUsers = await users.aggregate(pipeline).toArray()
        res.json(foundUsers)

     } finally {
        await client.close()
     }
})


app.get('/skillfiltered-users', async (req, res) => {
    const client = new MongoClient(uri)
    const subject = req.query.subject

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { skill: { $eq : subject } }
        const foundUsers = await users.find(query).toArray()

        res.send(foundUsers)
    } finally {
        await client.close()
    }

})

app.get('/all-users', async (req,res) => {
    const client = new MongoClient(uri)
    const dob_year = req.query.dob_year

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { dob_year: { $eq : dob_year } }
        const foundUsers = await users.find(query).toArray()

        res.send(foundUsers)
    } finally {
        await client.close()
    }
})




app.put('/user', async ( req, res ) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData

    

    try {
        await client.connect() 
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: formData.user_id}
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                is_tutor: formData.is_tutor,
                classification: formData.classification,
                url: formData.url,
                about: formData.about,
                major: formData.major,
                skill: formData.skill,
                learning_style: formData.learning_style,
                subject: formData.subject,
                matches: formData.matches
            },
        }

       const insertedUser = await users.updateOne(query, updateDocument)
       res.json(insertedUser)
       
    } finally {
        await client.close()
    }
})



app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const updateDocument = {
            $push: { matches: { user_id: matchedUserId }}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})






app.get('/messages', async(req,res) => {
    const client = new MongoClient(uri)
    const { userId, correspondingUserId } = req.query

 try {
    const database = client.db('app-data')
    const messages = database.collection('messages')

    const query = {
        from_userId: userId, to_userId: correspondingUserId
    }
    const foundMessages = await messages.find(query).toArray()
    res.send(foundMessages)
 } finally {
    await client.close()
 }
})





app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message


    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
        } finally {
            await client.close()
        }
})


































app.listen(PORT, () => console.log('Server running on PORT ' + PORT))