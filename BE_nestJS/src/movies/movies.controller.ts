import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    // getAll(@Req() req, @Res() res): Movie[] { // 이렇게 하는 것이 express 방식.
    // 동작은 하나, 권하지 않는다. nestJS는 express와 fastify 두가지를 사용하기 때문에 express 하나만으로 국한시키지 말자
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `We are searching for a movie made after: ${searchingYear}`;
  // }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }
  @Delete(':id')
  delete(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
