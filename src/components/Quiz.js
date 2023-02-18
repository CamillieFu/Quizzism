import React, { useState, useEffect } from 'react'
import greenBlob from '../images/blob_green.png'
import greyBlob from '../images/blob_grey.png'
import data from '../data'
import { nanoid } from 'nanoid'
import { Buffer } from 'buffer'


export default function Quiz() {
    const [options, setOptions] = useState(data);
    const [trivia, setTrivia] = React.useState(options)
    const [score, setScore] = React.useState(0)
    const [submit, setSubmit] = React.useState(false)

    useEffect(() => {
	    const apiUrl = `https://opentdb.com/api.php?amount=3&encode=base64`;

	    fetch(apiUrl)
	      .then((res) => res.json())
	      .then((response) => {
	        setOptions(response.results);
	      });
	  }, [newQuestions]);

    function handleClick(id) {
      const array = trivia.map((item) => {
        const answers = item.answers.map((ans) => {
          return {
            answer: ans.answer,
            selected: ans.id === id ? !ans.selected : ans.selected,
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

    function newQuestions() {
      const newArray = options.map((item) => {
      const answers = []
      const trueAnswer = { answer: Buffer.from(item.correct_answer, 'base64').toString(), selected: false, true: true, id: nanoid()}
      answers.push(trueAnswer);

      item.incorrect_answers.map((ans) => {
        const falseAnswer = {answer: Buffer.from(ans, 'base64').toString(), selected: false, true: false, id: nanoid()}
        return answers.push(falseAnswer);
      })

      return {
        question: Buffer.from(item.question, 'base64').toString(),
        id: nanoid(),
        answers: answers
      }
    })
      setTrivia(newArray)
      setOptions(options)
      setScore(0)
      setSubmit(false)
    }

    function handleSubmit() {
      let count = 0;
      trivia.map((item) => (
        item.answers.map((ans) => {
          return ans.selected && ans.true ? count++ :
          count
        })
      ))
        setScore(count);
        setSubmit(true);
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
            <button
              className="submit-button"
              onClick={submit ? newQuestions : handleSubmit}
              >
                {submit ? "Play Again" : "Check Answers"}
            </button>
            {/* <button onClick={newQuestions}>Play Again</button> */}
            {submit && <span>Your score is {score}/3</span>}
          </div>
        </>
    )
}
