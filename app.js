const express = require('express');
const morgan =require('morgan')

const app = express();
const pony = express();

app.use(morgan('dev'));

app.get('/echo', (req,res) => {
  const responseText = `here are some details your request
  Base URL: ${req.baseUrl}
  Host: ${req.hostname}
  Path: ${req.path}`;
  res.send(responseText)
  ;
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
});

app.get('/sumRequest', (req, res) => {
  const valueA = parseInt(req.query.valueA);
  const valueB = parseInt(req.query.valueB);
  const valueC = valueA + valueB;

  const responseText = `The sum of ${valueA} plus ${valueB} equals ${valueC} `
  console.log(req.query);
  res.send(responseText);
});

app.get('/cipher', (req, res) => {
  const phrase = req.query.phrase;
  const phraseArray = phrase.split("");
  const shift = parseInt(req.query.shift);
  let array = [];
  console.log(phrase)
  function message(phrase, index, shift) {
    return (
    phrase.charCodeAt(index) + shift
    )
  }
  function returnedCipher(char) {
    return String.fromCharCode(char)
  }
  phraseArray.map((letter, index) => array = [...array, message(phrase, index, shift)]);
  console.log(array)

  let cipher =[];
  array.map((letter, index) => cipher = [...cipher, returnedCipher(array[index])]);
  const responseText = cipher.join("");
  console.log(cipher)
  res.send(responseText)
});

app.get('/lotto', (req, res) => {
  let numbers = req.query.arr
  numbers = numbers.map(number => parseInt(number))
  const winningNumbers = [null, null, null, null, null, null]
  winningNumbers.map((_, index) => winningNumbers[index] = Math.floor(Math.random() * 20))

  const matchingNumbers = []
  for (let i = 0; i < winningNumbers.length; i++) {
    const currentNumber = numbers.find(number => {
    return number === winningNumbers[i]
    })
    if (currentNumber !== undefined) {
      matchingNumbers.push(currentNumber)
    } 
  }

  function responseText(matchingNumbers) {
    if(matchingNumbers.length < 4) {
      return "Sorry, better luck next time"
    }
    if(matchingNumbers.length === 4) {
      return "You won a free ticket!"
    }
    if(matchingNumbers.length === 5 ) {
      return " You won $100 dollars"
    }
    if(matchingNumbers.length === 6 ) {
      return "You could have won the lotto"
    }
  }

  res.send(responseText(matchingNumbers))
})




