import React from 'react'
import './MainBlock.scss';
import { useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

const goToVoc = require('../../../../assets/images/btn_goToVoc.png')

function MainBlock(props) {
    const { history, location, match } = useReactRouter();

    const user = useSelector(state => state.user)

    const goToVoCHandler = () => {
        if (user.userData && user.userData.isAuth) {
            history.push('/posts')
        }
        else {
            history.push('/login')
        }
    }

    return (
        <div className="container">
            <div className="container__item landing-page-container">
                <div className="content__wrapper">
                    {/* <p className="coords">{user.userData && user.userData.isAuth ?
                        <span>Hello, {user.userData.name} </span> : `N 49° 16' 35.173"  /  W 0° 42' 11.30"`
                    }</p> */}
                    <div className="ellipses-container">
                        <h2 className="greeting">Welcome </h2>
                        <h2 className="greeting-1">to</h2>
                        <h2 className="greeting-2">UC VOC</h2>
                        <div className="ellipses ellipses__outer--thin">
                            <div className="ellipses ellipses__orbit"></div>
                        </div>
                        <div className="ellipses ellipses__outer--thick"></div>
                    </div>

                    {/* <div className="scroller">
                        <p className="page-title">home</p>

                        <div className="timeline">
                            <span className="timeline__unit"></span>
                            <span className="timeline__unit timeline__unit--active"></span>
                            <span className="timeline__unit"></span>
                        </div>
                    </div> */}
                    <img
                        onClick={goToVoCHandler}
                        src={goToVoc}
                        alt="goToVocBtn"
                        style={{ float: 'right', marginTop: '130px', cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default MainBlock
