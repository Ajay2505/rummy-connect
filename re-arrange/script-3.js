
// [
//     "Club Ace",
//     "Diamond Ace",
//     "Diamond Jack",
//     "Club 4",
//     "Heart 3",
//     "Diamond 6",
//     "Diamond 9",
//     "Diamond 5",
//     "Spade 5",
//     "Heart 3",
//     "Heart 7",
//     "Spade 2",
//     "Club 9"
// ]

const joker = "Spade 9";

const playerCards = ["Diamond 2", "Club 10", "Club King", "Club Jack", "Club 6", "Diamond Ace", "Diamond 10", "Diamond Queen", "Heart 9", "Joker", "Heart 4", "Diamond 8", "Heart Ace"];

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

function printCards(sortedCards) {
    for (let key in sortedCards) {
        if (sortedCards.hasOwnProperty(key)) {
            if (key === "sequences") {
                sortedCards[key].forEach(arr => {
                    arr.forEach(arr2 => {
                        console.log(arr2.card);
                    })
                });
            } else {
                sortedCards[key].forEach(card => {
                    console.log(card.card);
                })
            }
        }
    }
    return;
}

// Helpers END

function createSequence({ cardsArr, sortedCards }) {
    if (cardsArr.length <= 0) {
        return;
    }
    if (cardsArr.length === 1) {
        sortedCards["remaining"].push(cardsArr[0]);
        cardsArr.splice(0, 1);
        return;
    } 
    
    cardsArr.sort((a, b) => a.cardRV.value - b.cardRV.value);

    let isPure = false;
    const sequence = [ cardsArr[0] ];
    let sequenceIdx = 0;
    for (let idx = 1; idx < cardsArr.length; idx++) {
        if ((cardsArr[idx].cardRV.value === sequence[sequenceIdx].cardRV.value)
            ||
            (cardsArr[idx].cardRV.value > sequence[sequenceIdx].cardRV.value + 2)
        ) {
            sortedCards["remaining"].push(cardsArr[sequenceIdx]);
            cardsArr.splice(sequenceIdx, 1);
            return createSequence({ cardsArr, sortedCards });
        } else {
            if (cardsArr[idx].cardRV.value === sequence[sequenceIdx].cardRV.value + 1) {
                isPure = true;
            }
            
            sequence.push(cardsArr[idx]);
            sequenceIdx++;
        }
    }
    
    if (sequence.length < 2) {
        for (let i = 0; i < cardsArr.length; i++) {
            if (sequence.some(seq => seq.cardID === cardsArr[i].cardID)) {
                sortedCards["remaining"].push(cardsArr[i]);
                cardsArr.splice(i, 1);
            }
        }
    } else {
        sortedCards["sequences"].push(sequence);
        const updatedCardsArr = cardsArr.filter(card =>
            !sequence.some(seq => seq.cardID === card.cardID)
        );
        return createSequence({ cardsArr: updatedCardsArr, sortedCards });
    }
    
    return createSequence({ cardsArr, sortedCards });
}

function createSets({ cardsArr, sortedCards }) {    
    if (cardsArr.length <= 1) {
        return;
    }

    // Sort cards by value
    cardsArr.sort((a, b) => a.cardRV.value - b.cardRV.value);

    let sets = [];
    let remainingCards = [...cardsArr];

    for (let i = 0; i < cardsArr.length; i++) {
        let currentSet = [cardsArr[i]];
        for (let j = i + 1; j < cardsArr.length; j++) {
            if (cardsArr[j].cardRV.value === cardsArr[i].cardRV.value && 
                cardsArr[j].cardRV.suit !== cardsArr[i].cardRV.suit) {
                currentSet.push(cardsArr[j]);
            }
        }

        // Check if a valid set is found
        if (currentSet.length > 1) {
            sets.push(currentSet);
            remainingCards = remainingCards.filter(card => !currentSet.includes(card));
        }
    }

    // Update sortedCards object
    sortedCards.sets = sets;
    sortedCards.remaining = remainingCards;
}


function createCombination({ cardsBySuits }) {    
    const sortedCards = {
        powerCards: [...cardsBySuits.powerCards],
        sequences: [],
        sets: [],
        remaining: [],
    };

    for (let key in cardsBySuits) {
        if (cardsBySuits.hasOwnProperty(key)) {
            if (key !== "powerCards" && cardsBySuits[key]) {
                createSequence({ cardsArr: cardsBySuits[key], sortedCards});
            }
        }
    }

    createSets({ cardsArr: sortedCards.remaining, sortedCards });

    return sortedCards;
}

function setCards({ playerCards, joker, powerCards }) {
    const cardsBySuits = {
        powerCards: [],
        club: [],
        diamond: [],
        heart: [],
        spade: [],
    };

    playerCards.forEach((card, idx) => {
        const cardRV = getSuitAndValue(card, joker);
        if (powerCards.indexOf(card) > -1) {
            cardsBySuits["powerCards"].push({
                cardID: idx,
                card,
                cardRV,
            });
        } else {
            cardsBySuits[cardRV.suit.toLowerCase()].push({
                cardID: idx,
                card,
                cardRV
            });
        }
    });

    const sortedList = document.getElementById("sortedList");
    if (sortedList) {
        sortedList.innerHTML = "";
        for (let key in cardsBySuits) {
            const list = document.createElement("ul");
            if (cardsBySuits.hasOwnProperty(key)) {
                list.innerHTML = `<h2>${key}:</h2>`;
                cardsBySuits[key].forEach(card => {
                    list.innerHTML += `<li>${card.card}</li>`;
                });
            }
            sortedList.appendChild(list);
        }
        
    }

    return createCombination({ cardsBySuits });
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

reArrangeCards({ playerCards, joker });