<script>
  // @ts-ignore
  import { navigate } from "svelte-routing";
  import { user } from '../../stores/userStore.js';
  // @ts-ignore
  import toast, { Toaster } from 'svelte-french-toast';
  
  let username = "";
  let password = "";
  async function handleSubmit() {
  const data = { username, password };
  
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const userData = await response.json();
      user.set(userData);
      navigate("/");
    } else {
      const error = await response.json();
      toast.error(error.message);
      console.error(error);
    }
  } catch (error) {
    toast.error(error);
    console.error(error);
  }
  }
  
  </script>

<Toaster />
  
  <div id="container">
    <form on:submit|preventDefault={handleSubmit} id="login">
        <h1>Moderator Login</h1>
        <label>
          Username:
          <input type="text" bind:value={username} />
        </label>
        <label>
          Password:
          <input type="password" bind:value={password} />
        </label>
        <button type="submit" class="button">Sign In</button>
    </form>
  </div>
  
  <style>
    #container {
      display: flex;
      height: 100%;
      justify-content: center;
      height: 100vh;
    }
    #login {
      display: flex;
      flex-direction: column;
      width: 50%;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      padding: 50px 50px;
      border-radius: 10px;
      
    }
    h1 {
      text-align: center;
      font-size: 5rem;
    }
    input {
      margin: 1em auto;
      width: 100%; 
      min-height: 3rem;
      border-radius: 3px; 
      margin-top: 8px;
      border: none;
      font-size: 20px;
      border-radius: 10px;
      padding: 0 10px;
    }
    label{
        font-size: 1.5rem;
    }
    .button {
      display: block;
      width: 25%;
      height: 2em;
      font-size: 1.4rem;
      cursor: pointer;
      border-radius: 10px;
    }
  </style>