

const joker = "Spade 9";

const playerCards = ["Diamond 2", "Club 10", "Club King", "Club Jack", "Club 6", "Heart Ace", "Diamond 10", "Diamond Queen", "Heart 9", "Joker", "Heart 4", "Diamond 8", "Heart Ace"];

function getCardSuit(card, joker) {
    return card === "Joker" ? joker.split(" ")[0] : card.split(" ")[0];
}

function getCardValue(card, joker) {
    return card === "Joker" ? joker.split(" ")[1] : card.split(" ")[1];
}

function getCardRank(card, joker) {
    const cardValue = getCardValue(card, joker);
    if (cardValue === "Ace") return 1;
    if (cardValue === "Jack") return 11;
    if (cardValue === "Queen") return 12;
    if (cardValue === "King") return 13;
    return parseInt(cardValue);
}

function getPowerCards(joker) {
    const redSuits = ["Heart", "Diamond"];
    const blackSuits = ["Club", "Spade"];
    const powerCards = [];
    if (joker === "Joker") {
        powerCards.push("Club Ace", "Spade Ace");
    } else {
        const jokerSuit = getCardSuit(joker);
        const jokerValue = getCardValue(joker);
        if (redSuits.indexOf(jokerSuit) > -1) {
            powerCards.push(`${blackSuits[0]} ${jokerValue}`, `${blackSuits[1]} ${jokerValue}`);
        }
        if (blackSuits.indexOf(jokerSuit) > -1) {
            powerCards.push(`${redSuits[0]} ${jokerValue}`, `${redSuits[1]} ${jokerValue}`);
        }
    }
    
    return powerCards;
}

function getSuitAndValue(card, joker) {
    return {
        suit: getCardSuit(card, joker),
        value: getCardRank(card, joker),
    }
}

// Helpers END

function createSequence({ remainingCards, sortedCards }) {
    if (remainingCards.length <= 1) {
        return;
    }
    const sequence = [ remainingCards[0] ];
    const removedIndexes = new Set();
    for (let i = 1; i < remainingCards.length; i++) {
        if (sequence[0].cardVR.suit === remainingCards[i].cardVR.suit) {
            const sequenceValue = sequence[0].cardVR;
            const remainingCardValue = remainingCards[i].cardVR.value;
            // if ((sequenceValue < remainingCardValue &&
            //      sequenceValue + 2 <= remainingCardValue)
            //      ||
            //      (sequenceValue > remainingCardValue && 
            //     sequenceValue - 2 <= remainingCardValue)
            //      ) {
            //         sequence.push(remainingCards[i]);
            //         removedIndexes.add(i);
            // }
            
            // sequence.forEach((s, idx) => {
            //     const sequenceValue = s.cardVR.value;
            //     const remainingCardValue = remainingCards[i].cardVR.value;

            //     if ((sequenceValue < remainingCardValue &&
            //      sequenceValue + 2 <= remainingCardValue)
            //      ||
            //      (sequenceValue > remainingCardValue && 
            //     sequenceValue - 2 <= remainingCardValue)
            //      ) {
            //         sequence.push(remainingCards[i]);
            //         removedIndexes.add(i);
            //     }
            // }); 
        }
    }
    console.log(sequence);
    if (sequence.length > 1) {
        sortedCards["sequences"].push(sequence);
    } else {
        sortedCards["remaining"].push(sequence[0]);
    }
    return;
    // isPure: false, cards:
    // return createSequence({ remainingCards, sortedCards });
    // remainingCards.forEach(card => {
    //     sortedCards["remaining"].push(card);
    //     remainingCards.shift();
    //     return createSequence({ remainingCards, sortedCards });
    // });
}

function setCards({ playerCards, joker, powerCards }) {
    const sortedCards = {
        powerCards: [],
        sequences: [],
        sets: [],
        remaining: [],
    }
    const commitedCards = [];
    const remainingCards = [];
    
    playerCards.forEach((playerCard, index) => { 
        const cardVR = getSuitAndValue(playerCard, joker);
        if (powerCards.indexOf(playerCard) > -1) {
            sortedCards["powerCards"].push({ 
                cardID: index,
                card: playerCard, 
                cardVR,
            });
        } else {
            remainingCards.push({ cardID: index, card: playerCard, cardVR });
        }
    });
    
    createSequence({ remainingCards, sortedCards, joker });
    // Creating sequences and removing power cards
    // playerCards.forEach((card, idx) => {
    //     if (powerCards.indexOf(card) > -1) {
    //         sortedCards["powerCards"].push({ cardID: idx, card });
    //         const removeIdx = remainingCards.findIndex(c => c.cardID === idx);
    //       if (removeIdx !== -1) {
    //         remainingCards.splice(removeIdx, 1); 
    //       }
    //     } else {
    //         if (!commitedCards.find(c => c.cardID === idx)) {
    //             const sequence = [{ cardID: idx, card }];
    //             remainingCards.forEach((rCard, rIndex) => {
    //                 if(remainingCards[rIndex].cardID !== idx) {
                        
    //                 }
    //             });
    //         }
    //     }
    // });
    
    
    return sortedCards;
}

const reArrangeCards = ({ playerCards, joker }) => {
    const powerCards = getPowerCards(joker);
    const cards = setCards({ playerCards, joker, powerCards });
    console.log(cards);
    
    const jokerDiv = document.getElementById("joker");
    if (jokerDiv) {
        jokerDiv.innerHTML = joker;
    }

    const originalList = document.getElementById("originalList");
    if (originalList) {
        originalList.innerHTML = "";
        playerCards.forEach(card => {
            originalList.innerHTML += `<li>${card}</li>`;
        });
    }

    const newList = document.getElementById("newList");
    if (newList) {
        newList.innerHTML = "";
        for (let key in cards) {
            const list = document.createElement("ul");
            if (cards.hasOwnProperty(key)) {
                list.innerHTML = `<h2>${key}:</h2>`;
                cards[key].forEach(card => {
                    list.innerHTML += `<li>${card.card}</li>`;
                });
            }
            newList.appendChild(list);
        }
        
    }
    return ["Ans"];
}

console.log(reArrangeCards({ playerCards, joker }));