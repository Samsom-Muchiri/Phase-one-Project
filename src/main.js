//Fetch users
const url = "http://localhost:3000/user"

fetch(url)
    .then(res => res.json())
    .then(data => {
        checkPosts(data)
    })
    .catch(error => console.error(error));

//Check posts

function checkPosts(data){
    console.log(data)
    if('post' in data){
        console.log(data)
    }
}
document.addEventListener("DOMContentLoaded", _ =>{
   runCommentFunctions()
   runStylingFunctions()
   checkUser()
   addUser()
})

function runStylingFunctions(){
    handleLike()
    handleTheme()
    showReadMore()
}

function runCommentFunctions(){
    closeComments()
    openComments()
    addComment()
}

function closeComments(){
    const closeComments = document.querySelectorAll('.fa-times')
    for (let i = 0; i < closeComments.length; i++){
        const btn = closeComments[i]
        btn.addEventListener('click', e =>{
            const btnIcon = e.target
            const commentsSection = btnIcon.parentElement.parentElement
            commentsSection.classList.remove('show-comments')
        })
    }
}

function openComments(){
    const commentIcon = document.querySelectorAll('.fa-comment')
    for (let i = 0; i < commentIcon.length; i++){
        const btn = commentIcon[i]
        btn.addEventListener('click', e =>{
            const opentCommentBtn = e.target
            const blog = opentCommentBtn.parentElement.parentElement.parentElement
            const commentsSection = blog.querySelector('.comment')
            commentsSection.classList.add('show-comments')
        })
    }
}

function addComment() {
    const forms = document.querySelectorAll('.form');
    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      form.addEventListener("submit", e => {
        e.preventDefault();
        const formw = e.target;
        console.log("awoo"); // Log the clicked form
        createComment(formw)
      });
    }
  }
  
  
  
function createComment(formw){
    const inputValue = formw.querySelector('.comment-input').value;
    const blog = formw.parentElement.parentElement;
    const userProfile = blog.querySelector('.user-profile');
    const userName = userProfile.getAttribute('title');
    const newComment = `
    <div class="user-comment">
        <div class="comments">
            <div class="profile"><img src="${userProfile.src}" alt=""></div>
            <div>
                <div class="user"><br>${userName}</div>
                <div class="comment-body"><p>${inputValue}</p></div>
            </div>
        </div>
    </div>
    `;
    const commentDiv = blog.querySelector('.comment-wrapper');
    commentDiv.insertAdjacentHTML('afterbegin', newComment);
} 

//like

function handleLike(){
    const blogSection = document.querySelector('.blogs')
    const feedBackDiv = "blog-feedback"
    blogSection.addEventListener('click', e =>{
        const icon = e.target
        if(icon.parentElement.parentElement.classList.contains(feedBackDiv)){
            const parentDiv = icon.parentElement.parentElement
            const thumbsUp = parentDiv.querySelector('.fa-thumbs-up')
            const thumbsDown = parentDiv.querySelector('.fa-thumbs-down')
           if(icon.classList.contains('fa-thumbs-down')){
            icon.style.color = "blue"
            thumbsUp.style.color = ""
           }
           if(icon.classList.contains('fa-thumbs-up')){
            icon.style.color = "blue"
            thumbsDown.style.color = ""
           }
        }
    })
}

//Theme section

function handleTheme(){
    const themeButton = document.querySelector('.theme')
    const nav = document.querySelector('.nav')
    const blog = document.querySelectorAll('.blog')
    themeButton.addEventListener('click', _ =>{
        if(themeButton.classList.contains('fa-sun-o')){
            themeButton.classList.remove('fa-sun-o')
            themeButton.classList.add('fa-moon-o')
            document.documentElement.style.setProperty("--body-color", '#f6f6f6')
            document.documentElement.style.setProperty("--fa-color", 'rgb(57, 56, 56)')
            document.documentElement.style.setProperty("--font-color", 'rgb(42, 40, 40)')
            document.documentElement.style.setProperty("--comments-color", '#f6f6f6')
            document.documentElement.style.setProperty("--nav-color", '#ececec')
            document.documentElement.style.setProperty("--blog-color", '#ffffff')
            nav.style.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.2)"
            console.log(blog)
            blog.forEach(div => {
                div.style.border = "solid 1px rgba(128, 128, 128, 0.4)"
            });
        }else{
            themeButton.classList.remove('fa-moon-o')
            themeButton.classList.add('fa-sun-o')
            document.documentElement.style.setProperty("--body-color", '')
            document.documentElement.style.setProperty("--fa-color", '')
            document.documentElement.style.setProperty("--font-color", '')
            document.documentElement.style.setProperty("--comments-color", '')
            document.documentElement.style.setProperty("--nav-color", '')
            document.documentElement.style.setProperty("--blog-color", '')
            nav.style.boxShadow = ""
            blog.forEach(div => {
                div.style.border = ""
            });
        }
    })
}

//Show read more

function showReadMore(){
    const blogBody = document.querySelectorAll('.blog-body')
    for(let i = 0; i < blogBody.length; i++){
        const body = blogBody[i]
        if(body.clientHeight > 450){
            const readMore = body.parentElement.querySelector('.more')
            readMore.innerText = 'Read More'
            readMore.addEventListener('click', _ =>{
                const blog = body.parentElement
                if(blog.classList.contains('maximize-blog')){
                    blog.classList.remove('maximize-blog')
                    readMore.innerText = 'Read More'
                }else{
                    blog.classList.add('maximize-blog')
                    readMore.innerText = 'Close'
                    body.style.marginBottom = '35px'
                }
            })  
        }   
    }
}

//Check user

function checkUser(){
    const createLink = document.querySelector('.create-link')
    const logForm = document.querySelector('.log-form-wrapper')
    createLink.addEventListener('click', e =>{
        e.preventDefault()
       if(localStorage.getItem('user') !== null){
            sendUserToCreatB(e)
        }else{
            logForm.style.display = 'flex'
        }
    })
}

function sendUserToCreatB(e){
    window.location.href = e.target.parentElement.href
}

//Add user 

function addUser(){
    const form = document.querySelector('.log-form')
    form.addEventListener('submit', e =>{
        e.preventDefault()
        const userName = document.querySelector('#user-name').value
        const email = document.querySelector('#email').value
        const pwd = document.querySelector('#pwd').value
        const repeatPwd = document.querySelector('#repeat-pwd').value
        if(pwd === repeatPwd){
            const userData = userName
            localStorage.setItem("user", userData)
            checkUserInLS()
            addUserToServer(userName, email, pwd)
        }else{
            const errorMessage = document.querySelector('.status')
            errorMessage.innerHTML = '<p>Error! Pasword dont match</p>'
        }
    })
}


function checkUserInLS(){
    const logForm = document.querySelector('.log-form-wrapper')
    const errorMessage = document.querySelector('.status')
    const e = 'http://127.0.0.1:5500/blog.html'//url to blog.html
    if(localStorage.getItem('user') !== null){
        window.location.href = e
    }else{
        logForm.style.display = 'flex'
        errorMessage.innerHTML = '<p>Error! Try Again</p>'
    }
}

function addUserToServer(userName, email, pwd) {
    const value = { profile: "", password: pwd, email: email };
    console.log(JSON.stringify({ [userName]: value }))
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({[userName]: value })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  