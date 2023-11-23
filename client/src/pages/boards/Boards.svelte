<script>
    import { onMount } from 'svelte';
    import PostModal from '../../components/PostModal/PostModal.svelte';

    let currentBoardName = "";
    let board = {};
    let posts = [];
    let open = false;

    onMount(async () => {
        currentBoardName = window.location.pathname.split("/").pop();
        const response = await fetch("http://localhost:8080/api/v1/boards/" + currentBoardName);
        board = await response.json();
        board = board.data[0];
        
        const result = await fetch("http://localhost:8080/api/v1/posts/" + board.id);
        posts = await result.json();
        posts = posts.data;
    });

    function toggleModal() {
        open = !open;
    }
    
</script>

<main class="bg-dp-background h-screen">
    {#if open}
        <PostModal board={board} />
    {/if}

    <div class="flex flex-col w-screen justify-center pt-14">
        <h1 class="flex self-center text-center text-red-600 font-bold text-dp-headline-5-m md:text-dp-headline-4-m lg:text-dp-headline-3-m xl:text-dp-headline-2-m 2xl:text-dp-headline-2-m mb-3">
            {#if board.name}
                {"/" + board.name.charAt(0).toUpperCase() + board.name.slice(1) + "/"}
            {/if}
        </h1>
        <button on:click={toggleModal} class="flex self-center bg-red-500 hover:bg-red-600 rounded text-dp-bodytext-m-dt px-6 py-3 text-white">
            {!open ? "New Thread" : "Close"}
        </button>
    </div>

    <div class="grid justify-items-center w-screen gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
        {#each posts as post}
        <a href={"/boards/" + board.name.toLowerCase() + "/posts/" + post.id}>
            <div class="p-10">
                <p>File: <a target="blank" href={post.image} class="text-blue-600 hover:text-purple-600">
                    Original Image
                </a></p>
                <img class="grid cursor-pointer shadow-2xl w-[128px] h-[128px]" src={post.image} alt={post.title}>
                <h2 class="font-semibold line-clamp line-clamp-2 origin-top-left text-ellipsis overflow-hidden">
                    {post.title}
                </h2>
                <p class="text-ellipsis line-clamp line-clamp-5 overflow-hidden">{post.content}</p>
            </div>
        </a>
        
        {:else}
        <div class="flex w-screen justify-center pt-14">
            <p class="flex self-center ml-5 text-center">No posts available</p>
        </div>
        {/each}
    </div>

</main>

