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

<main class="bg-dp-background h-screen">
    <div class="flex w-screen justify-center pt-14 pb-14">
        <img src="logo.svg" width=64 height=64 alt="logo">
        <h1 class="flex self-center ml-5 text-center font-semibold text-dp-headline-5-m md:text-dp-headline-4-m lg:text-dp-headline-3-m xl:text-dp-headline-2-m 2xl:text-dp-headline-2-m mb-3">
            Imageboard
        </h1>
    </div>
    <div class="flex justify-center mb-4">
        <div class="border border-slate-950 w-2/4 ">
            <div class="p-1.5 w-full bg-[#9988EE]">
                <h2 class="font-semibold">What is an imageboard?</h2>
            </div>
            <div class="bg-white p-1.5">
                <p>
                    Imageboards, similar to bulletin board systems, are a type of Internet forum that focuses on the posting of images, often alongside text and discussion. The first imageboards were created in Japan as an extension of the textboard concept.
                        <br><br>
                    Imageboards are transitory with content—on some boards (especially highly trafficked ones), the thread deletion time can be as little as 10 minutes. In Japan, where imageboards are more common, topics will vary widely, ranging from trains to current news. The most popular and notorious English language imageboard, 4channel which this website takes heavy inspiration from, similarly has a large variety of topics.
                </p>
            </div>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="border border-slate-950 w-2/4 ">
            <div class="p-1.5 w-full bg-[#9988EE]">
                <h2 class="font-semibold">Boards</h2>
            </div>
            <div class="bg-white p-5 flex flex-col">
                {#each boards as board}
                <a class="text-blue-600 visited:text-purple-600 hover:text-blue-500" href={"/boards/" + board.name.toLowerCase()}>
                    {board.name.charAt(0).toUpperCase() + board.name.slice(1)}
                </a>
                {:else}
                <p>No boards exist</p>
                {/each}
            </div>
        </div>
    </div>
</main>
