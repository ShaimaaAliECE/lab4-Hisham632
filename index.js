const express = require('express');
const questions = require('./questions.json');
const app = express();
app.use(express.static('frontend'));



app.get('/questionsFile', function(req,res)
{
    let blankSheet = JSON.parse(JSON.stringify(questions));
    res.json(blankSheet); 
})

app.get('/solutions', function(req,res)
{

    let mark = "";

    let question = questions[req.query.ques];

    if(question.answerIndex ==  req.query.ans)
    {
        mark = "Correct! " + req.query.ques;
    }
    else
    {
        mark = "Incorrect! " + req.query.ques;
    }

    res.send(mark);
})
app.listen(80);