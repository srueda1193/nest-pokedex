import { Pokemon } from './entities/pokemon.entity';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>

  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.handleExceptions(error);
    }

  }

  findAll() {

    return `This action returns all pokemon`;
  }

  async findOneBy(id: string) {
    let pokemon: Pokemon;

    //verify if no
    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel.findOne({ no: id });
    }

    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: id.toLocaleLowerCase().trim() });
    }

    if (!pokemon) {
      throw new NotFoundException(`There not exist any pokemon by id, name or no: ${id}`);
    }

    return pokemon;
  }



  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOneBy(id);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0 )
      throw new BadRequestException(`There not exist any pokemon with id: ${id}`);
    

    return;
  }

  private handleExceptions(error: any){
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists in ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);

    throw new InternalServerErrorException(`Can't create pokemon, please check server logs`);
  }
}
