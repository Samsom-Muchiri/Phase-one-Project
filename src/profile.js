// Theme section
function handleTheme() {
  const nav = document.querySelector('.nav');
  const blog = document.querySelectorAll('.blog');
  const themeButton = document.querySelectorAll('.theme');
  themeButton.forEach(i =>{
  const storedTheme = localStorage.getItem('theme')
  if(storedTheme === "dark"){
      i.classList.remove('fa-moon-o');
      i.classList.add('fa-sun-o');
      document.documentElement.style.setProperty("--body-color", 'rgb(30,30,30)');
      document.documentElement.style.setProperty("--fa-color", 'rgb(218, 214, 214)');
      document.documentElement.style.setProperty("--font-color", 'rgb(218, 214, 214)');
      document.documentElement.style.setProperty("--comments-color", 'rgb(20, 25, 19)');
      document.documentElement.style.setProperty("--nav-color", 'rgb(45,45,48)');
      document.documentElement.style.setProperty("--blog-color", 'rgb(37,40,38)');
      nav.style.boxShadow = "";
      blog.forEach(div => {
        div.style.border = "";
      });
  }else{
    i.classList.remove('fa-sun-o');
      i.classList.add('fa-moon-o');
      document.documentElement.style.setProperty("--body-color", '#f6f6f6');
      document.documentElement.style.setProperty("--fa-color", 'rgb(57, 56, 56)');
      document.documentElement.style.setProperty("--font-color", 'rgb(42, 40, 40)');
      document.documentElement.style.setProperty("--comments-color", '#f6f6f6');
      document.documentElement.style.setProperty("--nav-color", '#ececec');
      document.documentElement.style.setProperty("--blog-color", '#ffffff');
      nav.style.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.2)";
      blog.forEach(div => {
        div.style.border = "solid 1px rgba(128, 128, 128, 0.4)";
      });
  }
  i.addEventListener('click', _ => {
    if (i.classList.contains('fa-sun-o')) {
      localStorage.setItem('theme', 'light')
      i.classList.remove('fa-sun-o');
      i.classList.add('fa-moon-o');
      document.documentElement.style.setProperty("--body-color", '#f6f6f6');
      document.documentElement.style.setProperty("--fa-color", 'rgb(57, 56, 56)');
      document.documentElement.style.setProperty("--font-color", 'rgb(42, 40, 40)');
      document.documentElement.style.setProperty("--comments-color", '#f6f6f6');
      document.documentElement.style.setProperty("--nav-color", '#ececec');
      document.documentElement.style.setProperty("--blog-color", '#ffffff');
      nav.style.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.2)";
      blog.forEach(div => {
        div.style.border = "solid 1px rgba(128, 128, 128, 0.4)";
      });
    } else {
      localStorage.setItem('theme', 'dark')
      i.classList.remove('fa-moon-o');
      i.classList.add('fa-sun-o');
      document.documentElement.style.setProperty("--body-color", 'rgb(30,30,30)');
      document.documentElement.style.setProperty("--fa-color", 'rgb(218, 214, 214)');
      document.documentElement.style.setProperty("--font-color", 'rgb(218, 214, 214)');
      document.documentElement.style.setProperty("--comments-color", 'rgb(20, 25, 19)');
      document.documentElement.style.setProperty("--nav-color", 'rgb(45,45,48)');
      document.documentElement.style.setProperty("--blog-color", 'rgb(37,40,38)');
      nav.style.boxShadow = "";
      blog.forEach(div => {
        div.style.border = "";
      });
    }
  });
})
}

handleTheme();

const userUrl = "http://localhost:3000/user";
const postUrl = "http://localhost:3000/posts";

// Fetch users
const usersData = fetch(userUrl)
  .then(res => res.json());

// Fetch posts
const postsData = fetch(postUrl)
  .then(res => res.json());

Promise.all([usersData, postsData])
  .then(([userData, postData]) => {
    // Process the data from both APIs
    
    const data = userData;
    appendPosts(data, postData);
    addImage(data, postData);
    console.log(userData)
  })
  .catch(error => console.error('Error fetching data:', error));

