const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const list = require('./code');
let users = []
let count = 0
let count2 = 0

player1 = {
    points: 1000,
    owned: [],
    chance: true
}

player2 = {
    points: 1000,
    owned: [],
    chance: false
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
    if(currentBlock.object.id===3 || currentBlock.object.id===4 || currentBlock.object.id===5){
        count = 1
    }
    if((currentBlock.object.id===0 || currentBlock.object.id===1 || currentBlock.object.id===2) && count===1){
        player1.points += 500
        count = 0
    }
    let title = list.blockWherePlayer1().object.title.substring(0,3);
    player1.chance = false
    player2.chance = true
    if(list.triggerQuiz1()){
        res.render('quiz', { p })
    }
    else if(currentBlock.object.title==='Power Up'){
        res.render('power', { p , list })
    }
    else if(currentBlock.object.id===14){
        res.send('tax')
    }
    else if(currentBlock.object.title==='Jail'){
        let canbail = true
        if(player1.points - currentBlock.object.fine < 0){
            canbail = false
        }
        res.render('jail', { currentBlock , p , canbail})
    }
    else{
        if(player1.owned.includes(currentBlock.object.title) === true)
            res.render('game', { list  , users , player1 , player2 , details , p })
        else if(player2.owned.includes(currentBlock.object.title) === false){
            let canBuy = true
            if(player1.points - currentBlock.object.price < 0){
                canBuy = false
            }
            res.render('purchase', { list , currentBlock , users, player1 , player2 , p , canBuy})
        }
        else{
            let canPay = true
            if(player1.points - currentBlock.object.rent < 0){
                canPay = false
            }
            res.render('mortage', { currentBlock , users , q , p , player1 , player2 , canPay })
        }
    }
})

