class CardService {
  static updateCard(username: string, count: number, editName: (e: any) => void, deleteName: (e: any) => void): void {
    if(document.getElementById(username + '-card')) {
      document.getElementById(username + '-count').innerText = count.toString();
    } else {
      // Container Card
      const card = document.createElement('article');
      card.classList.add('uk-card', 'uk-card-default', 'uk-width-large', 'uk-margin', 'uk-padding', 'uk-padding-remove-top');
      card.id = username + '-card';
        // Card Body
        const body = document.createElement('div');
        body.classList.add('uk-card-body');
        card.appendChild(body);
          // Username Display
          const h3 = document.createElement('h3');
          h3.innerText = username;
          body.appendChild(h3);
          // Count Display
          const h1 = document.createElement('h1');
          h1.id = username + '-count';
          h1.innerText = count.toString();
          body.appendChild(h1);
        // Card Buttons
        const buttons = document.createElement('div');
        buttons.classList.add('uk-button-group', 'uk-margin-auto');
        card.appendChild(buttons);
          // Edit Username Button
          const edit = document.createElement('button');
          edit.classList.add('uk-button', 'uk-button-primary');
          edit.innerText = 'Edit Username';
          edit.addEventListener('click', editName);
          buttons.appendChild(edit);
          console.log(buttons);
          // Delete Username Button
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('uk-button', 'uk-button-danger');
          deleteButton.innerText = 'Delete Username';
          deleteButton.addEventListener('click', deleteName);
          buttons.appendChild(deleteButton);
          console.log(buttons)
      // Add Card to List
      const cards = document.getElementById('cards');
      // Extract Add Username Card
      const addCard = document.getElementById('addCard');
      // Remove Add Username Card
      addCard.remove();
      // Insert New Username Card
      cards.appendChild(card);
      // Re-Insert Add Username Card
      cards.appendChild(addCard);
    }
  }
  static deleteCard(username: string) {
    const card = document.getElementById(username + '-card');
    if(!card) { return; }
    else {
      card.remove();
    }
  }
}

export default CardService;
