import { gsap } from 'gsap';
/*jshint esversion: 6 */

const Utils = {};

Utils.pickCardAnimate = ({ animateAndDelete, locationID }) => {
    return new Promise(async (resolve, reject) => {
        const locationEl = document.getElementById(locationID);
        if (animateAndDelete && locationEl) {
            animateAndDelete.style.width = `${animateAndDelete.clientWidth}px`;
            animateAndDelete.style.height = `${animateAndDelete.clientHeight}px`;
            animateAndDelete.style.top = `${animateAndDelete.getBoundingClientRect().top}px`;
            animateAndDelete.style.left = `${animateAndDelete.getBoundingClientRect().left}px`;
    
            const tl = gsap.timeline();
            tl.to(animateAndDelete, {
                top: `${locationEl.getBoundingClientRect().top}px` ,
                left: `${locationEl.getBoundingClientRect().right}px`,
                transform: "none",
                duration: .4,
                zIndex: 51,
                position: "fixed",
            });
            tl.to(animateAndDelete, {
                left: `-=${animateAndDelete.clientWidth}px`,
                duration: .2,
            });
            tl.to(animateAndDelete, {
                display: "none",
                onComplete: () => {
                    animateAndDelete.remove(); // This will remove the element from the DOM
                    resolve();
                }
            });
        } else {
            reject(new Error("Player or dropCardWrap not found"));
        }
    });
};

Utils.dropMyCardAnimate = async ({ dropedEl, card }) => {
    return new Promise((resolve, reject) => {
        const dropCard = document.getElementById("droppedCardsWrap");
        const dropCardWrap = dropCard?.querySelector("[role='button']");
        if (dropedEl && dropCardWrap) {
            dropedEl.style.width = `${dropedEl.clientWidth}px`;
            dropedEl.style.height = `${dropedEl.clientHeight}px`;
            dropedEl.style.top = `${dropedEl.getBoundingClientRect().top}px`;
            dropedEl.style.left = `${dropedEl.getBoundingClientRect().left}px`;

            const transform = 0.25 * dropCardWrap.children.length;

            const tl = gsap.timeline();
            tl.to(dropedEl, {
                top: `${dropCardWrap.getBoundingClientRect().top}px`,
                left: `${dropCardWrap.getBoundingClientRect().right}px`,
                transform: "none",
                duration: .4,
                zIndex: 41,
                position: "fixed",
            });
            tl.to(dropedEl, {
                transform: `translate(${transform}px, -${transform}px)`,
                left: `-=${dropedEl.clientWidth}`,
                duration: .2,
            });
            tl.to(dropedEl, {
                display: "none",
                onComplete: () => {
                    const cardEl = document.createElement('div');
                    cardEl.style.transform = `translate(${transform}px, -${transform}px)`;
                    cardEl.className = "absolute inset-0 border border-[rgba(0,0,0,0.3)] rounded-lg";
                    cardEl.innerHTML = `<img class="pointer-events-none select-none" src="/cards/${card.toLowerCase().replace(/ /g, "-")}.png" alt="${card}" title="${card}" loading="lazy" />`;                    
                    dropCardWrap.appendChild(cardEl);
                    
                    resolve();  // Resolve the promise
                }
            });
        } else {
            reject(new Error("Element or dropCardWrap not found"));
        }
    });
};