app.get('/monopoly/2', (req,res) => {
    let die = Math.floor(Math.random()*3 + 1);
    const p = 2;
    const q = 0;
    list.rollPlayer2(die)
    currentBlock = list.blockWherePlayer2()
    if(currentBlock.object.id===3 || currentBlock.object.id===4 || currentBlock.object.id===5){
        count2 = 1
    }
    if((currentBlock.object.id===0 || currentBlock.object.id===1 || currentBlock.object.id===2) && count2===1){
        player2.points += 500
        count2 = 0
    }
    let title = list.blockWherePlayer2().object.title.substring(0,3);
    player2.chance = false
    player1.chance = true
    if(list.triggerQuiz2()){
        res.render('quiz', { p })
    }
    else if(currentBlock.object.title==='Power Up'){
        res.render('power', { p , list })
    }
    else if(currentBlock.object.title==='Jail'){
        let canbail = true
        if(player2.points - currentBlock.object.fine < 0){
            canbail = false
        }
        res.render('jail', { currentBlock , p , canbail})
    }
    else{
        if(player2.owned.includes(currentBlock.object.title) === true)
            res.render('game', { list  , users , player1 , player2 , details , p })
        else if(player1.owned.includes(currentBlock.object.title) === false){
            let canBuy = true
            if(player2.points - currentBlock.object.price < 0){
                canBuy = false
            }
            res.render('purchase', { list , currentBlock , users, player1 , player2 , p , canBuy })
        }
        else{
            let canPay = true
            if(player2.points - currentBlock.object.rent < 0){
                canPay = false
            }
            res.render('mortage', { currentBlock , users , q , p , player1 , player2 , canPay })
        }
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

app.post('/monopoly/1/:i', (req,res) => {
    let pay = 0
    let p = 1
    const { i } = req.params
    currentBlock = list.blockWherePlayer1()
    if(req.body.chosen===currentBlock.object.quiz[i].answer){
        pay = currentBlock.object.quiz[i].reward
        player1.points = player1.points + pay;
    }
    currentBlock.object.quiz.splice(i,1)
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.post('/monopoly/2/:i', (req,res) => {
    let pay = 0
    let p = 2
    const { i } = req.params
    currentBlock = list.blockWherePlayer2()
    if(req.body.chosen===currentBlock.object.quiz[i].answer){
        pay = currentBlock.object.quiz[i].reward
        player2.points = player2.points + pay;
    }   
    currentBlock.object.quiz.splice(i,1)
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.post('/monopoly/1/atlas/:ans', (req,res) => {
    const { ans } = req.params
    let pay = 0
    let p = 1
    currentBlock = list.blockWherePlayer1()
    if(req.body.atlasAns===ans){
        pay = currentBlock.object.reward
        player1.points = player1.points + pay
    }
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.post('/monopoly/2/atlas/:ans', (req,res) => {
    const { ans } = req.params
    let pay = 0
    let p = 2
    currentBlock = list.blockWherePlayer2()
    if(req.body.atlasAns===ans){
        pay = currentBlock.object.reward
        player2.points = player2.points + pay
    }
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.get('/monopoly/1/jail', (req,res) => {
    let p = 1
    currentBlock = list.blockWherePlayer1()
    let pay = parseInt(req.query.fine);
    player1.points = player1.points - pay
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.get('/monopoly/2/jail', (req,res) => {
    let p = 2
    currentBlock = list.blockWherePlayer2()
    let pay = parseInt(req.query.fine);
    player2.points = player2.points - pay
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.get('/monopoly/1/rent', (req,res) => {
    let p = 1
    currentBlock = list.blockWherePlayer1()
    let pay = parseInt(req.query.mortage);
    player1.points = player1.points - pay
    player2.points = player2.points + pay
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.get('/monopoly/2/rent', (req,res) => {
    let p = 2
    currentBlock = list.blockWherePlayer2()
    let pay = parseInt(req.query.mortage);
    player2.points = player2.points - pay
    player1.points = player1.points + pay
    res.render('game', { list , currentBlock , users , player1 , player2 , p })
})

app.get('/monopoly/1/card', (req,res) => {
    let p = 1;
    if(req.query.whereTo){
        currentBlock = list.blockWherePlayer1()
        currentBlock.object.isPlayer1 = false;
        list.teleport1(req.query.whereTo).object.isPlayer1 = true;
        currentBlock = list.blockWherePlayer1()
        if(list.triggerQuiz1()){
            res.render('quiz', { p })
        }
        else if(currentBlock.object.title==='Power Up'){
            res.render('power', { p , list })
        }
        else if(currentBlock.object.title==='Jail'){
            let canbail = true
            if(player1.points - currentBlock.object.fine < 0){
                canbail = false
            }
            res.render('jail', { currentBlock , p , canbail})
        }
        else{
            if(player1.owned.includes(currentBlock.object.title) === true)
                res.render('game', { list  , users , player1 , player2 , details , p })
            else if(player2.owned.includes(currentBlock.object.title) === false){
                let canBuy = true
                if(player1.points - currentBlock.object.price < 0){
                    canBuy = false
                }
                res.render('purchase', { list , currentBlock , users, player1 , player2 , p , canBuy})
            }
            else{
                let canPay = true
                if(player1.points - currentBlock.object.rent < 0){
                    canPay = false
                }
                res.render('mortage', { currentBlock , users , q , p , player1 , player2 , canPay })
            }
        }
    }
    else if(req.query.decision){
        if(req.query.decision === 'agree'){
            p = 2;
            currentBlock = list.blockWherePlayer2()
            currentBlock.object.isPlayer2 = false;
            list.toJail().object.isPlayer2 = true;
            res.render('jail', { p });
        }
        else{
            res.render('game', { list , users , player1 , player2 , p })
        }
    }
})

app.get('/monopoly/2/card', (req,res) => {
    let p = 2;
    if(req.query.whereTo){
        currentBlock = list.blockWherePlayer2()
        currentBlock.object.isPlayer2 = false;
        list.teleport1(req.query.whereTo).object.isPlayer2 = true;
        currentBlock = list.blockWherePlayer2()
        if(list.triggerQuiz2()){
            res.render('quiz', { p })
        }
        else if(currentBlock.object.title==='Power Up'){
            res.render('power', { p , list })
        }
        else if(currentBlock.object.title==='Jail'){
            let canbail = true
            if(player1.points - currentBlock.object.fine < 0){
                canbail = false
            }
            res.render('jail', { currentBlock , p , canbail})
        }
        else{
            if(player2.owned.includes(currentBlock.object.title) === true)
                res.render('game', { list  , users , player1 , player2 , details , p })
            else if(player1.owned.includes(currentBlock.object.title) === false){
                let canBuy = true
                if(player2.points - currentBlock.object.price < 0){
                    canBuy = false
                }
                res.render('purchase', { list , currentBlock , users, player1 , player2 , p , canBuy})
            }
            else{
                let canPay = true
                if(player2.points - currentBlock.object.rent < 0){
                    canPay = false
                }
                res.render('mortage', { currentBlock , users , q , p , player1 , player2 , canPay })
            }
        }
    }
    else if(req.query.decision){
        if(req.query.decision === 'agree'){
            p = 1;
            currentBlock = list.blockWherePlayer1()
            currentBlock.object.isPlayer1 = false;
            list.toJail().object.isPlayer1 = true;
            res.render('jail', { p });
        }
        else{
            res.render('game', { list , users , player1 , player2 , p })
        }
    }
})

app.get('/monopoly/1/sell/:place', (req,res) => {
    let p = 1
    land = list.teleport1(req.query.toSell)
    let pay = land.object.price
    player1.points = player1.points + pay
    for (let i=0;i<player1.owned.length;i++) {
        if (player1.owned[i] === req.query.toSell) {
            player1.owned.splice(i,1);
        }
    }
    currentBlock = list.blockWherePlayer1()
    currentBlock.object.isPlayer1 = false;
    currentBlock = list.teleport1(req.params.place)
    currentBlock.object.isPlayer1 = true;
    let canBuy = true
    if(player1.points - currentBlock.object.price < 0){
        canBuy = false
    }
    res.render('purchase', { list , currentBlock , users, player1 , player2 , p , canBuy})
})

app.get('/monopoly/2/sell', (req,res) => {
    let p = 2
    land = list.teleport1(req.query.toSell)
    let pay = land.object.price
    player2.points = player2.points + pay
    for (let i=0;i<player2.owned.length;i++) {
        if (player2.owned[i] === req.query.toSell) {
            player2.owned.splice(i,1);
        }
    }
    currentBlock = list.blockWherePlayer2()
    currentBlock.object.isPlayer2 = false;
    currentBlock = list.teleport1(req.params.place)
    currentBlock.object.isPlayer2 = true;
    let canBuy = true
    if(player2.points - currentBlock.object.price < 0){
        canBuy = false
    }
    res.render('purchase', { list , currentBlock , users, player1 , player2 , p , canBuy})
})

app.listen(1286, () =>{
    console.log('Listening at Port 1286')
})