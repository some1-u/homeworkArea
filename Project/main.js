import { randomSuperhero } from 'superheroes';

function loadSuperhero() {
  const superHero = randomSuperhero();
  document.querySelector("#superhero").innerHTML = superHero;
  fetch("https://api.multiavatar.com/" + superHero)
    .then(res => res.text())
    .then(img => {
      document.querySelector("#avatar").innerHTML = img;
    })
}

document.querySelector("#reloadBtn").addEventListener("click", loadSuperhero)

loadSuperhero();

