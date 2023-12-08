<script>
    import { currentComboBox } from "./data.js";
</script>

<p>
    Welcome to the ComboBox design study! You will be shown a word you should
    select from the displayed combo box. Please press the button below to start
    the user study if you are ready.
</p>

<button
    on:click={() => {
        $currentComboBox = 1;
    }}
>
    Start!
</button>
