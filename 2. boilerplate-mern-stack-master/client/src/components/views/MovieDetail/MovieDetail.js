import React, { useEffect, useState } from 'react'
import { API_URL,API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import { Row } from 'antd';

function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    //dom이 로드가 되면 동작이 되는 과정을 useEffect를 사용한다.
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
       
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })
    
    
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }


    return (
        <div>
            
            {/* Header */}

            <MainImage
                 image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                 title={Movie.original_title}
                 text={Movie.overview} 
            />


            {/* Body */}
            <div style={{ width: '85%' , margin: '1rem auth'}}>

                {/* Movie Info */}

            <MovieInfo
                movie={Movie}
            />

                <br />

                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>


            {ActorToggle && 
                <Row gutter={[16, 16]}>

                {/* map 형태로 key값을 가져온다 */}
                {Casts && Casts.map((cast, index) => (
                    // React.Fragment 옆에 key값을 붙여줘야 err를 잡아준다.
                    <React.Fragment key={index}>
                        <GridCards 
                            image={cast.profile_path ?
                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                          
                            characterName={cast.name}
                        />                    
                    </React.Fragment>
                ))}
            </Row>
            
            
            }
                

            </div>

        </div>
    )
}

export default MovieDetail
