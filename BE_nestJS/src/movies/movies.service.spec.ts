import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      // 한편, getOne을 테스트할 때 Movie가 생성되어 있지 않으면 문제가 될 수 있다.
      // 그러니 먼저 생성을 해보자.
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1); // 위에서 생성했다면 id는 1이겠지
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      // given
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      // when
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      // then
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });
    it('should return a 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a movie', () => {
      // given
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      // when
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
  describe('update', () => {
    it('should update a movie', () => {
      // 한편, 매번 create 안해도 된다면 beforeach에서 create 해도 돼
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
