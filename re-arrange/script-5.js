const playerCards = [
    "Diamond 8",
    "Diamond 7",
    "Joker",
    "Club 4",
    "Spade Ace",
    "Diamond Queen",
    "Spade 3",
    "Club Ace",
    "Spade 2",
    "Heart Queen",
    "Heart 2",
    "Spade Ace",
    "Club Queen",
    "Spade 6"
];

const joker = "Spade 8";

const res = reArrangeCards({ playerCards, joker });
console.log(playerCards);
console.log(res);

// ReArrange Helpers
function getCardSuit(card, joker) {
    return card === "Joker" ? joker.split(" ")[0] : card.split(" ")[0];
}

function getCardValue(card, joker) {
    return card === "Joker" ? joker.split(" ")[1] : card.split(" ")[1];
}

function getSuitAndValue(card, joker) {
    return {
        suit: getCardSuit(card, joker),
        value: getCardRank(card, joker),
    }
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

function combineSortedCards({ cards }) {
    const finalCards = [];
    for (let key in cards) {
        if (cards.hasOwnProperty(key)) {
            if (key === "sequences" || key === "sets") {
                console.log(cards[key], key);
                cards[key].forEach(arr => {
                    arr.forEach(arr2 => {
                        finalCards.push(arr2.card);
                    });
                });
            } else {
                cards[key].forEach(card => {
                    finalCards.push(card.card);
                });
            }
        }
    }
    return finalCards;
}

// ReArrange Helpers END

function createSets({ cardsArr, sortedCards }) {
    if (cardsArr.length < 1) {
        return;
    }

    if (cardsArr.length === 1) {
        sortedCards["remaining"].push(cardsArr[0]);
        cardsArr.splice(0, 1);
        return;
    } 

    // Sort cards by value
    cardsArr.sort((a, b) => a.cardSuitValue.value - b.cardSuitValue.value);

    const set = [cardsArr[0]];
    
    for (let idx = 1; idx < cardsArr.length; idx++) {
        // Check if next card has same value
        if (set.length < 2 && set[0].cardSuitValue.value !== cardsArr[idx].cardSuitValue.value) {
            sortedCards["remaining"].push(set[0]);
            cardsArr.splice(0, 1);
            return createSets({ cardsArr, sortedCards });
        }
        if (set[0].cardSuitValue.value === cardsArr[idx].cardSuitValue.value) {
            if (set.some(s => s.cardSuitValue.suit !== cardsArr[idx].cardSuitValue.suit)) {
                set.push(cardsArr[idx]);
            }
        } else {
            break;
        }
    }

    if (set.length < 2) {
        // Set Not Found
        sortedCards["remaining"].push(set[0]);
        cardsArr.splice(0, 1);
        return createSets({ cardsArr, sortedCards });
    } else {
        // Found a set
        sortedCards["sets"].push(set);
        const updatedCardsArr = cardsArr.filter(card =>
            !set.some(s => s.cardID === card.cardID)
        );
        return createSets({ cardsArr: updatedCardsArr, sortedCards });
    }
}

function createSequence({ cardsArr, sortedCards }) {
    if (cardsArr.length <= 0) {
        return;
    }
    if (cardsArr.length === 1) {
        sortedCards["remaining"].push(cardsArr[0]);
        cardsArr.splice(0, 1);
        return;
    } 
    
    cardsArr.sort((a, b) => a.cardSuitValue.value - b.cardSuitValue.value);
    
    let isPure = true;
    const sequence = [ cardsArr[0] ];
    let sequenceIdx = 0;
    
    for (let idx = 1; idx < cardsArr.length; idx++) {
        // Remove similar card and re run
        if (cardsArr[idx].cardSuitValue.value === sequence[sequenceIdx].cardSuitValue.value) {
            sortedCards["remaining"].push(cardsArr[idx]);
            cardsArr.splice(idx, 1);
            return createSequence({ cardsArr, sortedCards });
        }
        // Check if next sequence card is more than +2 of current card
        if (cardsArr[idx].cardSuitValue.value > sequence[sequenceIdx].cardSuitValue.value + 2) {
            if (sequence.length < 2) {
                sortedCards["remaining"].push(cardsArr[sequenceIdx]);
                // Remove the remaining Card and reRun 
                cardsArr.splice(sequenceIdx, 1);
                return createSequence({ cardsArr, sortedCards });
            } else {                
                break;
            }
        } else {
            if (cardsArr[idx].cardSuitValue.value === sequence[sequenceIdx].cardSuitValue.value + 1) {
                isPure = true;
            }
            // Next card is not same and not greater than +2 of current card
            sequence.push(cardsArr[idx]);
            sequenceIdx++;
        }
    }
    
    if (sequence.length < 2) {
        // No sequence found Just a single card
        for (let i = 0; i < cardsArr.length; i++) {
            if (sequence.some(seq => seq.cardID === cardsArr[i].cardID)) {
                sortedCards["remaining"].push(cardsArr[i]);
                cardsArr.splice(i, 1);
            }
        }
    } else {
        // Found a Sequence
        sortedCards["sequences"].push(sequence);
        const updatedCardsArr = cardsArr.filter(card =>
            !sequence.some(seq => seq.cardID === card.cardID)
        );
        return createSequence({ cardsArr: updatedCardsArr, sortedCards });
    }
    
    return createSequence({ cardsArr, sortedCards });
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
                createSequence({ cardsArr: [...cardsBySuits[key]], sortedCards});
            }
        }
    }

    const cardsArr = [...sortedCards.remaining];
    sortedCards.remaining = [];

    createSets({ cardsArr, sortedCards });

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
        const cardSuitValue = getSuitAndValue(card, joker);
        if (powerCards.indexOf(card) > -1) {
            cardsBySuits["powerCards"].push({
                cardID: idx,
                card,
                cardSuitValue,
            });
        } else {
            cardsBySuits[cardSuitValue.suit.toLowerCase()].push({
                cardID: idx,
                card,
                cardSuitValue
            });
        }
    });

    return createCombination({ cardsBySuits });
}

function reArrangeCards ({ playerCards, joker }) {
    const powerCards = getPowerCards(joker);
    const cards = setCards({ playerCards, joker, powerCards });
    return combineSortedCards({ cards });
}