const joker = "Diamond 6";
const powerCards = ["Club 6", "Spade 6"];
// const playerCards = [
//     [
//         {
//             "card": "Club 2",
//             "id": "Club_2",
//             "cardSuitValue": {
//                 "suit": "Club",
//                 "value": 2
//             }
//         },
//         {
//             "card": "Club 3",
//             "id": "Club_3",
//             "cardSuitValue": {
//                 "suit": "Club",
//                 "value": 3
//             }
//         },
//         {
//             "card": "Club 4",
//             "id": "Club_4",
//             "cardSuitValue": {
//                 "suit": "Club",
//                 "value": 4
//             }
//         },
//         {
//             "card": "Club 5",
//             "id": "Club_5",
//             "cardSuitValue": {
//                 "suit": "Club",
//                 "value": 5
//             }
//         }
//     ],
//     [
//         {
//             "card": "Diamond Ace",
//             "id": "Diamond_Ace",
//             "cardSuitValue": {
//                 "suit": "Diamond",
//                 "value": 1
//             }
//         },
//         {
//             "card": "Diamond 2",
//             "id": "Diamond_2",
//             "cardSuitValue": {
//                 "suit": "Diamond",
//                 "value": 2
//             }
//         },
//         {
//             "card": "Diamond 3",
//             "id": "Diamond_3",
//             "cardSuitValue": {
//                 "suit": "Diamond",
//                 "value": 3
//             }
//         },
//         {
//             "card": "Diamond 4",
//             "id": "Diamond_4",
//             "cardSuitValue": {
//                 "suit": "Diamond",
//                 "value": 4
//             }
//         }
//     ],
//     [
//         {
//             "card": "Heart Queen",
//             "id": "Heart_Queen",
//             "cardSuitValue": {
//                 "suit": "Heart",
//                 "value": 12
//             }
//         },
//         {
//             "card": "Heart King",
//             "id": "Heart_King",
//             "cardSuitValue": {
//                 "suit": "Heart",
//                 "value": 13
//             }
//         },
//         {
//             "card": "Spade 6",
//             "id": "Spade_6",
//             "cardSuitValue": {
//                 "suit": "Spade",
//                 "value": 6
//             }
//         }
//     ],
//     [
//         {
//             "card": "Diamond 2",
//             "id": "Diamond_2__dup",
//             "cardSuitValue": {
//                 "suit": "Diamond",
//                 "value": 2
//             }
//         },
//         {
//             "card": "Heart 2",
//             "id": "Heart_2",
//             "cardSuitValue": {
//                 "suit": "Heart",
//                 "value": 2
//             }
//         },
//         {
//             "card": "Spade 2",
//             "id": "Spade_2",
//             "cardSuitValue": {
//                 "suit": "Spade",
//                 "value": 2
//             }
//         }
//     ]
// ];

const playerCards = [
  [
    {
      card: "Spade Ace",
      id: "Spade_Ace",
      cardSuitValue: {
        suit: "Spade",
        value: 1,
      },
    },
    {
      card: "Spade 2",
      id: "Spade_2",
      cardSuitValue: {
        suit: "Spade",
        value: 2,
      },
    },
    {
      card: "Spade 3",
      id: "Spade_3",
      cardSuitValue: {
        suit: "Spade",
        value: 3,
      },
    },
    {
      card: "Spade 4",
      id: "Spade_4",
      cardSuitValue: {
        suit: "Spade",
        value: 4,
      },
    },
  ],
  [
    {
      card: "Diamond 4",
      id: "Diamond_4",
      cardSuitValue: {
        suit: "Diamond",
        value: 4,
      },
    },
    {
      card: "Diamond 5",
      id: "Diamond_5",
      cardSuitValue: {
        suit: "Diamond",
        value: 5,
      },
    },
    {
      card: "Diamond 6",
      id: "Diamond_6",
      cardSuitValue: {
        suit: "Diamond",
        value: 6,
      },
    },
  ],
  [
    {
      card: "Club Ace",
      id: "Club_Ace",
      cardSuitValue: {
        suit: "Club",
        value: 1,
      },
    },
    {
      card: "Diamond Ace",
      id: "Diamond_Ace",
      cardSuitValue: {
        suit: "Diamond",
        value: 1,
      },
    },
    {
      card: "Heart Ace",
      id: "Heart_Ace",
      cardSuitValue: {
        suit: "Heart",
        value: 1,
      },
    },
  ],
  [
    {
      card: "Club Jack",
      id: "Club_Jack",
      cardSuitValue: {
        suit: "Club",
        value: 11,
      },
    },
    {
      card: "Heart Jack",
      id: "Heart_Jack",
      cardSuitValue: {
        suit: "Heart",
        value: 11,
      },
    },
    {
      card: "Spade Jack",
      id: "Spade_Jack",
      cardSuitValue: {
        suit: "Spade",
        value: 11,
      },
    },
  ],
  [
    {
      card: "Club 5",
      id: "Club_5",
      cardSuitValue: {
        suit: "Club",
        value: 5,
      },
    },
  ],
];

