window.addEventListener('DOMContentLoaded', () => {

  let form = document.querySelector('form'),
  containerTask = document.querySelector('.container__tasks'),
  timeDiv = document.querySelector('.time'),
  subtitle = document.querySelector('.subtitle'),
  timeFuture = 25 * 60,
  timer = 0,
  timerBreak = 0;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = e.target.querySelector('input').value.trim();

    if(input.length <= 3){
      return alert('Ingresar mas de 3 caracteres');
    }

    const divElement = document.createElement('div'),
    buttonElement = document.createElement('button'),
    pElement = document.createElement('p');

    divElement.classList.add('task');
    buttonElement.innerHTML = 'Start';
    pElement.textContent = input;

    divElement.appendChild(buttonElement);
    divElement.appendChild(pElement);
    containerTask.appendChild(divElement);
    e.target.querySelector('input').value = '';

    buttonElement.addEventListener('click', buttonStart)
  })

  const buttonStart = (e) => {

    clearInterval(timerBreak);

    const buttons = containerTask.querySelectorAll('button');
    let flag = true;

    buttons.forEach(btn => {
      if(btn.textContent === 'in Progress...'){
        alert('Tienes que esperar que termine la tarea en cola');
        flag = false;
        btn.removeEventListener('click', buttonStart);
      }
    })

    if(flag){
      timeFuture = 25 * 60;
      e.target.innerHTML = 'in Progress...';
      subtitle.classList.add('active');
      subtitle.textContent = 'Terminar codigo';
      renderTime();
      timer = setInterval(() => {
        timeHandler();
      }, 1000);
    }

  }

  function timeHandler(){
    timeFuture--;
    renderTime();

    if(timeFuture === 0){
      clearInterval(timer);
      timeFuture = 5 * 60;
      alert('Terminaste la tarea');
      const buttons = containerTask.querySelectorAll('button');
      buttons.forEach(btn => {

        if(btn.textContent === 'in Progress...'){
          btn.classList.add('done');
          btn.textContent = 'Done';
        }

      })
      timerBreak = setInterval(() => {
        breakHander();
      }, 1000);
    }

  }

  function breakHander(){
    timeFuture--;
    renderTime();
    subtitle.textContent = 'Break...';

    if(timeFuture === 0){
      clearInterval(timerBreak);
      alert('Se termino el descanso puedes iniciar otra tarea');
    }
  }

  function renderTime(){
    const minutes = parseInt(timeFuture / 60);
    const seconds = parseInt(timeFuture % 60);
    timeDiv.textContent = `${minutes < 10 ? '0': ''}${minutes}:${seconds < 10 ? '0': ''}${seconds}`;
  }

})