//express model을 가져온다.
const express = require('express')
//function을 이용해서 app을 만든다.
const app = express()
// 포트번호
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb://syacooms:syacooms@clusterdb-shard-00-00.wnbeo.mongodb.net:27017,clusterdb-shard-00-01.wnbeo.mongodb.net:27017,clusterdb-shard-00-02.wnbeo.mongodb.net:27017/test?ssl=true&replicaSet=atlas-1fkhx4-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


//root dir에 오면 hello world 출력
app.get('/', (req, res) => res.send('Hello World'))

//port 5000번에서 실행한다.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))