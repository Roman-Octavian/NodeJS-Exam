<script>
    import { onMount } from 'svelte';

    let currentBoardName = "";
    let board = {};
    let posts = [];

    onMount(async () => {
        currentBoardName = window.location.pathname.split("/")[2];
        console.log(currentBoardName);
        const response = await fetch("http://localhost:8080/api/v1/boards/" + currentBoardName);
        board = await response.json();
        board = board.data[0];
        
        const result = await fetch("http://localhost:8080/api/v1/posts/" + board.id);
        posts = await result.json();
        posts = posts.data;
    });

    function handleImageResize(event) {
        if (event.target.style.scale != "1") {
            event.target.style.scale = "1";
        } else event.target.style.scale = "0.15";
    }
    
</script>

<main class="bg-dp-background h-screen">
    <div class="flex w-screen justify-center pt-14">
        <h1 class="flex self-center ml-5 text-center text-red-600 font-semibold text-dp-headline-5-m md:text-dp-headline-4-m lg:text-dp-headline-3-m xl:text-dp-headline-2-m 2xl:text-dp-headline-2-m mb-3">
            {#if board.name}
                {"/" + board.name.charAt(0).toUpperCase() + board.name.slice(1) + "/"}
            {/if}
        </h1>
    </div>

    <div class="grid grid-flow-col auto-rows-max auto-cols-max bg-slate-500">
        {#each posts as post}
        <div>
            <p>File: <a target="blank" href={post.image} class="text-blue-600 hover:text-purple-600">
                Original Image
            </a></p>
            <img on:click={handleImageResize} on:keydown={handleImageResize} style="scale: 0.15; transform-origin: left top;" class="cursor-pointer shadow-lg" src={post.image} alt={post.title}>
        </div>
        <p class="mx-1">
            {post.title}
        </p>
        
        {:else}
        <div class="flex w-screen justify-center pt-14">
            <p class="flex self-center ml-5 text-center">No posts available</p>
        </div>
        {/each}
    </div>
</main>