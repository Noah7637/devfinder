// Sélection des éléments
let bouton = document.querySelector("button");
let dark = document.querySelector("#ensemble_dark p");
let style = document.getElementById("style");
let lune = document.getElementById("lune");
let img_maps = document.getElementById("maps");
let img_link = document.getElementById("link");
let img_twitter = document.getElementById("twitter");
let img_github = document.getElementById("github");

let pdp = document.getElementById("pdp");
let biog = document.getElementById("bio");
let pseudo = document.querySelector("#total #profil #pseudo h2");
let at = document.querySelector("#total #profil #pseudo p");
let join = document.getElementById("join");
let repos = document.querySelector("#repos h2");
let followers = document.querySelector("#followers h2");
let following = document.querySelector("#following h2");
let lieu = document.querySelector("#milieu p");
let link = document.querySelector("#milieu a");
let twitter = document.getElementById("p_twt");
let github = document.getElementById("github");
let input = document.querySelector("input");
let erreur = document.getElementById("erreur");


let dernierProfil = null;


function appliquerCouleurs(donnée) {
  let isDark = style.href.includes("dark");
  let colorOK = isDark ? "#fefefe" : "#4b6a9b";
  let colorKO = "#697c9a";

  
  if (donnée.bio && donnée.bio !== "") {
    biog.textContent = donnée.bio;
    biog.style.color = colorOK;
  } else {
    biog.textContent = "Ce profil n’a pas de biographie";
    biog.style.color = colorKO;
  }

  if (donnée.location && donnée.location !== "") {
    lieu.textContent = donnée.location;
    lieu.style.color = colorOK;
  } else {
    lieu.textContent = "Non disponible";
    lieu.style.color = colorKO;
  }

  
  if (donnée.blog && donnée.blog !== "") {
    let blogURL = donnée.blog.startsWith("http") ? donnée.blog : "https://" + donnée.blog;
    link.textContent = donnée.blog;
    link.href = blogURL;
    link.style.color = colorOK;
  } else {
    link.textContent = "Non disponible";
    link.removeAttribute("href");
    link.style.color = colorKO;
  }

  
  if (donnée.twitter_username && donnée.twitter_username !== "") {
    twitter.textContent = "@" + donnée.twitter_username;
    twitter.style.color = colorOK;
  } else {
    twitter.textContent = "Non disponible";
    twitter.style.color = colorKO;
  }

  
  if (donnée.company && donnée.company !== "") {
    github.textContent = donnée.company;
    github.style.color = colorOK;
  } else {
    github.textContent = "Non disponible";
    github.style.color = colorKO;
  }
}


function chargerProfil(username) {
  let url = `https://api.github.com/users/${username}`;
  erreur.style.display = "none";

  fetch(url)
    .then(réponse => {
      if (!réponse.ok) {
        erreur.style.display = "block";
        throw new Error("Utilisateur introuvable");
      }
      return réponse.json();
    })
    .then(donnée => {
      dernierProfil = donnée; 

      
      pdp.setAttribute("src", donnée.avatar_url);
      pseudo.textContent = donnée.name ? donnée.name : donnée.login;
      at.textContent = `@${donnée.login}`;
      join.textContent = `Joined ${donnée.created_at.slice(0, 10).replace(/-/g, " ")}`;
      repos.textContent = donnée.public_repos;
      followers.textContent = donnée.followers;
      following.textContent = donnée.following;

   
      appliquerCouleurs(donnée);
    })
    
}

bouton.addEventListener("click", () => {
  let username = input.value.trim();
  if (username !== "") {
    chargerProfil(username);
  }
});


dark.addEventListener("click", () => {
  const isClair = dark.textContent === "DARK";

  style.setAttribute("href", isClair ? "style_dark.css" : "style.css");
  lune.setAttribute("src", isClair ? "img/soleil.png" : "img/lune.png");
  img_maps.setAttribute("src", isClair ? "img/maps_dark.png" : "img/maps.png");
  img_link.setAttribute("src", isClair ? "img/link_dark.png" : "img/link.png");
  img_twitter.setAttribute("src", isClair ? "img/twitter_dark.png" : "img/twitter.png");
  img_github.setAttribute("src", isClair ? "img/github_dark.png" : "img/github.png");
  dark.textContent = isClair ? "LIGHT" : "DARK";

});


