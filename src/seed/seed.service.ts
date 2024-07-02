import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) { }

  private readonly axios: AxiosInstance = axios


  async executeSeed() {

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonList: CreatePokemonDto[] = [];

    await this.pokemonService.deletePokemonSeedData();


    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      const pokemonCreate: CreatePokemonDto = { name: name, no: no };

      pokemonList.push(pokemonCreate);
    })

    const pokemon = await this.pokemonService.fillPokemonsWithSeedData(pokemonList);

    console.log(pokemon);

    return 'Seed executed';
  }

}
