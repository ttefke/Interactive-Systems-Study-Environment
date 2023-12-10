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
        studyData.enhancedLetters =
            document.getElementById("fruit").value.length;
        studyData.enhancedRequiredTime = new Date().getTime() - startTime;
        studyData.enhancedAttempts++;
        correct = selected === optionsData.randomOption.text;
    }
</script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/uswds/3.7.1/js/uswds-init.min.js"
    ></script>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/uswds/3.7.1/css/uswds.min.css"
    />
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/uswds/3.7.1/js/uswds.min.js"
    ></script>
</svelte:head>

<label class="usa-label" for="fruit">'{optionsData.randomOption.text}'</label>

<div class="instrumentedUIElement">
    <div class="usa-combo-box">
        <select
            class="usa-select"
            name="fruit"
            id="fruit"
            bind:value={selected}
            on:change={itemSelected}
        >
            {#each optionsData.options as option}
                <option value={option.text}>{option.text}</option>
            {/each}
        </select>
    </div>
</div>

<div class="continue">
    {#if correct}
        <button
            on:click={() => {
                $currentComboBox = 3;
            }}>Next</button
        >
    {/if}
</div>
