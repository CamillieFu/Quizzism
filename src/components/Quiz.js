import React, { useState, useEffect } from 'react'
import data from '../data'
import { nanoid } from 'nanoid'
import { Buffer } from 'buffer'
import bigCircle from '../images/ellipses_big.png'
import smallCircle from '../images/ellipses_small.png'
import purpleCircle from '../images/ellipse_purp.png'


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

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

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

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
      return array;
    }
    function componentDidMount() {
      window.scrollTo(0, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        answers: shuffle(answers)
      }
    })
      setTrivia(shuffle(newArray))
      setOptions(options)
      setScore(0)
      setSubmit(false)
      componentDidMount()
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
        <h4 className="trivia-question"key={item.id}>{item.question}</h4>
        <div className="answer-div">
          {item.answers.map((answer) => {
            return(
              <li
                className={`trivia-answer ${answer.selected ? "selected-answer" : ""}
                ${submit && answer.selected && !answer.true ? "false-answer" : ""}`}
                key={answer.id}
                id={submit && answer.true ? "correct-answer" : ""}
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
        <div className="container">
          <img src={bigCircle} className="big-grey-circle" alt="circle" />
          <img src={smallCircle} className="big-grey-circle" alt="circle" />
          <img src={purpleCircle} className="big-purple-circle" alt="circle" />
          <div className="quiz-container">
            <span>{triviaElements}</span>
            <div className="submit-div">
              {submit && <p className="score-display">Your score is {score}/3</p>}
              <button
                className="submit-button"
                onClick={submit ? newQuestions : handleSubmit}
                >
                  {submit ? "Play Again" : "Check Answers"}
              </button>
            </div>
          </div>
        </div>
    )
}
