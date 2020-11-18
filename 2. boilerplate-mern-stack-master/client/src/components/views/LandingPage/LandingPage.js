import React, { useEffect,useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {


    const [Movies, setMovies] = useState([])
    const  [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        
        //영화들을 가져오는 fetch
        fetch(endpoint)
        // result
        .then(response => response.json())
        .then(response => {

            console.log(response)
            setMovies([...response.results])
            setMainMovieImage(response.results[0])
            console.log(response.results[0].backdrop_path)
        });
       
    }, [])

    return (
        <>
        <div style={{ width: '100%', margin: '0'}}>
            
            {/* Main Image */}

            {/* backdroppath를 가져오기전에 렌더링을 했다.
             && 표현은 값이 있으면 가져오라??  */}
        {MainMovieImage &&
            <MainImage 
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview} 
            />
        }
            
            <div style={{width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                {/* <img src='http://image.tmdb.org/t/p/w1280/gnf4Cb2rms69QbCnGFJyqwBWsxv.jpg' /> */}
                <hr />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button>Load More</button>
            </div>


        </div>

        </>
    )
}

export default LandingPage
