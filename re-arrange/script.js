
// Cards.js
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

function sortNumbersArr(arr) {
    return arr.sort((a, b) => a.cardValue - b.cardValue);
}

function findPossibleSequences(cards) {
  cards.sort((a, b) => a.cardValue - b.cardValue);
  let sequences = [];
    return new Promise((resolve, reject) => {
        resolve(sequences);
    });
}

function createCombination(cardsBySuits) {
    const sortedCards = {
        powerCards: [],
        sequences: [],
        sets: [],
        remaining: [],
    };
    
    sortedCards["powerCards"].push(...cardsBySuits["powerCards"]);
    
    delete cardsBySuits["powerCards"];
    
    for (let key in cardsBySuits) {
        if (cardsBySuits.hasOwnProperty(key)) {
            const arr = cardsBySuits[key];
            if (arr.length > 1) {
                try {
                    const sequence = findPossibleSequences(arr);
                } catch (soleCards) {
                    // console.log(soleCards);
                }
            } else {
                sortedCards["remaining"].push(...arr);
            }
        }
    }
    
    return sortedCards;
}

function setCards(playerCards, joker) {
    const allPowerCards = getPowerCards(joker);
    const cardsBySuits = {
        powerCards: [],
        club: [],
        diamond: [],
        heart: [],
        spade: [],
    };
    
    playerCards.forEach((card, idx) => {
        if (allPowerCards.indexOf(card) > -1) {
            cardsBySuits["powerCards"].push({ cardID: idx, card });
        } else {
            const { value, suit } = getSuitAndValue(card, joker);
            cardsBySuits[suit.toLowerCase()].push({ cardID: idx, cardValue: parseInt(value), card: card });
        }
    });
    
    return createCombination(cardsBySuits);
}

const reArrangeCards = (playerCards, joker) => {
    const cards = setCards(playerCards, joker);
    console.log(cards);
    

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
            if (cards.hasOwnProperty(key)) {
                cards[key].forEach(card => {
                    newList.innerHTML += `<li>${card.card}</li>`;
                });
            }
        }
        
    }
    return ["Ans"];
}

console.log(reArrangeCards(playerCards, joker));
