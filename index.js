
const form = document.getElementById("form")
let postsArray = []
let titleInput = document.getElementById("post-title")
let postBody = document.getElementById("post-body")

const renderPosts = () => {
    let html = ""
    for (let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `
    }
    document.getElementById("blog-list").innerHTML = html

}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()

    })



form.addEventListener('submit', (event) => {
    event.preventDefault()

    const new_post = {
        "title": titleInput.value,
        "body": postBody.value

    }

    const options = {
        method: "POST",
        body: JSON.stringify(new_post),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
        .then(res => res.json())
        .then(post => {
            postsArray.unshift(post)
            renderPosts()
            form.reset()
        })


})
