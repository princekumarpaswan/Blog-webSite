// app.js
document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blogPosts');
    const addBlogForm = document.getElementById('addBlogForm');

    function fetchPosts() {
        return fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    function displayPosts(posts) {
        blogPostsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="deleteButton" data-id="${post.id}">Delete</button>
      `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    function addPost(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const newPost = {
            title: title,
            body: content,
            userId: 1 // Assuming a fixed user ID for simplicity
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then(post => {
                displayPosts([...blogPosts, post]);
                addBlogForm.reset();
            })
            .catch(error => console.log(error));
    }

    function deletePost(event) {
        if (event.target.classList.contains('deleteButton')) {
            const postId = event.target.getAttribute('data-id');
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE'
            })
                .then(() => {
                    blogPosts = blogPosts.filter(post => post.id !== postId);
                    displayPosts(blogPosts);
                })
                .catch(error => console.log(error));
        }
    }

    let blogPosts = [];

    fetchPosts()
        .then(posts => {
            blogPosts = posts;
            displayPosts(blogPosts);
        });

    addBlogForm.addEventListener('submit', addPost);
    blogPostsContainer.addEventListener('click', deletePost);
});
