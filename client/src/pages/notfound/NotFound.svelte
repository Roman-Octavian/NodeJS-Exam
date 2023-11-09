<script>
    import Header from "../../components/header/Header.svelte";
</script>

<Header />

<main class="flex justify-center text-center h-screen bg-dp-background">
    <div class="flex flex-col self-center">
        <h1 class="text-center font-semibold text-dp-headline-5-m md:text-dp-headline-4-m lg:text-dp-headline-3-m xl:text-dp-headline-2-m 2xl:text-dp-headline-2-m mb-3">Route does not exist</h1>
        <img src="404.jpg" alt="404 error">
        <a class="text-blue-600 visited:text-purple-600 mt-5" href="/">Back to homepage</a>
    </div>
</main>