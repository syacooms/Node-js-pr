//express model을 가져온다.
const express = require('express')
//function을 이용해서 app을 만든다.
const app = express()
// 포트번호
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
//바디파서 클라이언트에서 가져올 수 있게 분석..
app.use(bodyParser.urlencoded({extended: true}));

//application/json 
//json타입을 가져올 수 있게 분석..
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


//root dir에 오면 hello world 출력
app.get('/', (req, res) => res.send('Hello World 메리 크리스마스'))


app.post('/register', (req, res) => {

    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    //req.body는 bodyParser가 있기때문에 가능.
    const user = new User(req.body)

    //정보들이 user model에 저장
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        //status 200 성공했다 라는 뜻
        return res.status(200).json({
            success: true
        })
    })
})


//port 5000번에서 실행한다.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))