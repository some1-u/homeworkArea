const form = document.getElementById("img-form");
const imgContainer = document.getElementById("img-container");
const dummyUserUrl = "https://dummyjson.com/users"

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    // const input = document.querySelector("input");
    // const imgUrl = input.value
    // const img = document.createElement("img");
    // img.src = imgUrl;
    // imgContainer.appendChild(img);
    fetchUsers()
})

function fetchUsers () {
    fetch(dummyUserUrl)
    .then((res)=>res.json())
    .then(data=>{
        console.log(data)
        const users = data.users
        users.map(user=>{
            const span = document.createElement("span")
            span.innerText = user.username
            span.style.display = "block"
            imgContainer.appendChild(span);
        })
    })

}































