import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie of ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }
  @Delete('/:id')
  delete(@Param('id') movieId: string) {
    return `This will delete a movie of ${movieId}`;
  }
  @Patch()
  patch(@Param('id') movieId: string) {
    return `This will patch a movie of ${movieId}`;
  }
}
