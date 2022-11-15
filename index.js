const express = require('express')
const app = express();
const path = require('path');
const list = require('./code');
let users = []

player1 = {
    points: 5000,
    owned: []
}

player2 = {
    points: 5000,
    owned: []
}

app.use(express.urlencoded({extended: true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/', (req,res) => {
    res.render('home')
})


app.post('/monopoly/1', (req,res) => {
    details = req.body
    const p = 1
    let pay = 0
    users.push(req.body.user1)
    users.push(req.body.user2)
    currentBlock = list.blockWherePlayer1()
    console.log(details)
    if(details.buy==='on'){
        pay = currentBlock.object.price;
        player1.owned.push(currentBlock.object.title);
    }
    player1.points = player1.points - pay;
    console.log(currentBlock.object.price)
    res.render('game', { list , currentBlock , users , player1 , player2 , details , p})
})

app.post('/monopoly/2', (req,res) => {
    details = req.body
    const p = 2
    let pay = 0
    users.push(req.body.user1)
    users.push(req.body.user2)
    currentBlock = list.blockWherePlayer2()
    console.log(details)
    if(details.buy==='on'){
        pay = currentBlock.object.price;
        player2.owned.push(currentBlock.object.title);
    }
    player2.points = player2.points - pay;
    console.log(currentBlock.object.price)
    res.render('game', { list , currentBlock , users , player1 , player2 , details , p})
})

app.get('/monopoly/1', (req,res) => {
    let die = Math.floor(Math.random()*3 + 1);
    const p = 1;
    list.rollPlayer1(die)
    currentBlock = list.blockWherePlayer1()
    let title = list.blockWherePlayer1().object.title.substring(0,3);
    console.log(die)
    console.log(`player 1 - ${title}`)
    if(list.triggerQuiz1()){
        res.render('quiz', { p })
    }
    else
        res.render('purchase', { list , currentBlock , users, player1 , player2 , p })
})

app.get('/monopoly/2', (req,res) => {
    let die = Math.floor(Math.random()*3 + 1);
    const p = 2;
    list.rollPlayer2(die)
    currentBlock = list.blockWherePlayer2()
    let title = list.blockWherePlayer2().object.title.substring(0,3);
    console.log(die)
    console.log(`player 2 - ${title}`)
    if(list.triggerQuiz2()){
        res.render('quiz', { p })
    }
    else
        res.render('purchase', { list , currentBlock , users, player1 , player2 , p})
})

app.post('/monopoly/1/:id', (req,res) => {
    let pay = 0
    const { id } = req.params
    currentBlock = list.blockWherePlayer1()
    if(req.body.chosen===currentBlock.object.quiz[id].answer){
        pay = currentBlock.object.reward
    }
    res.send(pay)
})

app.post('/monopoly/2/:id', (req,res) => {
    let pay = 0
    const { id } = req.params
    currentBlock = list.blockWherePlayer2()
    // if(req.body.chosen===currentBlock.object.quiz[id].answer){
    //     pay = currentBlock.object.reward
    //     res.send(pay)
    // }
    res.send(id)
    
})

app.get('/demo', (req,res) => {
    res.render('demo')
})

app.listen(1286, () =>{
    console.log('Listening at Port 1286')
})