import React,{ useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'


function LandingPage( props ) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, []);

    const onclickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response => {
            if(response.data.success) {
                //history -> withRouter react-dom import해야 사용 가능
                props.history.push("/login")
            } else {
                alert('로그아웃 실패했습니다.')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems:'center'
            ,width: '100%', height:'100vh'} }>
            <h2>시작 페이지</h2>

            <button onClick={onclickHandler}>
                로그아웃
            </button>

        </div>
    )
}

export default withRouter(LandingPage)
