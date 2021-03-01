import config from "../config/config.json";
import { IPokemon } from "../pages/PokemonPage/PokemonPage";
import { ICaughtPokemon } from "../pages/CaughtPokemonsPage/CaughtPokemonsPage";

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

interface IPagination {
  page?: number;
  limit?: number;
};

async function postCaughtPokemon(userId: number, data: ICaughtPokemon) {
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
    createdCaughtPokemon = await response.json() as ICaughtPokemon;
  } catch (err) {
    console.error(err);
  }
  return createdCaughtPokemon;
}

async function getPokemon(pokemonId: number) {
  const endpoint = `/pokemons/${pokemonId}`;
  const url = `${config.host}:${config.port}${endpoint}`;
  const response = await fetch(url);
  let pokemon = null;
  try {
    pokemon = await response.json() as IPokemon;
  } catch (err) {
    console.error(err);
  }
  return pokemon;
}

/**
 * Retrieve pokemons list with optional pagination.
 * @param {IPagination} pagination
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
    pokemons = await response.json() as Array<IPokemon>;
  } catch (err) {
    console.error(err);
  }
  return pokemons;
}

async function getCaughtPokemon(userId: number, pokemonId: number) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  const params = `?pokemonId=${pokemonId}`;
  const url = `${config.host}:${config.port}${endpoint}${params}`;
  const response = await fetch(url);
  let caughtPokemon;
  try {
    const data = await response.json();
    caughtPokemon = data[0] as ICaughtPokemon;
  } catch (err) {
    console.error(err);
  }
  return caughtPokemon;
}

async function getCaughtPokemons(userId: number, from?: number, to?: number) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  let params: string | Array<string> = [];
  if (from) params.push(`pokemonId_gte=${from}`);
  if (to) params.push(`pokemonId_lte=${to}`);
  params = params.length ? `?${params.join('&')}` : '';
  const url = `${config.host}:${config.port}${endpoint}${params}`;
  const response = await fetch(url);
  let caughtPokemons = null;
  try {
    caughtPokemons = await response.json() as Array<ICaughtPokemon>;
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
