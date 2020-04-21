var foods = document.querySelectorAll('.food__item');
var taglineText = 'Сказочное заморское яство';
var taglineHoverText = 'Котэ не одобряет?';
var descriptorText = 'Чего сидишь? Порадуй котэ, <a class="food__link" href="#">купи</a>.';
var descriptorsMap = {
  'с фуа-гра': 'Печень утки разварная с артишоками.',
  'с рыбой': 'Головы щучьи с чесноком да свежайшая сёмгушка.',
  'с курой': 'Филе из цыплят с трюфелями в бульоне.'
};

var onFoodCardMove = function (evt) {
  var tagline = this.querySelector('.food__tagline');
  tagline.innerText = (evt.type === 'mouseenter') ? taglineHoverText : taglineText;
}

var onFoodLinkPress = function (evt) {
  evt.preventDefault();

  var food = this.closest('.food__item');
  var card = food.querySelector('.food__card');
  var tagline = food.querySelector('.food__tagline');
  var taste = food.querySelector('.food__taste');
  var descriptor = food.querySelector('.food__descriptor');

  if (!food.classList.contains('food__item--selected')) {
    food.classList.add('food__item--selected');
    food.classList.add('hover-block');
    food.addEventListener('mouseleave', function () {
      food.classList.remove('hover-block');
    });
    food.querySelector('.food__link').removeEventListener('click', onFoodLinkPress);
    descriptor.innerText = descriptorsMap[taste.innerText];
    card.addEventListener('mouseenter', onFoodCardMove);
    card.addEventListener('mouseleave', onFoodCardMove);
  } else {
    food.classList.remove('food__item--selected');
    descriptor.innerHTML = descriptorText;
    food.querySelector('.food__link').addEventListener('click', onFoodLinkPress);
    tagline.innerText = taglineText;
    card.removeEventListener('mouseenter', onFoodCardMove);
    card.removeEventListener('mouseleave', onFoodCardMove);
  }
};

for (var i = 0; i < foods.length; i++) {
  var food = foods[i];
  var card = food.querySelector('.food__card');
  var taste = food.querySelector('.food__taste');
  var descriptor = food.querySelector('.food__descriptor');

  if (food.classList.contains('food__item--disabled')) {
    descriptor.innerText = 'Печалька, ' + taste.innerText + ' закончился';
    food.classList.remove('food__item--selected');
  } else {
    if (food.classList.contains('food__item--selected')) {
      descriptor.innerText = descriptorsMap[taste.innerText];
      card.addEventListener('mouseenter', onFoodCardMove);
      card.addEventListener('mouseleave', onFoodCardMove);
    } else {
      foods[i].querySelector('.food__link').addEventListener('click', onFoodLinkPress);
    }
    foods[i].querySelector('.food__card-link').addEventListener('click', onFoodLinkPress);
  }
};
