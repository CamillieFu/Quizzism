import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './components/Main'
import './App.css'

export default function App() {
  return (
    <>
      <Main />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
