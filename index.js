// from the bobs burger site we are going to fetch all the characters
//you need the name
//wikiUrl
//image
//occupation
//voiced by

// link to fetch all characters: https://bobsburgers-api.herokuapp.com/characters/
//link to fetch the voice actor: https://api.tvmaze.com/search/people?q=paul%20rust
//create a card for each actor:

document.addEventListener('DOMContentLoaded', async (event) => {
  const chars = await fetchFunc(
    `https://bobsburgers-api.herokuapp.com/characters/`
  );
  const shuffledChars = chars.sort(() => 0.5 - Math.random());
  // Get sub-array of first 10 elements after shuffle
  let selectedChars = shuffledChars.slice(0, 10);
  for (let char of selectedChars) {
    const voiceActorArray = await fetchFunc(
      `https://api.tvmaze.com/search/people?q=${char.voicedBy}`
    );
    const voiceActor = voiceActorArray[0]?.person.name; 
    if (voiceActor == char.voicedBy && voiceActor) {

     const voiceActorImgUrl = voiceActorArray[0]?.person.image?.medium;

     const card = createCard(
       char.image,
       voiceActorImgUrl,
       char.name,
       char.occupation,
       char.wikiUrl,
       char.voicedBy
     );
     document.querySelector('.characters').appendChild(card);
   }
  }
  console.log(window.location);

  document.querySelector('button').addEventListener('click', function () {
    window.location.reload();
  });

});
function createCard(
  charImgUrl,
  voiceActorImgUrl,
  name,
  occupation,
  wikiUrl,
  voiceActor
) {
  const cardFront = document.createElement('div');
  cardFront.classList.add('cardFront');
  const charImg = document.createElement('img');
  charImg.alt = `character ${name} avatar`;
  charImg.src = charImgUrl;
  cardFront.appendChild(charImg);

  const container = document.createElement('div');
  container.classList.add('container');

  const cardBack = document.createElement('div');
  cardBack.classList.add('cardBack');
  const voiceActorImg = document.createElement('img');
  voiceActorImg.alt = `voice actor ${voiceActor} avatar`;
  voiceActorImg.src = voiceActorImgUrl;
  cardBack.appendChild(voiceActorImg);

  container.append(cardFront, cardBack);

  const article = document.createElement('article');
  article.classList.add('card');

  const nameHeader = document.createElement('h4');
  nameHeader.textContent = `character: ${name}`;
  const voiceHeader = document.createElement('h4');
  voiceHeader.textContent = `voicedBy: ${voiceActor}`;

  const occupationPara = document.createElement('p');
  occupationPara.textContent = `Occupation: ${occupation}`;

  const learnMore = document.createElement('a');
  learnMore.href = wikiUrl;
  learnMore.textContent = 'Learn More about the character'

  article.append(container, nameHeader, voiceHeader, occupationPara, learnMore);

  return article;
}

async function fetchFunc(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `Status: ${response.status}, statusText: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

{
  /* <article class="card">
  <div class="container">
    <div class="card-front">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
    <div class="flip-card-back">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;"> 
    </div>
  </div>
  <h4>John Doe</h4> 
  <p>Architect & Engineer</p> 
  <a>Learn More</a>
</article> */
}
