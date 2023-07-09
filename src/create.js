
//user URL
const userUrl = "http://localhost:3000/user"
const postUrl = "http://localhost:3000/posts" 
//Fetch users data 
async function fetchFunction(){
const data = await fetch(userUrl)
    .then(res => res.json())
    .then(data => {
     
    })
    .catch(error => console.error(error));
}
async function fetchData(userUrl) {
  console.log('waiting')
  try {
    const response = await fetch(userUrl);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    console.log('complete')
    usersData(data)
    return data;
  } catch (error) {
    console.error(error);
    // You can handle the error as per your requirements
    throw error;
  }
  
}
fetchData(userUrl)
CKEDITOR.replace('editor');
       var btn = document.querySelector('.btn')
       btn.addEventListener('click', _ =>{
        var editorData = CKEDITOR.instances.editor.getData();
            /* console.log('Text from editor:', editorData); */
            createDemePost(editorData)
       })

//make demo post
function createDemePost(editorData){
    const demoBlog = document.querySelector('.blog-body')
    demoBlog.innerHTML = editorData
    handlePostSRC()
    showPostBtn()
}

//handle post scr
function handlePostSRC(editorData){
    /* if(editorData.includes('img')){ */
        const newEl = document.querySelector('.blog-body')
        if(newEl.innerHTML.includes("img")){
            const image = newEl.querySelector('img')
            image.setAttribute("style", "")
            
        }
       
    /* } */
}

//Theme section

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
handleTheme()

//post 
function showPostBtn(){
const newBlogBody = document.querySelector('.blog-body')
const postBtn = document.querySelector('.btn2')
    if(newBlogBody.childElementCount > 0){
        postBtn.classList.add('show-post-btn')
    }
}

//Post data to server 



function usersData(data){

    const postBtn = document.querySelector('.btn2')
    postBtn.addEventListener('click', _ =>{
      console.log("clicked")
        if (localStorage.getItem('user') !== null) {
            const userName = localStorage.getItem('user');
            const startIndex = 1
            for (let i = 0; i < data.length; i++) {
              const obj = data[i];
              if (userName in obj) {
                obj.post.forEach((item, index) => {
                    item.id = startIndex + index;
                  });
                const id = obj.id
                const postArray = obj.post
                const author = localStorage.getItem('user')
                const demoBlog = document.querySelector('.blog-body')
                const postSrc = demoBlog.innerHTML
                const profile = obj[userName].profile
                const newPost = {content: postSrc, author: author, profile: profile, postId: 0}
                postArray.unshift(newPost)
                postData(id, postArray, author, profile, postSrc)
              }
              
            }
          }
          
    })
    function postData(id, postArray, author, profile, postSrc) {
        fetch(`${postUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author: author, profile: profile, content: postSrc })
        })
            .then(res => res.json())
            .then(result => {
                postIdToUser(result);
            })
            .catch(error => console.error(error));
    
        function postIdToUser(result) {
            postArray[0].postId = result.id;
            fetch(`${userUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ post: postArray })
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }
    }
}    
/* localStorage.setItem('user', 'sam')
console.log("set") */