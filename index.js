const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const list = require('./code');
let users = []

player1 = {
    points: 1000,
    owned: []
}

player2 = {
    points: 1000,
    owned: []
}

app.use(express.urlencoded({extended: true}));

app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/', (req,res) => {
    res.render('home')
})

app.get('/monopoly/1', (req,res) => {
    let die = Math.floor(Math.random()*3 + 1);
    const p = 1;
    const q = 1;
    list.rollPlayer1(die)
    currentBlock = list.blockWherePlayer1()
    let title = list.blockWherePlayer1().object.title.substring(0,3);
    if(list.triggerQuiz1()){
        res.render('quiz', { p })
    }
    else if(currentBlock.object.title==='Power Up'){
        res.render('power')
    }
    else{
        if(player1.owned.includes(currentBlock.object.title) === true)
            console.log('hu')
        else if(player2.owned.includes(currentBlock.object.title) === false)
            res.render('purchase', { list , currentBlock , users, player1 , player2 , p })
        else
            res.render('mortage', { currentBlock , users , q , p , player1 , player2 })
    }
})

app.get('/monopoly/2', (req,res) => {
    let die = Math.floor(Math.random()*3 + 1);
    const p = 2;
    const q = 0;
    list.rollPlayer2(die)
    currentBlock = list.blockWherePlayer2()
    let title = list.blockWherePlayer2().object.title.substring(0,3);
    if(list.triggerQuiz2()){
        res.render('quiz', { p })
    }
    else if(currentBlock.object.title==='Power Up'){
        res.render('power')
    }
    else{
        if(player2.owned.includes(currentBlock.object.title) === true)
            console.log('hu')
        else if(player1.owned.includes(currentBlock.object.title) === false)
            res.render('purchase', { list , currentBlock , users, player1 , player2 , p })
        else
            res.render('mortage', { currentBlock , users , q , p , player1 , player2})
    }
})

app.post('/monopoly/1', (req,res) => {
    details = req.body
    const p = 1
    let pay = 0
    users.push(req.body.user1)
    users.push(req.body.user2)
    currentBlock = list.blockWherePlayer1()
    if(details.buy==='on'){
        pay = currentBlock.object.price;
        player1.owned.push(currentBlock.object.title);
    }
    player1.points = player1.points - pay;
    res.render('game', { list , currentBlock , users , player1 , player2 , details , p })
})

app.post('/monopoly/2', (req,res) => {
    details = req.body
    const p = 2
    let pay = 0
    users.push(req.body.user1)
    users.push(req.body.user2)
    currentBlock = list.blockWherePlayer2()
    if(details.buy==='on'){
        pay = currentBlock.object.price;
        player2.owned.push(currentBlock.object.title);
    }
    player2.points = player2.points - pay;
    res.render('game', { list , currentBlock , users , player1 , player2 , details , p })
})

app.post('/monopoly/1/:answer', (req,res) => {
    let pay = 0
    let p = 1
    const { answer } = req.params
    currentBlock = list.blockWherePlayer1()
    if(req.body.chosen===answer){
        pay = currentBlock.object.reward
        player1.points = player1.points + pay;
    }
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.post('/monopoly/2/:answer', (req,res) => {
    let pay = 0
    let p = 2
    const { answer } = req.params
    currentBlock = list.blockWherePlayer2()
    if(req.body.chosen===answer){
        pay = currentBlock.object.reward
        player2.points = player2.points + pay;
    }   
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.post('/monopoly/1/atlas/:ans', (req,res) => {
    res.send(req.body)
})

app.post('/monopoly/2/atlas/:ans', (req,res) => {
    res.send(req.body)
})

app.listen(1286, () =>{
    console.log('Listening at Port 1286')
})