import React from 'react'
import bigCircle from '../images/ellipses_big.png'
import smallCircle from '../images/ellipses_small.png'
import purpleCircle from '../images/ellipse_purp.png'

import Quiz from './Quiz'

export default function Main() {
    const [play, setPlay] = React.useState(false)

    function handleClick() {
        setPlay(true);
    }

    function Homescreen() {
        return(
            <>
              <img src={bigCircle} className="big-grey-circle" alt="circle" />
              <img src={smallCircle} className="big-grey-circle" alt="circle" />
              <img src={purpleCircle} className="big-purple-circle" alt="circle" />
                <div className="main-container">
                    <button className="start-button" onClick={handleClick}>Start Quiz</button>
                </div>
            </>
        )
    }

    return (
        <>
            {
                play ? <Quiz /> : <Homescreen />
            }
        </>
    )
}
