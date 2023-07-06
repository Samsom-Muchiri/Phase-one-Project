// Fetch users
const userUrl = "http://localhost:3000/user";
const postUrl = "http://localhost:3000/posts";
fetch(userUrl)
  .then(res => res.json())
  .then(data => {})
  .catch(error => console.error(error));

// Fetch posts
fetch(postUrl)
  .then(res => res.json())
  .then(data => {
    appendPosts(data);
  })
  .catch(error => console.error(error));

function appendPosts(data) {
  let newContent = "";
  const blogContainer = document.querySelector('.blog-w');

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    const postSrc = obj.content;
    const profile = obj.profile;
    const author = obj.author;
    const newPostHTML = `
      <div class="blog">
        <div class="author-detail">
          <div class="profile"><img src="${profile}" class="user-profile" alt="" title="${author}"></div><span class="name">${author}</span>
        </div>
        <div class="blog-body">${postSrc}</div>
        <div class="blog-feedback">
          <span class="fb"><i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
          <span class="fb"><i class="fa fa-thumbs-down" aria-hidden="true"></i></span>
          <span class="fb"><i class="fa fa-comment" aria-hidden="true"></i></span>
          <span class="fb more"></span>
        </div>
        <div class="comment">
          <div class="new-comment">
            <div class="profile"><img src="${profile}" class="user-profile" alt="" title="${author}"></div>
            <form method="post" class="form">
              <textarea name="comment" class="comment-input" cols="30" rows="1" placeholder="Comment.."></textarea>
              <label for="btn"><i class="fa fa-paper-plane" aria-hidden="true"></i></label>
              <input type="submit" class="btn">
            </form>
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
          <section class="comment-wrapper">
            <div class="user-comment">
              <div class="comments">
                <div class="profile"><img src="https://i.pinimg.com/236x/72/93/e5/7293e51e3012b0e82f23105222b520b0.jpg" alt=""></div>
                <div>
                  <div class="user"><br> Hellen</div>
                  <div class="comment-body"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, magnam. Saepe facere similique, corrupti, nihil, dolor veniam odio excepturi assumenda fugit adipisci consequatur aspernatur odit illo! Minus doloremque eveniet laboriosam.</p></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;

    const blogWrapper = document.createElement('div');
    blogWrapper.innerHTML = newPostHTML;
    newContent += blogWrapper.innerHTML;
  }

  blogContainer.innerHTML += newContent;
  showReadMore();
  runCommentFunctions();
  runStylingFunctions();
  checkUser();
  addUser();
}

document.addEventListener("DOMContentLoaded", _ => {
  runCommentFunctions();
  runStylingFunctions();
  checkUser();
  addUser();
});

function runStylingFunctions() {
  handleLike();

}
  handleTheme();
function runCommentFunctions() {
  closeComments();
  openComments();
  addComment();

}

function closeComments() {
  const closeComments = document.querySelectorAll('.fa-times');
  for (let i = 0; i < closeComments.length; i++) {
    const btn = closeComments[i];
    btn.addEventListener('click', e => {
      const btnIcon = e.target;
      const commentsSection = btnIcon.parentElement.parentElement;
      commentsSection.classList.remove('show-comments');
    });
  }
}

function openComments() {
  const commentIcon = document.querySelectorAll('.fa-comment');
  for (let i = 0; i < commentIcon.length; i++) {
    const btn = commentIcon[i];
    btn.addEventListener('click', e => {
      const openCommentBtn = e.target;
      const blog = openCommentBtn.parentElement.parentElement.parentElement;
      const commentsSection = blog.querySelector('.comment');
      commentsSection.classList.add('show-comments');
    });
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
      createComment(formw);
    });
  }
}

function createComment(formw) {
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

// Like
function handleLike() {
  const blogSection = document.querySelector('.blog-w');
  const feedBackDiv = "blog-feedback";
  blogSection.addEventListener('click', e => {
    const icon = e.target;
    if (icon.parentElement.parentElement.classList.contains(feedBackDiv)) {
      const parentDiv = icon.parentElement.parentElement;
      const thumbsUp = parentDiv.querySelector('.fa-thumbs-up');
      const thumbsDown = parentDiv.querySelector('.fa-thumbs-down');
      if (icon.classList.contains('fa-thumbs-down')) {
        icon.style.color = "blue";
        thumbsUp.style.color = "";
      }
      if (icon.classList.contains('fa-thumbs-up')) {
        icon.style.color = "blue";
        thumbsDown.style.color = "";
      }
    }
  });
}

// Theme section
function handleTheme() {
  const themeButton = document.querySelector('.theme');
  const nav = document.querySelector('.nav');
  const blog = document.querySelectorAll('.blog');
  themeButton.addEventListener('click', _ => {
    if (themeButton.classList.contains('fa-sun-o')) {
      themeButton.classList.remove('fa-sun-o');
      themeButton.classList.add('fa-moon-o');
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
      themeButton.classList.remove('fa-moon-o');
      themeButton.classList.add('fa-sun-o');
      document.documentElement.style.setProperty("--body-color", '');
      document.documentElement.style.setProperty("--fa-color", '');
      document.documentElement.style.setProperty("--font-color", '');
      document.documentElement.style.setProperty("--comments-color", '');
      document.documentElement.style.setProperty("--nav-color", '');
      document.documentElement.style.setProperty("--blog-color", '');
      nav.style.boxShadow = "";
      blog.forEach(div => {
        div.style.border = "";
      });
    }
  });
}

// Show read more
function showReadMore() {
  const blogBody = document.querySelectorAll('.blog-body');
  for (let i = 0; i < blogBody.length; i++) {
    const body = blogBody[i];
    const feedBack = body.parentElement.querySelector('.blog-feedback')
    if (body.clientHeight > 400) {
      const readMore = body.parentElement.querySelector('.more');
      readMore.innerText = 'Read More';
      feedBack.style.boxShadow = "0px -5px 15px rgba(255, 255, 255, 0.257)"
      readMore.addEventListener('click', _ => {
        const blog = body.parentElement;
        if (blog.classList.contains('maximize-blog')) {
          blog.classList.remove('maximize-blog');
          readMore.innerText = 'Read More';
          feedBack.style.boxShadow = "0px -5px 15px rgba(255, 255, 255, 0.257)"
        } else {
          blog.classList.add('maximize-blog');
          readMore.innerText = 'Close';
          feedBack.style.boxShadow = ""
          body.style.marginBottom = '35px';
        }
      });
    }
  }
}

// Check user
function checkUser() {
  const createLink = document.querySelector('.create-link');
  const logForm = document.querySelector('.log-form-wrapper');
  createLink.addEventListener('click', e => {
    e.preventDefault();
    if (localStorage.getItem('user') !== null) {
      sendUserToCreateB(e);
    } else {
      logForm.style.display = 'flex';
    }
  });
}

function sendUserToCreateB(e) {
  window.location.href = e.target.parentElement.href;
}

// Add user
function addUser() {
  const form = document.querySelector('.log-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const userName = document.querySelector('#user-name').value;
    const email = document.querySelector('#email').value;
    const pwd = document.querySelector('#pwd').value;
    const repeatPwd = document.querySelector('#repeat-pwd').value;
    if (pwd === repeatPwd) {
      const userData = userName;
      localStorage.setItem("user", userData);
      checkUserInLS();
      addUserToServer(userName, email, pwd);
    } else {
      const errorMessage = document.querySelector('.status');
      errorMessage.innerHTML = '<p>Error! Passwords don\'t match</p>';
    }
  });
}

function checkUserInLS() {
  const logForm = document.querySelector('.log-form-wrapper');
  const errorMessage = document.querySelector('.status');
  const e = 'http://127.0.0.1:5500/blog.html'; // User URL to blog.html
  if (localStorage.getItem('user') !== null) {
    window.location.href = e;
  } else {
    logForm.style.display = 'flex';
    errorMessage.innerHTML = '<p>Error! Try Again</p>';
  }
}

function addUserToServer(userName, email, pwd) {
  const value = { profile: "", password: pwd, username: userName, email: email };
  fetch("http://localhost:3000/user", {
    method: 'POST',
    body: JSON.stringify(value),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {})
    .catch(error => console.error('Error:', error));
}
