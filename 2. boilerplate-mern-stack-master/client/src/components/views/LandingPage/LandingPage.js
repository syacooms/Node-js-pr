import React, { useEffect,useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards'
import { Row } from 'antd';

function LandingPage() {


    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint);

    }, [])

    const fetchMovies = (endpoint) => {
        //영화들을 가져오는 fetch
        fetch(endpoint)
        // result
        .then(response => response.json())
        .then(response => {

            console.log(response)
            //es6 문법 spread Operater 원소들을 나열한다. 1,2,3 + ...(1,2,3)
            //지금 같은 경우는 page 1 + fetchMovies(endpoint) => 2 + 3 + 4 버튼 클릭 시 나열
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        });
    }

    const loadMoreItems = () => {
        
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`

        fetchMovies(endpoint);
    }

    return (
        <>
        <div style={{ width: '100%', margin: '0'}}>
            
            {/* Main Image */}

            {/* backdroppath를 가져오기전에 렌더링을 했다.
             && 표현 조건부 렌더링으로서 렌더링 중에 값이 있으면 가져온다!! */}
        {MainMovieImage &&
            <MainImage 
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview} 
            />
        }
            
            <div style={{width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
            <Row gutter={[16, 16]}>

            {/* map 형태로 key값을 가져온다 */}
            {Movies && Movies.map((movie, index) => (
                // React.Fragment 옆에 key값을 붙여줘야 err를 잡아준다.
                <React.Fragment key={index}>
                    <GridCards 
                        image={movie.poster_path ?
                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                        movieId={movie.id}
                        movieName={movie.original_title}
                    />                    

                </React.Fragment>
            ))}

            

            </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>


        </div>

        </>
    )
}

export default LandingPage
