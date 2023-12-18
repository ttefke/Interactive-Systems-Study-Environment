<script>
    import { onMount } from "svelte";
    import {
        currentComboBox,
        getRandomizedOptions,
        studyData,
    } from "./data.js";

    let selected;
    let startTime;
    let correct = false;
    let optionsData = getRandomizedOptions();

    let comboBoxStatus = 0;
    let lastScroll = window.scrollY;
    let scrollDistances = [];

    onMount(() => {
        startTime = new Date().getTime();

        window.onscroll = function(e) {
            let newScroll = window.scrollY - lastScroll;
            console.log("User scrolled: " + newScroll);
            scrollDistances.push({
                distance: newScroll,
                time: new Date().getTime()
            });
            lastScroll = newScroll;
        }
    });

    function itemSelected(id) {
        studyData.defaultRequiredTime = new Date().getTime() - startTime;
        studyData.defaultAttempts++;
        correct = id === optionsData.randomOption.id;

        if (correct) {
            comboBoxStatus = 2;
            studyData.defaultScrollDistance = JSON.stringify(scrollDistances);
        }
    }

    function openComboBox() {
        comboBoxStatus = 1;
    }
</script>

{#if comboBoxStatus < 2}
<p>'{optionsData.randomOption.text}'</p>
{:else}
<p>Please tap on 'next' to continue.</p>
{/if}


{#if comboBoxStatus == 0}
<button on:click={openComboBox}>
    {optionsData.options[0].text}
</button>
{:else if comboBoxStatus == 1}
<div class="combobox-bg">
    {#each optionsData.options as {id, text}, i}
        <button on:click={() => itemSelected(id)} class="combobox-button">{text}</button>
        <br />
    {/each}
</div>
{:else}
<div class="continue">
    {#if correct}
        <button
            on:click={() => {
                $currentComboBox = 2;
            }}>Next</button
        >
    {/if}
</div>
{/if}

<style>
    .combobox-button {
        min-width: 20rem;
        max-width: 20rem;

        padding: 1rem;
        margin: .3rem;
    }

    .combobox-bg {
        background-color: #E0E0E0;
        border-radius: 8px;
        padding: 1rem;
    }
</style>