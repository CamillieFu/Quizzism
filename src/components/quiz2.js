import React, { useState, useEffect } from 'react'

export default function Question() {
const [options, setOptions] = useState(null);
console.log('hello')
  useEffect(() => {
    const apiUrl = `https://opentdb.com/api.php?amount=3&encode=base64`;
    fetch(apiUrl)
          .then((res) => res.json())
          .then((response) => {
            setOptions(response.results);
          });
      }, [setOptions]);
    console.log(options)
}
