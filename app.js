const express = require('express')
const jsonData = require('./questions.json')
const jsonAnswers = require('./correctAnswers')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req,res) => {
    res.status(400).send(jsonData)
})

app.post('/', (req,res) => {
        const userAnswers = req.body
        const results = userAnswers.map(userAnswer => {
        const correctAnswer = jsonAnswers.find(answer => userAnswer.number === answer.number && userAnswer.topic === answer.topic)
        return userAnswer.answer === correctAnswer.answer
        ? ({
                number: userAnswer.number,
                correctAnswer: correctAnswer.answer,
                userAnswer: userAnswer.answer,
                isRight: true
            })
        : ({
                number: userAnswer.number,
                correctAnswer: correctAnswer.answer,
                userAnswer: userAnswer.answer,
                isRight: false
        })
    })
    res.status(400).send(results)
})

app.listen(8000, () => {
    console.log('Port running on port ' + 8000)
})