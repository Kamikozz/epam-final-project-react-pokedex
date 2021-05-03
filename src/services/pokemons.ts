import config from "../config/config.json";
import { ICaughtPokemon, IPokemon } from "../reducer";

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

export interface IPagination {
  page?: number;
  limit?: number;
};

export async function postCaughtPokemon(userId: number, data: ICaughtPokemon) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  const url = `${config.host}:${config.port}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let createdCaughtPokemon = null;
  try {
    createdCaughtPokemon = await response.json() as ICaughtPokemon;
  } catch (err) {
    console.error(err);
  }
  return createdCaughtPokemon;
};

export async function getPokemon(pokemonId: number) {
  const endpoint = `/pokemons/`;
  const params = `?id=${pokemonId}`;
  const url = `${config.host}:${config.port}${endpoint}${params}`;
  const response = await fetch(url);
  let pokemon = null;
  try {
    [pokemon = null] = await response.json() as IPokemon[];
  } catch (err) {
    console.error(err);
  }
  return pokemon;
};

/**
 * Retrieve pokemons list with optional pagination.
 * @param {IPagination} pagination
 */
 export async function getPokemons(pagination: IPagination) {
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
};

export async function getCaughtPokemon(userId: number, pokemonId: number) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  const params = `?pokemonId=${pokemonId}`;
  const url = `${config.host}:${config.port}${endpoint}${params}`;
  const response = await fetch(url);
  let caughtPokemon = null;
  try {
    [caughtPokemon = null] = await response.json() as ICaughtPokemon[];
  } catch (err) {
    console.error(err);
  }
  return caughtPokemon;
};

export interface IGetCaughtPokemonsParams {
  userId: number;
  from?: number;
  to?: number;
};

export async function getCaughtPokemons({ userId, from, to }: IGetCaughtPokemonsParams) {
  const endpoint = `/users/${userId}/caught_pokemons`;
  let params: string | Array<string> = [];
  if (from) params.push(`pokemonId_gte=${from}`);
  if (to) params.push(`pokemonId_lte=${to}`);
  params = params.length ? `?${params.join('&')}` : '';
  const url = `${config.host}:${config.port}${endpoint}${params}`;
  const response = await fetch(url);
  let caughtPokemons: Array<ICaughtPokemon> = [];
  try {
    caughtPokemons = await response.json() as Array<ICaughtPokemon>;
  } catch (err) {
    console.error(err);
  }
  return caughtPokemons;
};
