<script>
    import { onMount } from 'svelte';

    let boards = [];

    onMount(async () => {
        const response = await fetch("http://localhost:8080/api/v1/boards");
        boards = await response.json();
        boards = boards.data;
        // Sort alphabetically
        boards.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    });
</script>

<div class="p-3 flex">
    {#each boards as board}
    <p class="mx-1">
        {'['}
        <a class="text-blue-600 hover:text-purple-600" href={"/boards/" + board.name.toLowerCase()}>
            {board.name.charAt(0).toUpperCase() + board.name.slice(1)}
        </a>
        {']'}
    </p>
    {:else}
    <p>No boards exist</p>
    {/each}
    
    <p class="mx-1">
        {'['}
        <a class="text-red-600 hover:text-purple-600" href={"/"}>Home</a>
        {']'}
    </p>
</div>
