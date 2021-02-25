import config from "../config/config.json";

// getPokemonDescription = (name) => {
// 	fetch(`https://www.pokemon.com/ru/pokedex/${name}`)
// 		.then(res => res.text())
// 		.then(body => {
//
// 			const regexp = /<p class="version-y\s.*\s*[\w .\n&#;,:]*<\/p>/;
// 			const replaceRegexp = /<p class="version-y\s.*\s*|\s*<\/p>|/g;
// 			console.log(body);
// 			body = body.match(regexp).toString().replace(replaceRegexp, "").replace(/\n/g, " ");
//
// 			return body;
// 			// var p = document.getElementById('description');
// 			// p.innerHTML = body;
// 		})
// 		.catch(err => console.log(err))
// };

interface ICaughtPokemon {
  pokemonId: number;
  caughtDate: string;
  name: string;
};

/**
 *
 * @param {Object} data { `pokemonId`: Number, `caughtDate`: String, `name`: String }
 */
async function postCaughtPokemon(userId: string, data: ICaughtPokemon) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  const url = `${config.host}:${config.port}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  let createdCaughtPokemon;
  try {
    createdCaughtPokemon = await response.json();
  } catch (err) {
    console.error(err);
  }
  return createdCaughtPokemon;
}

async function getPokemon(pokemonId: number) {
  const endpoint = `/pokemons/${pokemonId}`;
  const url = `${config.host}:${config.port}${endpoint}`;
  const response = await fetch(url);
  let pokemon;
  try {
    pokemon = await response.json();
  } catch (err) {
    console.error(err);
  }
  return pokemon;
}

interface IPagination {
  page?: number;
  limit?: number;
};

/**
 * Retrieve pokemons list with optional pagination.
 * @param {Object} pagination { `page`: Number, `limit`: Number }
 */
async function getPokemons(pagination: IPagination) {
  let params = '';
  if (pagination) {
    const {
      page = 1, limit = 20
    } = pagination;
    params = `?_page=${page}&_limit=${limit}`;
  }
  const url = `${config.host}:${config.port}/pokemons${params}`;
  const response = await fetch(url);
  let pokemons;
  try {
    pokemons = await response.json();
  } catch (err) {
    console.error(err);
  }
  return pokemons;
}

async function getCaughtPokemon(userId: string, pokemonId: number) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  const params = `?pokemonId=${pokemonId}`;
  const url = `${config.host}:${config.port}${endpoint}${params}`;
  const response = await fetch(url);
  let caughtPokemon;
  try {
    const data = await response.json();
    caughtPokemon = data[0];
  } catch (err) {
    console.error(err);
  }
  return caughtPokemon;
}

async function getCaughtPokemons(userId: string, from?: number, to?: number) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  let params: string | Array<string> = [];
  if (from) params.push(`pokemonId_gte=${from}`);
  if (to) params.push(`pokemonId_lte=${to}`);
  params = params.length ? `?${params.join('&')}` : '';
  const url = `${config.host}:${config.port}${endpoint}${params}`;
  const response = await fetch(url);
  let caughtPokemons;
  try {
    caughtPokemons = await response.json();
  } catch (err) {
    console.error(err);
  }
  return caughtPokemons;
}

export default {
  postCaughtPokemon,
  getPokemon,
  getPokemons,
  getCaughtPokemon,
  getCaughtPokemons,
};
