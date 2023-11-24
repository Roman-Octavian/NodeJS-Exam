<script>
    import { onMount } from 'svelte';
    import ReplyModal from '../../components/ReplyModal/ReplyModal.svelte';
    import { get } from 'svelte/store'
    import { user } from '../../stores/userStore.js'
      // @ts-ignore
    import { navigate } from "svelte-routing";
      // @ts-ignore
    import toast, { Toaster } from 'svelte-french-toast';

    let currentBoardName = "";
    let currentPostID = ""
    let board = {};
    let post = {};
    let replies = [];

    let open = false;
    let expandedImage = false;
    let imageSelectedID = '';

    onMount(async () => {
        currentBoardName = window.location.pathname.split("/")[2];
        currentPostID = window.location.pathname.split('/').pop();
        const response = await fetch("http://localhost:8080/api/v1/boards/" + currentBoardName);
        board = await response.json();
        board = board.data[0];
        
        const result = await fetch("http://localhost:8080/api/v1/boards/" + currentBoardName + "/posts/" + currentPostID);
        post = await result.json();
        post = post.data[0];

        const fetchReplies = await fetch("http://localhost:8080/api/v1/replies/" + currentPostID);
        replies = await fetchReplies.json();
        replies = replies.data;
    });

    async function deletePost() {
        const response = await fetch("http://localhost:8080/api/v1/mods/posts/" + currentPostID, {
            method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
            navigate(`/boards/${currentBoardName}`);
        } else {
            toast.error("Could not delete post");   
        }
    }

    function handleImageResize(id) {
        expandedImage = !expandedImage;
        imageSelectedID = id;
    }

    function toggleModal() {
        open = !open;
    }

    
</script>

<Toaster />

<main class="bg-dp-background h-screen">
    {#if open}
        <ReplyModal postProp={post}/>
    {/if}

    <div class="flex flex-col gap-4 w-screen justify-center pt-14">
        <h1 class="flex self-center ml-5 text-center text-red-600 font-semibold text-dp-headline-5-m md:text-dp-headline-4-m lg:text-dp-headline-3-m xl:text-dp-headline-2-m 2xl:text-dp-headline-2-m mb-3">
            {#if board.name}
                {"/" + board.name.charAt(0).toUpperCase() + board.name.slice(1) + "/"}
            {/if}
        </h1>
        <button on:click={toggleModal} class="flex self-center bg-red-500 hover:bg-red-600 rounded text-dp-bodytext-m-dt px-6 py-3 text-white">
            {!open ? "Reply" : "Close"}
        </button>
        {#if get(user)}
        <button on:click={deletePost} class="flex self-center bg-red-800 hover:bg-red-900 rounded text-dp-bodytext-m-dt px-6 py-3 text-white">
            Delete
        </button>
        {/if}
        <hr class="border-solid border-t-[1px] border-sky-900" />
            <div class={"flex p-10" + (expandedImage && imageSelectedID === post.id ? " flex-col" : " flex-row")}>
                <div>
                    <p class="text-xs whitespace-nowrap">File: <a target="blank" href={post.image_original} class="text-blue-600 hover:text-purple-600 text-xs md:text-sm whitespace-nowrap">
                        Original Image
                    </a></p>
                    <img id={post.id} on:click={() => {handleImageResize(post.id)}} on:keydown={() => {handleImageResize(post.id)}} class="cursor-pointer shadow-2xl" src={expandedImage && imageSelectedID === post.id ? post.image_original : post.image_thumbnail} alt={post.title}>
                </div>
                <div class="ml-5 pt-4">
                    <div class="flex flex-row flex-wrap gap-2">
                        <h2 class="text-blue-900 font-semibold line-clamp line-clamp-2 origin-top-left text-ellipsis break-all">
                            {post.title}
                        </h2>
                        <h3 class="text-green-800 font-semibold line-clamp line-clamp-2 origin-top-left text-ellipsis overflow-hidden">
                            Anonymous
                        </h3>
                        <h3 class="text-gray-600 font-semibold line-clamp line-clamp-2 origin-top-left text-ellipsis overflow-hidden">
                            {new Date(post.date_time).toLocaleDateString("en-GB", {hour: 'numeric', minute: "numeric", second: "numeric", timeZone: 'EET'})}
                        </h3>
                    </div>
                    <p class="text-ellipsis line-clamp line-clamp-5 break-all whitespace-pre-line mt-4">{post.text}</p>
                </div>
            </div>

            
            <hr class="border-solid border-t-[1px] border-sky-900" />


            {#each replies as reply (reply.id)}
            <div class={"flex bg-[#d6daf0] p-10" + (expandedImage && imageSelectedID === reply.id ? " flex-col" : " flex-row")}>
                {#if reply.image_thumbnail}
                <div>
                    <p class="text-xs whitespace-nowrap">File: <a target="blank" href={reply.image_original} class="text-blue-600 hover:text-purple-600 text-xs md:text-sm whitespace-nowrap">
                        Original Image
                    </a></p>
                    <img id={reply.id} on:click={() => {handleImageResize(reply.id)}} on:keydown={() => {handleImageResize(reply.id)}} class="cursor-pointer shadow-2xl" src={expandedImage && imageSelectedID === reply.id ? reply.image_original : reply.image_thumbnail} alt={reply.text}>
                </div>
                {/if}
                    <div class="ml-5 pt-4"> 
                        <div class="flex flex-row flex-wrap gap-2">
                        <h3 class="text-green-800 font-semibold line-clamp line-clamp-2 origin-top-left text-ellipsis overflow-hidden">
                            Anonymous
                        </h3>
                        <h3 class="text-gray-600 font-semibold line-clamp line-clamp-2 origin-top-left text-ellipsis overflow-hidden">
                            {new Date(reply.date_time).toLocaleDateString("en-GB", {hour: 'numeric', minute: "numeric", second: "numeric", timeZone: 'EET'})}
                        </h3>
                    </div>
                    <p class="text-ellipsis line-clamp line-clamp-5 break-all whitespace-pre-line mt-4">{reply.text}</p>
                </div>
            </div>
            {:else}
                <div class="flex justify-center pt-14">
                    <p class="flex self-center text-center">No replies yet</p>
                </div>
            {/each}
    </div>
</main>