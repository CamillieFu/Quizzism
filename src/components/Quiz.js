import { nanoid } from 'nanoid'
import React from 'react'
import greenBlob from '../images/blob_green.png'
import greyBlob from '../images/blob_grey.png'
import { Buffer } from 'buffer'

export default function Quiz() {
    const [trivia, setTrivia] = React.useState([])
    // const [gameTrivia, setGameTrivia] = React.useState([])
    // const [selected, setSelected] = React.useState(false)

    // get trivia from API
    // React.useEffect(() => {
    //     async function getData() {
    //         const response = await fetch(
    //         `https://opentdb.com/api.php?amount=3&encode=base64`
    //         )
    //         let actualData = await response.json();
    //         setTrivia(actualData.results);
    //     }
    //     getData()
    // }, [])

    React.useEffect(() => {
      console.log("operative")
      fetch(`https://opentdb.com/api.php?amount=3&encode=base64`)
        .then((response) => response.json())
        .then((actualData) => setTrivia(actualData.results))
        .catch((err) => {
          console.log(err.message);
        });
    }, []);

    // array with trivia objects which have array of answer objects
    const allTrivia = []
    const questionsArray = trivia.map((item) => {
      const answers = []
      const trueAnswer = { answer: Buffer.from(item.correct_answer, 'base64').toString(), selected: false, true: true}
      answers.push(trueAnswer)

      item.incorrect_answers.map((ans) => {
        const falseAnswer = {answer: Buffer.from(ans, 'base64').toString(), selected: false, true: false}
        return answers.push(falseAnswer)
      })

      const triviaItem = {
        question: Buffer.from(item.question, 'base64').toString(),
        id: nanoid(),
        answers: answers
      }
      allTrivia.push(triviaItem)
      return allTrivia
    })

    const finalTriviaItems = questionsArray[0]
    console.log("questions array final")
    console.log(finalTriviaItems)

    const triviaElements = finalTriviaItems.map((item) => (
      <>
        <h4>{item.question}</h4>
        <div className="answer-div">
          {item.answers.map((answer) => {
            return(
              <li className="trivia-answer">{answer.answer}</li>
            )
          })

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
