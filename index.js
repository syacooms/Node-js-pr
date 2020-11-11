//express model을 가져온다.
const express = require('express')
//function을 이용해서 app을 만든다.
const app = express()
// 포트번호
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

//application/x-www-form-urlencoded
//바디파서 클라이언트에서 가져올 수 있게 분석..
app.use(bodyParser.urlencoded({extended: true}));

//application/json 
//json타입을 가져올 수 있게 분석..
app.use(bodyParser.json());
//cookie-parser
//token을 저장하기 위한 공간으로 쿠키를 선택함.
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


//root dir에 오면 hello world 출력
app.get('/', (req, res) => res.send('Hello World 메리 크리스마스'))


app.post('/api/users/register', (req, res) => {

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

app.post('/api/users/login', (req,res) => {

    
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword( req.body.password , (err, isMatch ) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            
            // 비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                // 토큰을 저장한다. 어디에 ? 쿠키 , 로컬스토리지 -> 쿠키에 저장하기(install cookieParser)
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user.id })
                

            })
        })
    })
})

// role 1 어드민 role 2 특정 부서 어드민
// role 0 -> 일반유저 role 0이 아니면 관리자 (현재 적용)

//Router <- Express (나중에 정리)
//middleware -> auth 콜백 중간에 재생
app.post('/api/users/auth', auth ,(req,res) => {

    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image

    })
})

app.get('/api/users/logout', auth, (req , res) => {

    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if(err) return res.json({ success: false , err});
            return res.status(200).send({
                success: true
            })
        })
})


//port 5000번에서 실행한다.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))