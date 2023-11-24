<script>
  import TailwindCss from './lib/TailwindCSS.svelte';
  // @ts-ignore
  import { Router, Route } from "svelte-routing";
  import NotFound from './pages/notfound/NotFound.svelte';
  import Home from './pages/home/Home.svelte';
  import Boards from './pages/boards/Boards.svelte';
  import Posts from './pages/posts/Posts.svelte';
  import Header from './components/Header/Header.svelte';
  import Login from './pages/login/Login.svelte';

  export let url = "";
</script>

<TailwindCss />

<Router {url}>
  <nav>
    <Header />
  </nav>
  <div>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/boards/:name" component={Boards} />
    <Route path="/boards/:name/posts/:id" component={Posts} />
    <Route path="/*" component={NotFound} />
  </div>
</Router>
