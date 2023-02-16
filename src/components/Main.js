import React from 'react'
import greenBlob from '../images/blob_green.png'
import greyBlob from '../images/blob_grey.png'
import Quiz from './Quiz'

export default function Main() {
    const [play, setPlay] = React.useState(false)

    function handleClick() {
        setPlay(true);
    }

    function Homescreen() {
        return(
            <>
                <img src={greenBlob} className="green-blob"/>
                <img src={greyBlob} className="grey-blob"/>
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