Utils.dropPlayerCardAnimate = async ({ userName, card }) => {
    return new Promise((resolve, reject) => {
        const playerEl = document.getElementById(userName);
        const emptyCard = document.getElementById("dropEmptyCard");
        const dropCard = document.getElementById("droppedCardsWrap");
        const dropCardWrap = dropCard?.querySelector("[role='button']");

        if (playerEl && dropCardWrap && emptyCard) {
            const transform = 0.25 * (dropCardWrap.children.length || 0 + 1);

            const cardEl = document.createElement('div');
            cardEl.style.opacity = 0;
            cardEl.style.transform = `translate(${transform}px, -${transform}px)`;
            cardEl.style.width = `${emptyCard.clientWidth}px`;
            cardEl.style.height = `${emptyCard.clientHeight}px`;
            cardEl.className = "absolute inset-0 border border-[rgba(0,0,0,0.3)] rounded-lg";
            cardEl.innerHTML = `<img class="pointer-events-none select-none" src="/cards/${card.toLowerCase().replace(/ /g, "-")}.png" alt="${card}" title="${card}" loading="lazy" />`;

            dropCardWrap.appendChild(cardEl);
    
            const tl = gsap.timeline();
            tl.to(cardEl, {
                position: "fixed",
                zIndex: 51,
                opacity: 1,
                duration: .1,
                top: `${playerEl.getBoundingClientRect().top}px` ,
                left: `${playerEl.getBoundingClientRect().left}px`,
            });
            tl.to(cardEl, {
                top: `${emptyCard.getBoundingClientRect().top}px`,
                left: `${emptyCard.getBoundingClientRect().right - emptyCard.clientWidth}px`,
                duration: .4,
            });
            tl.to(cardEl, {
                onComplete: () => {
                    // cardEl.style.removeProperty("width");
                    // cardEl.style.removeProperty("height");
                    // cardEl.style.removeProperty("z-index");
                    // cardEl.style.removeProperty("position");
                    // cardEl.style.removeProperty("opacity");
                    // cardEl.style.removeProperty("top");
                    // cardEl.style.removeProperty("left");
                    cardEl.remove();
                    resolve();
                }
            }); 
        } else {
            reject(new Error("Element or dropCardWrap not found"));
        }
    });
};

Utils.showToastAndAddUpdate = async ({ update }) => {
    // Pending
}


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
            !set.some(s => s.id === card.id)
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
            if (cardsArr[idx].cardSuitValue.value !== sequence[sequenceIdx].cardSuitValue.value + 1) {
                isPure = false;
            }
            // Next card is not same and not greater than +2 of current card
            sequence.push(cardsArr[idx]);
            sequenceIdx++;
        }
    }
    
    if (sequence.length < 2) {
        // No sequence found Just a single card
        for (let i = 0; i < cardsArr.length; i++) {
            if (sequence.some(seq => seq.id === cardsArr[i].id)) {
                sortedCards["remaining"].push(cardsArr[i]);
                cardsArr.splice(i, 1);
            }
        }
    } else {
        // Found a Sequence
        sortedCards["sequences"].push(sequence);
        const updatedCardsArr = cardsArr.filter(card =>
            !sequence.some(seq => seq.id === card.id)
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

    return sortGroups({ cards: sortedCards });
}

function sortGroups({ cards }) {
    const finalArr = [];
    
    for (let key in cards) {
        if (cards.hasOwnProperty(key)) {
            if ((key === "powerCards" && cards[key].length) || (key === "remaining" && cards[key].length)) {
                finalArr.push(cards[key].map(c => ({ card: c.card, id: c.id, cardSuitValue: c.cardSuitValue })));
            } else if (cards[key].length) {
                cards[key].sort((a, b) => b.length - a.length);
                cards[key].forEach(subArray => {
                    const cardInfo = subArray.map(obj => ({ card: obj.card, id: obj.id, cardSuitValue: obj.cardSuitValue }));
                    finalArr.push(cardInfo);
                });
            }
        }
    }
    
    return finalArr;
}

function setCards({ playerCards, joker, powerCards }) {
    const cardsBySuits = {
        powerCards: [],
        club: [],
        diamond: [],
        heart: [],
        spade: [],
    };

    const cardCounts = {};
    playerCards.forEach((card, idx) => {
        const cardSuitValue = getSuitAndValue(card, joker);
        if (powerCards.indexOf(card) > -1) {
            if (cardCounts[card]) {
                cardCounts[card]++;
                cardsBySuits["powerCards"].push({
                    id: `${card.replace(/ /, "_")}__dup`,
                    card,
                    cardSuitValue,
                });
            } else {
                cardCounts[card] = 1;
                cardsBySuits["powerCards"].push({
                    id: card.replace(/ /, "_"),
                    card,
                    cardSuitValue,
                });
            }
        } else {
            if (cardCounts[card]) {
                cardCounts[card]++;
                cardsBySuits[cardSuitValue.suit.toLowerCase()].push({
                    id: `${card.replace(/ /, "_")}__dup`,
                    card,
                    cardSuitValue,
                });
            } else {
                cardCounts[card] = 1;
                cardsBySuits[cardSuitValue.suit.toLowerCase()].push({
                    id: card.replace(/ /, "_"),
                    card,
                    cardSuitValue,
                });
            }
        }
    });

    return createCombination({ cardsBySuits });
}

Utils.reArrangeCards = ({ playerCards, joker, powerCards }) => {
    const cards = setCards({ playerCards, joker, powerCards });
    return cards;
}

export default Utils;