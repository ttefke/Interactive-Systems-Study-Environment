import { writable } from 'svelte/store';

export const currentComboBox = writable(0);

export let studyData = {
    defaultRequiredTime: -1,
    defaultAttempts: 0,
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
            text: 'Banana'
        },
        {
            id: 3,
            text: 'Pineapple'
        },
        {
            id: 4,
            text: 'Blueberry'
        },
        {
            id: 5,
            text: 'Peach'
        },
        {
            id: 6,
            text: 'Raspberry'
        },
        {
            id: 7,
            text: 'Kiwi'
        },
        {
            id: 8,
            text: 'Strawberry'
        },
        {
            id: 9,
            text: 'Pomgranate'
        },
        {
            id: 10,
            text: 'Pear'
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
        text: ''
    });

    randomOption = randomOption + 1;

    return {
        options: options,
        randomOption: options[randomOption]
    };
}