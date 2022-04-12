window.addEventListener('DOMContentLoaded', () => {

  let inputCard = document.getElementById('inputCard'),
  inputDate = document.getElementById('inputDate'),
  inputCode = document.getElementById('inputCode'),
  maskNumber = '####-####-####-####',
  maskDate = '##/##',
  maskCode = '###';

  let current = "";
  let cardNumber = [];
  let cardDate = [];
  let cardCode = [];

  inputCard.addEventListener('keydown', e => {

    if(e.key === 'Tab'){
      return;
    }

    e.preventDefault();
    handleInput(maskNumber, e.key, cardNumber);
    inputCard.value = cardNumber.join("");
  })

  inputDate.addEventListener('keydown', e => {

    if(e.key === 'Tab'){
      return;
    }

    e.preventDefault();
    handleInput(maskDate, e.key, cardDate);
    inputDate.value = cardDate.join("");
  })

  inputCode.addEventListener('keydown', e => {

    if(e.key === 'Tab'){
      return;
    }

    e.preventDefault();
    handleInput(maskCode, e.key, cardCode);
    inputCode.value = cardCode.join("");
  })


  function handleInput(mask, key, arr){
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if(key === 'Backspace' && arr.length > 0){
      arr.pop();
      return
    }

    if(numbers.includes(key) && arr.length + 1 <= mask.length){
      if(mask[arr.length] === '-' || mask[arr.length] === '/'){
        arr.push(mask[arr.length], key);
      }else{
        arr.push(key);
      }
    }

  }


})