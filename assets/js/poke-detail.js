const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("pokeNumber");
const box = document.getElementById("box");

const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
const pokeSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
// const pokeGenderUrl = `https://pokeapi.co/api/v2/gender/${pokemonId}`;

const urls = [pokeUrl, pokeSpeciesUrl];
const pokeObject = {};

const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao obter dados da URL ${url}`);
  }

  const data = await response.json();
  pokeObject[url] = data;
};

const fetchAllData = async () => {
  try {
    await Promise.all(urls.map(fetchData));
    insertPokemonDetailToHtml(pokeObject);
  } catch (error) {
    console.error(error);
  }
};

// Chame a função para iniciar o processo
fetchAllData();

function insertPokemonDetailToHtml(pokemonObject) {
  const types = pokemonObject[pokeUrl].types.map(
    (typeSlot) => typeSlot.type.name
  );

  const abilities = pokemonObject[pokeUrl].abilities.map(
    (abilitieSlot) => abilitieSlot.ability.name
  );

  const newHtml = `<div class="teste1  ${types[0]}">
    <header>
        <div class="header">
            <a href="index.html">
                <i class="fa-solid fa-arrow-left fa-xl" style="color: #fff;"></i>
            </a>
            <i class="fa-regular fa-heart fa-xl" style="color: #fff;"></i>
        </div>
    </header>
    <section class="first-section">
        <div class="some-stats">
            <div class="title">
                <h2>${pokemonObject[pokeUrl].name}</h2>
                <div class="number">${pokemonObject[pokeUrl].id}</div>
            </div>
            <div class="detail">
                <ol class="types">
                ${types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
                </ol>
            </div>
        </div>
    </section>
    <div class="img-container" >
        <img src="${
          pokemonObject[pokeUrl].sprites.other.dream_world.front_default
        }" alt="${pokemonObject[pokeUrl].name}">
    </div>

</div>
<div class="teste2  ${types[0]}">
  <section class="second-section">
      <div class="stats">
          <p>About</p>
          <p>Base Stats</p>
          <p>Evolution</p>
          <p>Moves</p>
      </div>
      <div class="divider"></div>
      <div class="about">
          <div class="item">
              <p>Species</p>
              <p> 
              ${
                pokemonObject[pokeSpeciesUrl].genera.find(
                  (entry) => entry.language.name === "en"
                ).genus
              }
              </p>
          </div>
          <div class="item"o>
              <p>Height</p>
              <p>${pokemonObject[pokeUrl].height}</p>
          </div>
          <div class="item">
              <p>Weight</p>
              <p>${pokemonObject[pokeUrl].weight}</p>
          </div>   
           <div class="item" id="pokeAbilities">
              <p>Abilities</p>
              
                 ${abilities.map((abilitie) => `<p>${abilitie}</p>`).join("")}
              
          </div>
      </div>
      <div class="breeding">
          <h4>Breeding</h4>
          <div class="item">
              <p>Gender</p>
              <p>Male</p>
          </div>
          <div class="item">
              <p>Egg Groups</p>
              <p>${pokemonObject[pokeSpeciesUrl].egg_groups[0].name}</p>
          </div>
          <div class="item">
              <p>Egg Cycle</p>
              <p>${types[0]}</p>
          </div>
      </div>
  </section>
</div>
`;
  box.innerHTML += newHtml;
}
