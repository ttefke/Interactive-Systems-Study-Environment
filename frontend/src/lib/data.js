import { writable } from 'svelte/store';

export const currentComboBox = writable(0);

export let studyData = {
    defaultRequiredTime: -1,
    defaultAttempts: 0,
    enhancedLetters: 0,
    enhancedRequiredTime: -1,
    enhancedAttempts: 0
};

export function getRandomizedOptions() {
    let options = [
        {
            id: 1,
            text: 'Apple'
        },
        {
            id: 2,
            text: 'Apricot'
        },
        {
            id: 3,
            text: 'Avocado'
        },
        {
            id: 4,
            text: 'Banana'
        },
        {
            id: 5,
            text: 'Blackberry'
        },
        {
            id: 6,
            text: 'Blood orange'
        },
        {
            id: 7,
            text: 'Blueberry'
        },
        {
            id: 8,
            text: 'Boysenberry'
        },
        {
            id: 9,
            text: 'Breadfruit'
        },
        {
            id: 10,
            text: 'Buddha\'s hand citron'
        },
        {
            id: 11,
            text: 'Cantaloupe'
        },
        {
            id: 12,
            text: 'Clementine'
        },
        {
            id: 13,
            text: 'Crab apple'
        },
        {
            id: 14,
            text: 'Currant'
        },
        {
            id: 15,
            text: 'Cherry'
        },
        {
            id: 16,
            text: 'Custard apple'
        },
        {
            id: 17,
            text: 'Coconut'
        },
        {
            id: 18,
            text: 'Cranberry'
        },
        {
            id: 19,
            text: 'Date'
        },
        {
            id: 20,
            text: 'Dragonfruit'
        },
        {
            id: 21,
            text: 'Durian'
        },
        {
            id: 22,
            text: 'Elderberry'
        },
        {
            id: 23,
            text: 'Fig'
        },
        {
            id: 24,
            text: 'Gooseberry'
        },
        {
            id: 25,
            text: 'Grape'
        },
        {
            id: 26,
            text: 'Grapefruit'
        },
        {
            id: 27,
            text: 'Guava'
        },
        {
            id: 28,
            text: 'Honeydew melon'
        },
        {
            id: 29,
            text: 'Jackfruit'
        },
        {
            id: 30,
            text: 'Kiwifruit'
        },
        {
            id: 31,
            text: 'Kumquat'
        },
        {
            id: 32,
            text: 'Lemon'
        },
        {
            id: 33,
            text: 'Lime'
        },
        {
            id: 34,
            text: 'Lychee'
        },
        {
            id: 35,
            text: 'Mandarine'
        },
        {
            id: 36,
            text: 'Mango'
        },
        {
            id: 37,
            text: 'Mangosteen'
        },
        {
            id: 38,
            text: 'Marionberry'
        },
        {
            id: 39,
            text: 'Nectarine'
        },
        {
            id: 40,
            text: 'Orange'
        },
        {
            id: 41,
            text: 'Papaya'
        },
        {
            id: 42,
            text: 'Passionfruit'
        },
        {
            id: 43,
            text: 'Peach'
        },
        {
            id: 44,
            text: 'Pear'
        },
        {
            id: 45,
            text: 'Persimmon'
        },
        {
            id: 46,
            text: 'Plantain'
        },
        {
            id: 47,
            text: 'Plum'
        },
        {
            id: 48,
            text: 'Pineapple'
        },
        {
            id: 49,
            text: 'Pluot'
        },
        {
            id: 50,
            text: 'Pomegranate'
        },
        {
            id: 51,
            text: 'Pomelo'
        },
        {
            id: 52,
            text: 'Quince'
        },
        {
            id: 53,
            text: 'Raspberry'
        },
        {
            id: 54,
            text: 'Rambutan'
        },
        {
            id: 55,
            text: 'Soursop'
        },
        {
            id: 56,
            text: 'Starfruit'
        },
        {
            id: 57,
            text: 'Strawberry'
        },
        {
            id: 58,
            text: 'Tamarind'
        },
        {
            id: 59,
            text: 'Tangelo'
        },
        {
            id: 60,
            text: 'Tangerine'
        },
        {
            id: 61,
            text: 'Ugli fruit'
        },
        {
            id: 62,
            text: 'Watermelon'
        },
        {
            id: 63,
            text: 'White currant'
        },
        {
            id: 64,
            text: 'Yuzu'
        }
    ];


    /* Fisher-Yates shuffle */
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = options[i];
        options[i] = options[j];
        options[j] = temp;
    }

    /* Get random option */
    let randomOption = Math.floor(Math.random() * options.length);

    /* Ensure combobox is empty at the beginning */
    options.unshift({
        id: 0,
        text: 'Select an item'
    });

    randomOption = randomOption + 1;

    return {
        options: options,
        randomOption: options[randomOption]
    };
}