import React, { useEffect,useState } from 'react'
import Axios from 'axios'



function Favorite( props ) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)


    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {

        
        
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                console.log(response.data)
                setFavoriteNumber(response.data.favoriteNumber)
                if(response.data.success) {
                } else {
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })
        
        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            setFavorited(response.data.favorited)
            if(response.data.success) {
                console.log('favorited',response.data)
            } else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })

    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                    }
            })

        }
    }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
