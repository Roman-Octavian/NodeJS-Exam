<script>
    import { onMount } from 'svelte';
    import Header from '../../components/header/Header.svelte';

    let currentBoardName = "";
    let board = {};
    let posts = [];

    onMount(async () => {
        currentBoardName = window.location.pathname.split("/").pop();
        const response = await fetch("http://localhost:8080/api/v1/boards/" + currentBoardName);
        board = await response.json();
        board = board.data[0];
        
        const result = await fetch("http://localhost:8080/api/v1/posts/" + board.id);
        posts = await result.json();
        posts = posts.data;
    });

    let newPost = {
        title: '',
        content: '',
        image: 'https://imagedelivery.net/1jN-KQZ8sO6yQU2_wmkZvA/2f26ec05-3cda-4b38-62db-0130538a6000/public',
        date_time: '',
        bump_order: 1,
        
    }

    async function post() {
        newPost.date_time = new Date().toISOString().slice(0, -1);
        newPost.image = 'https://imagedelivery.net/1jN-KQZ8sO6yQU2_wmkZvA/2f26ec05-3cda-4b38-62db-0130538a6000/public';
        newPost.boards_id = board.id;
        try {
            const response = await fetch('http://localhost:8080/api/v1/posts', {
                method: 'Post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPost)
            });
            if (response.ok) {

            } else {

            }
        } catch (exception) {

        }
    }
    
</script>

<Header />

<main class="bg-dp-background h-screen">

    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={post}>
        <h2>New Post</h2>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                Title:
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" bind:value={newPost.title} />
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                Content:
            </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" placeholder="Content" type="textarea" bind:value={newPost.content} />
        </div>

        <form
            action="https://upload.imagedelivery.net/1jN-KQZ8sO6yQU2_wmkZvA/880f8531-d94f-4e51-7428-388669c98001"
            method="post"
            enctype="multipart/form-data"
        >
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                    Image:
                </label>
                <input id="image" type="file" name="file" />
                <input type="submit" />
            </div>
        </form>
    
        <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Post
            </button>
        </div>
    </form>

    <div class="flex flex-col w-screen justify-center pt-14">
        <h1 class="flex self-center text-center text-red-600 font-bold text-dp-headline-5-m md:text-dp-headline-4-m lg:text-dp-headline-3-m xl:text-dp-headline-2-m 2xl:text-dp-headline-2-m mb-3">
            {#if board.name}
                {"/" + board.name.charAt(0).toUpperCase() + board.name.slice(1) + "/"}
            {/if}
        </h1>
        <button class="flex self-center bg-red-500 hover:bg-red-600 rounded text-dp-bodytext-m-dt px-6 py-3 text-white">
            New Thread
        </button>
    </div>

    <div class="grid justify-items-center w-screen gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
        {#each posts as post}
        <div class="p-10">
            <p>File: <a target="blank" href={post.image} class="text-blue-600 hover:text-purple-600">
                Original Image
            </a></p>
            <img class="grid cursor-pointer shadow-2xl w-[128px] h-[128px]" src={post.image} alt={post.title}>
            <h2 class="font-semibold line-clamp line-clamp-2 origin-top-left text-ellipsis overflow-hidden ...">
                {post.title}
            </h2>
            <p class="text-ellipsis line-clamp line-clamp-5 overflow-hidden ...">{post.content}</p>
        </div>
        
        {:else}
        <div class="flex w-screen justify-center pt-14">
            <p class="flex self-center ml-5 text-center">No posts available</p>
        </div>
        {/each}
    </div>

</main>

