import React from 'react'
import background from '../images/blue_background.jpg'
import Quiz from './Quiz'

export default function Main() {
    const [play, setPlay] = React.useState(false)

    function handleClick() {
        setPlay(true);
    }

    function Homescreen() {
        return(
            <>
                <div className="main-container" style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
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
