import React from 'react'
import greenBlob from '../images/blob_green.png'
import greyBlob from '../images/blob_grey.png'

export default function Quiz() {
    const [trivia, setTrivia] = React.useState([])
    const [selected, setSelected] = React.useState(false)
    console.log(trivia)
    // const [allTriviaQuestions, setAllTriviaQuestions] = React.useState([])

    React.useEffect(() => {
        async function getData() {
            const response = await fetch(
            `https://opentdb.com/api.php?amount=3&encode=base64`
            )
            let actualData = await response.json();
            setTrivia(actualData.results);
        }
        getData()
    }, [])

    function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
    const allTriviaQuestions = trivia.map((question) => {
            const allAnswers = []
            const triviaQuestion = atob(question.question)

            question.incorrect_answers.map((answer) => {
                allAnswers.push(atob(answer))
            })
            allAnswers.push(atob(question.correct_answer))
            shuffleArray(allAnswers)

            return (
                <>
                    <div className="trivia-item">
                        <h3 className="trivia-question">{triviaQuestion}</h3>
                        {allAnswers.map((answer) => {
                            return (
                                <li
                                className={selected ? "selected-answer trivia-answer" : "trivia-answer"}
                                onClick={() => setSelected((prev) => !prev)}
                                >
                                    {answer}
                                </li>
                            )
                        })}
                    </div>
                </>
            )
    })

    return (
        <>
            <img src={greenBlob} className="green-blob"/>
            <img src={greyBlob} className="grey-blob"/>
            <div className="quiz-container">
                <ul>{allTriviaQuestions}</ul>
                <button className="submit-button">Check Answers</button>
            </div>
        </>
    )
}
