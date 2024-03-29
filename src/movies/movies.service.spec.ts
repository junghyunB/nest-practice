import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpException } from '@nestjs/common';


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
    })
  });

  describe('Create Movie And getOne', () => {
    it('should return movie', () => {
      service.create({
        title: 'jjinbang',
        year: 2025,
        genres: ['jjinbbbang']
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 Error', () => {
      try {
        service.getOne(99);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toEqual('NOT FOUND');
        expect(err.status).toEqual(404);
      }
    })

    it('should throw 400 Error', () => {
      try {
        service.getOne(undefined);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toEqual('BAD REQUEST');
        expect(err.status).toEqual(400);
      }
    })
  });

  describe('deleteOne', () => {
    it('should return delete one', () => {
      service.create({
        title: 'jin1',
        year: 2025,
        genres: ['jin1', 'jin2']
      })
      service.create({
        title: 'jin2',
        year: 2024,
        genres: ['jin3', 'jin4']
      })
      let movie = service.getOne(2);
      let movies = service.getAll();
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(2)
      expect(movies.length).toEqual(2);
      service.deleteOne(1);
      movies = service.getAll();
      expect(movies.length).toEqual(1);
      
    })
  });
});
