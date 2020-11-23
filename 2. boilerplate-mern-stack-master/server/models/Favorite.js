const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favoriteSchema = mongoose.Schema({
    userFrom : {
        //ObjectId 하나를 가지고 User 정보를 가져올 수 있다 join 개념인 덧;
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime : {
        type: String
    }

}, { timestamps: true })
// 생성된 시간 자동으로 처리 timestamps

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }