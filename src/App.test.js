import '@testing-library/jest-dom'
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import App from '../src/App'

test('renders the App, shows the quiz', async () => {
  render(<App />)
  // click start quiz
  fireEvent.click(screen.getByText(/Start Quiz/i))
  const quiz = await screen.findByRole('button')
  // submit button is on page
  expect(quiz).toBeDefined()
})
