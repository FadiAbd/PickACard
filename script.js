// The DOMContentLoaded event listener waits for the DOM to be fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', () => {
  const drawCardButton = document.getElementById('drawCardButton');
  drawCardButton.addEventListener('click', fetchCard);
});

// The fetchCard async function sends a GET request to the Deck of Cards API endpoint
//(https://deckofcardsapi.com/api/deck/new/draw/?count=1) to draw one card.
async function fetchCard() {
  const apiUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
      const card = data.cards[0];
      displayCard(card);
    } else {
      console.error('Failed to draw card', data.error);
    }
  } catch (error) {
    console.error('Failed fetching card', error);
  }
}

// the displayCard function is called to update the HTML content dynamically
function displayCard(card) {
  const cardImageContainer = document.getElementById('cardImage');
  cardImageContainer.innerHTML = ''; // Clear previous card image

  const cardImg = document.createElement('img');
  cardImg.src = card.image;
  cardImg.alt = `${card.value} of ${card.suit}`;

  const cardInfo = document.createElement('div');
  cardInfo.textContent = `${card.value} of ${card.suit}`;
  cardInfo.classList.add('card-info');

  cardImageContainer.appendChild(cardImg);
  cardImageContainer.appendChild(cardInfo);
}
