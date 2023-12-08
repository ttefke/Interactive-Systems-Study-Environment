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

    onMount(() => {
        startTime = new Date().getTime();
    });

    function itemSelected() {
        studyData.defaultRequiredTime = new Date().getTime() - startTime;
        studyData.defaultAttempts++;
        correct = selected.id === optionsData.randomOption.id;
    }
</script>

<p>'{optionsData.randomOption.text}'</p>

<div class="instrumentedUIElement">
    <select bind:value={selected} on:change={itemSelected}>
        {#each optionsData.options as option}
            <option value={option}>{option.text}</option>
        {/each}
    </select>
</div>

<div class="continue">
    {#if correct}
        <button
            on:click={() => {
                $currentComboBox = 2;
            }}>Next</button
        >
    {/if}
</div>
