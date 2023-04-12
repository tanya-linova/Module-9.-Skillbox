
//Создаем заколовок
const gameTitle = (() => {
const title = document.createElement('h2');
title.classList.add('header')
title.textContent = 'Угадай пару';
return title
})();

const errorText = (() => {
const text = document.createElement('h3');
text.classList.add('error-text')
text.textContent = 'Чтобы начать игру введите четное количество карточек от 4 до 16';
return text
})();

const gameInput = (() => {
  const input = document.createElement('input');
  input.type = 'number';
  input.classList.add('game-input');
  return input
})();

const inputButton = (() => {
  const inputBtn = document.createElement('button');
  inputBtn.classList.add('input-btn');
  inputBtn.textContent = 'Начать';
  return inputBtn
})();

  //создаем поле для игры
const playingField = (() => {
const field = document.createElement('ul');
field.classList.add('cards-group');
return field
})();

// создаем кнопку рестарт
  const restart = (() => {
  const restartBtn = document.createElement('button');
   restartBtn.classList = ('restart-btn');
   restartBtn.textContent = 'Начать заново';
   return restartBtn
})();

function choiseCount () {
  if(Number(gameInput.value) > 0) {
  couples = gameInput.value / 2;
  return couples
}
};
 //помещаем элементы на страницу при загрузке
 document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  container.append(gameTitle);
  container.append(errorText);
  container.append(gameInput);
  container.append(inputButton);

  inputButton.addEventListener('click', function getNewGame() {
    choiseCount ()
  if(gameInput.value < 4 || gameInput.value > 16 || gameInput.value % 2 !== 0){
  errorText.textContent = '';
  errorText.textContent  = 'Введите четное число больше 2, но меньше 16';
  gameInput.value = null;
  getNewGame()
 }
 else{
  container.append(playingField);
  container.append(restart);
  errorText.classList.add('invise');
  inputButton.classList.add('invise');
  gameInput.classList.add('invise');
 }


  function getCreateCards(){
  const getCouplesArrow = couples => {
    let couplesArrow = [];
    for (let i = 1; i <= couples; i++) {
    couplesArrow.push(i, i);
    };
    return couplesArrow;
  }

  // перемешиваем и возвращаем перемешанный массив
  const getMixedArrow = (couplesArrow) => {
   for( let i = couplesArrow.length - 1; i > 0; i--){
      const n = Math.floor(Math.random() * (i + 1));
      const temp = couplesArrow[i];
      couplesArrow[i] = couplesArrow[n];
      couplesArrow[n] = temp;
   }
    return couplesArrow
  }
  const mixedArrow = getCouplesArrow(couples)
  getMixedArrow(mixedArrow)

  //добавляем элементы списка
  mixedArrow.forEach((item) => {
    const card = document.createElement('li');
    card.classList.add('card');
    card.textContent = item;
    playingField.append(card);
  });

  let firstCard = null;
  let secondCard = null;
  let clickable = true;
//реализуем поведение карточек
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) =>
card.addEventListener('click', () => {
if(clickable == true && !card.classList.contains('card-success')){
  card.classList.add('card-open');

  if(firstCard == null){
    firstCard = index;
  } else {
    if(index != firstCard && secondCard == null) {
      secondCard = index;
      clickable = false;
    }
  }

  if(firstCard != null && secondCard != null && firstCard !== secondCard){
    if (cards[firstCard].textContent === cards[secondCard].textContent)
    {
      setTimeout(() => {
      cards[firstCard].classList.add('card-success');
      cards[secondCard].classList.add('card-success');

      firstCard = null;
      secondCard = null;
      clickable = true;
      }, 500);

      if((Array.from(cards).length == cards.length) && (Array.from(cards).every(( card => card.className.includes('card-open'))))){
        restart.classList.add('btn-visible');

    }
    } else {

      setTimeout(() => {
      cards[firstCard].classList.remove('card-open');
      cards[secondCard].classList.remove('card-open');

      firstCard = null;
      secondCard = null;
      clickable = true;

      }, 500);
  }
  }
}
}));
//});
};
getCreateCards();
})
restart.addEventListener('click', () =>  {
  playingField.innerHTML = '';
  inputButton.classList.remove('invise');
  gameInput.classList.remove('invise');
  errorText.classList.remove('invise');
  errorText.textContent = 'Чтобы начать игру введите любое четное число от 4 до 16';
  gameInput.value = null;
  restart.classList.remove('btn-visible')
});
 });


