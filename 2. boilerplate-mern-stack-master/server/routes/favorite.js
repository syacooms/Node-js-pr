const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')


//=================================
//             favorite
//=================================

router.post('/favoriteNumber', (req,res) => {

    //mongoDB에서 favorite 숫자를 가져오기
    //여기서 body는 bodyParser를 이용해서 front에서 받아올 수 있따.
    Favorite.find({ "movieId": req.body.movieId })
    .exec(( err,info ) => {
        if(err) return res.status(400).send(err)
    // 그 다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json({ success:true, favoriteNumber: info.length })
        
    })
})


router.post('/favorited', (req,res) => {


    //내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기.


    //mongoDB에서 favorite 숫자를 가져오기
    //여기서 body는 bodyParser를 이용해서 front에서 받아올 수 있따.
    Favorite.find({ "movieId": req.body.movieId , "userFrom": req.body.userFrom})
    .exec(( err,info ) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(info.length !== 0){
            result = true
        }

    // 그 다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json({ success:true, favorited: result })
        
    })
})


router.post('/removeFromFavorite', (req,res) => {

    //조건에 따라 지운다
    Favorite.findOneAndDelete({ movieId: req.body.movieId , userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })
    
})


router.post('/addToFavorite', (req,res) => {

    const favorite = new Favorite(req.body)

    // favorite document에 저장
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})

router.post('/getFavoritedMovie', (req,res) => {

    Favorite.find({ 'userFrom': req.body.userFrom })
    .exec((err,favorites) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success:true , favorites })
    })

})

module.exports = router;
