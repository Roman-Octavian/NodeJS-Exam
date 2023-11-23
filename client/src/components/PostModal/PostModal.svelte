<script>

  export let board;
  let files;

  let newPost = {
        title: '',
        content: '',
        image: 'https://api.cloudflare.com/client/v4/accounts/f14afe0b2659129950d14d6522ee41c7/images/v1',
        date_time: '',
        bump_order: 1,
        
    }


  async function uploadImage() {
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      const response = await fetch("http://localhost:8080/api/v1/upload_image", {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
    }
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
      <div class="mb-4">
          <label for="file" class="block text-gray-700 text-sm font-bold mb-2">
              Image:
          </label>
          <form action="/api/v1/upload_image" method="post" enctype="multipart/form-data">
            <input bind:files on:change={uploadImage} accept="image/png, image/jpeg, image/gif, image/webp, image/svg" type="file" name="file" />
          </form>
      </div>

  <div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Post
      </button>
  </div>
</form>