function getMainSuit({ cards, powerCards }) {
  let mainSuit = cards[0].cardSuitValue.suit;
  for (let i = 0; i < cards.length; i++) {
    const cardObj = cards[i];
    if (!powerCards.includes(cardObj.card)) {
      return cardObj.cardSuitValue.suit;
    }
  }
  return mainSuit;
}

function isValidSeqSuit({ cards, powerCards, mainSuit }) {
  let normalCardsCount = 0;
  for (let i = 0; i < cards.length; i++) {
    const cardObj = cards[i];
    if (!powerCards.includes(cardObj.card)) {
      normalCardsCount++;
      if (cardObj.cardSuitValue.suit !== mainSuit) {
        return false;
      }
    }
  }

  // Minimum 2 cards must be normal
  if (normalCardsCount < 2) {
    return false;
  }

  return true;
}

function getAceIndex({ cards, powerCards }) {
  for (let i = 0; i < cards.length; i++) {
    const cardObj = cards[i];
    if (
      !powerCards.includes(cardObj.card) &&
      cardObj.cardSuitValue.value === 1
    ) {
      return i;
    }
  }
  return -1;
}

function isValidSequence({ cards, powerCards }) {
  let powerCardCount = 0;
  let prevCardValue = -4;
  for (let i = 0; i < cards.length; i++) {
    if (!powerCards.includes(cards[i].card)) {
      if (prevCardValue < 1) {
        prevCardValue = cards[i].cardSuitValue.value;
      }
      if (
        prevCardValue > 0 &&
        i + 1 < cards.length &&
        !powerCards.includes(cards[i + 1].card) &&
        prevCardValue + 1 !== cards[i + 1].cardSuitValue.value
      ) {
        return { isValid: false };
      }
    } else {
      powerCardCount++;
    }
    prevCardValue++;
  }

  return { isValid: true, isPure: powerCardCount < 1 };
}

function validateSequence({ cards, powerCards, mainSuit }) {
  const validSeqSuits = isValidSeqSuit({ cards, powerCards, mainSuit });
  if (!validSeqSuits) {
    return { isValid: false };
  }
  const aceIndex = getAceIndex({ cards, powerCards });
  if (aceIndex !== -1) {
    const res = isValidSequence({ cards, powerCards });
    if (res.isValid === true) {
      return res;
    }
    cards[aceIndex].cardSuitValue.value = 14;
    return isValidSequence({ cards, powerCards });
  }
  return isValidSequence({ cards, powerCards });
}

function validateSet({ cards, powerCards }) {
  const setSuits = [];
  let setValue = -1;
  for (let i = 0; i < cards.length; i++) {
    const cardObj = cards[i];
    if (!powerCards.includes(cardObj.card)) {
      if (setValue < 1) {
        setValue = cardObj.cardSuitValue.value;
      } else if (cardObj.cardSuitValue.value !== setValue) {
        return { isValid: false };
      }
      if (setSuits.includes(cardObj.cardSuitValue.suit)) {
        return { isValid: false };
      } else {
        setSuits.push(cardObj.cardSuitValue.suit);
      }
    }
  }

  return { isValid: true };
}

function validateShow({ playerCards, joker, powerCards }) {
  let hasPureSequence = false;
  let sequenceCount = 0;
  let singleCardGroup = 0;
  return new Promise((resolve, reject) => {
    try {
      playerCards.forEach((cards) => {
        if (singleCardGroup > 1) {
          throw new Error();
        }
        if (cards.length < 3) {
          singleCardGroup++;
        } else {
          const mainSuit = getMainSuit({ cards, powerCards });
          const seq = validateSequence({ cards, powerCards, joker, mainSuit });
          if (seq?.isValid === false) {
            const set = validateSet({ cards, powerCards, joker });
            if (set?.isValid === false) {
              throw new Error();
            }
          }
          if (seq.isValid === true) {
            sequenceCount++;
            if (seq.isPure === true) {
              hasPureSequence = true;
            }
          }
        }
      });
      if (!hasPureSequence) {
        throw new Error("Minimum one sequence must be pure!");
      }
      return resolve("Valid Show");
    } catch (error) {
      console.log(error, "validateShow");
      return reject({ err: error.message || "Invalid Show!" });
    }
  });
}

validateShow({ playerCards, joker, powerCards })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
