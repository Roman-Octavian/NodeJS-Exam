<script>
  import TailwindCss from './lib/TailwindCSS.svelte';
  import { Route, Router } from 'svelte-navigator';
  import NotFound from './pages/notfound/NotFound.svelte';
  import Home from './pages/home/Home.svelte';
  import Boards from './pages/boards/Boards.svelte';
</script>

<TailwindCss />

<Router>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/boards/*">
    <Boards />
  </Route>
  <Route path="/*">
    <NotFound />
  </Route>
</Router>
