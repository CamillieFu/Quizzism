import { Buffer } from 'buffer'
import { nanoid } from 'nanoid'

// code for using API
    // const [gameTrivia, setGameTrivia] = React.useState(questionsArray())
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

    // React.useEffect(() => {
    //   fetch(`https://opentdb.com/api.php?amount=3&encode=base64`)
    //     .then((response) => response.json())
    //     .then((actualData) => setTrivia(actualData.results))
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // }, []);
    // console.log(trivia)
    // array with trivia objects which have array of answer objects
    // function questionsArray() {
    //   const allTrivia = []
    //   trivia.map((item) => {
    //     const answers = []
    //     const trueAnswer = { answer: Buffer.from(item.correct_answer, 'base64').toString(), selected: false, true: true}
    //     answers.push(trueAnswer);

    //     item.incorrect_answers.map((ans) => {
    //       const falseAnswer = {answer: Buffer.from(ans, 'base64').toString(), selected: false, true: false}
    //       return answers.push(falseAnswer);
    //     })

    //     const triviaItem = {
    //       question: Buffer.from(item.question, 'base64').toString(),
    //       id: nanoid(),
    //       answers: answers
    //     }
    //     allTrivia.push(triviaItem);
    //     console.log(allTrivia);
    //     return allTrivia[0];
    //   })
    // }
    // console.log("hello")
    // console.log(questionsArray())
    // need to update so that trivia is set in state
    // on click of trivia answer, state object of selected needs to be updated
    // const finalTriviaItems = questionsArray()