function appendPosts(data) {
  const postsDiv = document.querySelector('.blog-container');
  let postIndex = 0;
  let newEl = "";

  for (let i = 0; i < data.length; i++) {
    if (localStorage.getItem('user') !== null) {
      const obj = data[i];
      postIndex++;
      const user = localStorage.getItem('user');
      if (user in obj) {
        const userNmae = document.querySelector('.username')
        userNmae.innerText = obj[user].username
        const largeProfile = document.querySelector('.p-image');
        largeProfile.setAttribute("src", `${obj[user].profile}`);
        const postObj = obj.post;

        for (let j = 0; j < postObj.length; j++) {
          const postArray = postObj[j];
          const id = postArray.id;
          const postDiv = `
            <div class="blog">
              <div class="blog-body">${postArray.content}</div>
              <div class="blog-feedback">
                <span class="fb more"></span>
                <span>
                  <div class="dots"><i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <div class="delete" data-count="${j}"><i class="fa fa-trash" aria-hidden="true"></i></div>
                  </div>
                </span>
              </div>
            </div>
          `;
          const postWrapper = document.createElement('div');
          postWrapper.innerHTML = postDiv;
          newEl += postWrapper.innerHTML;
        }
      }
    } else {
      const logForm = document.querySelector('.log-form-wrapper');
      logForm.style.display = 'flex';
    }
  }

  postsDiv.innerHTML += newEl;
  showReadMore();
  addDeleteListeners(data);
}

function addDeleteListeners(data) {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const postId = e.target.getAttribute('data-count');
      const userIndex = data.findIndex(obj => localStorage.getItem('user') in obj);
      
      if (userIndex !== -1) {
        const user = data[userIndex];
        const postArray = user.post;
        
        if (postId >= 0 && postId < postArray.length) {
          const idOnPost = postArray[postId]
          postArray.splice(postId, 1);
          
          fetch(`${userUrl}/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post: postArray })
          })
            .then(response => {
              if (response.ok) {
                console.log('Item deleted successfully');
              } else {
                console.log('Failed to delete item');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
          fetch(`${postUrl}/${idOnPost.postId}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.ok) {
                console.log('Item deleted successfully');
              } else {
                console.log('Failed to delete item');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      }
    }
  });
}

function showReadMore() {
  const blogBody = document.querySelectorAll('.blog-body');
  for (let i = 0; i < blogBody.length; i++) {
    const body = blogBody[i];
    if (body.clientHeight > 400) {
      const readMore = body.parentElement.querySelector('.more');
      readMore.innerText = 'Read More';
      readMore.addEventListener('click', _ => {
        const blog = body.parentElement;
        if (blog.classList.contains('maximize-blog')) {
          blog.classList.remove('maximize-blog');
          readMore.innerText = 'Read More';
        } else {
          blog.classList.add('maximize-blog');
          readMore.innerText = 'Close';
          body.style.marginBottom = '35px';
        }
      });
    }
  }
}

// Adding new profile image
function addImage(data, postData) {
  const cameraIcon = document.querySelector('.add-img');
  const imageFormContainer = document.querySelector('.add-img-url');
  const closeFormIcon = document.querySelector('.close-form');
  cameraIcon.addEventListener('click', _ => {
    imageFormContainer.style.display = "grid";
  });
  closeFormIcon.addEventListener('click', _ => {
    imageFormContainer.style.display = "none";
  });

  const addImageForm = document.querySelector('.img-form');
  addImageForm.addEventListener('submit', e => {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const user = localStorage.getItem('user');
      if (user in obj) {
        const url = document.querySelector('.url-value').value;
        const name = localStorage.getItem('user');
        obj[name].profile = url;
        const id = obj.id;
        
        fetch(`${userUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
          .then(res => res.json())
          .catch(error => console.error(error));

        updataImgInPost(postData, url);
      }
    }
  });
}

function updataImgInPost(postData, url) {
  for (let i = 0; i < postData.length; i++) {
    const obj = postData[i];
    if (obj.author === localStorage.getItem('user')) {
      obj.profile = url;
      fetch(`${postUrl}/${obj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
        .then(res => res.json())
        .catch(error => console.error(error));
    }
  }
}
