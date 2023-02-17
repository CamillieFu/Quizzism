import React from 'react'
import greenBlob from '../images/blob_green.png'
import greyBlob from '../images/blob_grey.png'
import data from '../data'

export default function Quiz() {
    const [trivia, setTrivia] = React.useState(data)

    function handleClick(id) {
      const newTriv = trivia
      const array = newTriv.map((item) => {
        const answers = item.answers.map((ans) => {
          return {
            answer: ans.answer,
            selected: ans.id === id ? true : false,
            id: ans.id,
            true: ans.true
          }
        })
        const newItem = {question: item.question,id: item.id, answers: answers }
        return newItem
      }
        )
        setTrivia(array)
    }

    const triviaElements = trivia.map((item) => (
      <>
        <h4 key={item.id}>{item.question}</h4>
        <div className="answer-div">
          {item.answers.map((answer) => {
            return(
              <li
                className={answer.selected ? "selected-answer trivia-answer" : "trivia-answer"}
                key={answer.id}
                onClick={() => handleClick(answer.id)}
              >
                  {answer.answer}
              </li>
            )})
          }
        </div>
      </>
    ))

    return (
        <>
          <img src={greenBlob} className="green-blob" alt="green blob"/>
          <img src={greyBlob} className="grey-blob" alt="grey blob"/>
          <div className="quiz-container">
            <ul>{triviaElements}</ul>
            <button className="submit-button">Check Answers</button>
          </div>
        </>
    )
}
