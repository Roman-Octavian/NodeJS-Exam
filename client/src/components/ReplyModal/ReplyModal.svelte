<script>
    export let postProp;
    let files;

    let newReply = {
        text: '',
        image_original: null,
        image_thumbnail: null,
        date_time: '',
        posts_id: '',
    }

    let uploadOK = true;


    async function uploadImage() {
        try {
            uploadOK = false;
            const formData = new FormData();
            formData.append('file', files[0]);
            const response = await fetch("http://localhost:8080/api/v1/upload_image", {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                newReply.image_thumbnail = data.data.result.variants.filter((variant) => variant.split('/').pop() === 'thumbnail');
                newReply.image_original = data.data.result.variants.filter((variant) => variant.split('/').pop() === 'original');
                uploadOK = true;
            }
        } catch (error) {
            console.error(error);
        }
    } 

  async function post() {
        newReply.date_time = new Date().toISOString().slice(0, -1);
        newReply.posts_id = postProp.id;
        console.log(newReply);
        try {
            const response = await fetch('http://localhost:8080/api/v1/replies', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newReply)
            });
            if (response.ok) {
                window.onbeforeunload = null;
                window.location.reload();
            } else {

            }
        } catch (exception) {
            console.error(exception);
        }
    }
</script>

<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={post}>
  <h2>Reply in thread:</h2>
  <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
          Text:
      </label>
          <textarea class="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="text" placeholder="Your reply..." bind:value={newReply.text} />
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
      <button disabled={!uploadOK} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed" type="submit">
          Post
      </button>
  </div>
</form>