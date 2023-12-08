<script>
  import Default from "./lib/Default.svelte";
  import End from "./lib/End.svelte";
  import Enhanced from "./lib/Enhanced.svelte";
  import Start from "./lib/Start.svelte";
  import { currentComboBox } from "./lib/data.js";
</script>

{#if $currentComboBox == 0}
  <Start />
{:else if $currentComboBox == 1}
  <Default />
{:else if $currentComboBox == 2}
  <Enhanced />
{:else if $currentComboBox == 3}
  <End />
{/if}
