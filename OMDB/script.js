const input=document.querySelector('#search-input');
const btn=document.querySelector('#search-button');
const apikey="1d553680"

function fetchData(url){
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        const movies=data.Search;
    })
}

btn.addEventListener('click',()=>{
    const value=input.value;
    if(value){
        fetchData(`https://www.omdbapi.com/?s=${value}&apikey=${apikey}`);
    }
});