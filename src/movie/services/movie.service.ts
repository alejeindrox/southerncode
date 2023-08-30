import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dtos';
import { MovieTMDB } from '../interfaces/tmdb.interface';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private moviesRepo: Repository<Movie>) {}

  findAll() {
    return this.moviesRepo.find();
  }

  async findOne(tmdbId: number) {
    const movie = await this.moviesRepo.findOne({
      where: { tmdbId },
      relations: ['reviews', 'reviews.user'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie #${tmdbId} not found`);
    }

    const transformedReviews = movie.reviews.map((review) => ({
      rating: review.rating,
      username: review.user.username,
    }));

    const transformedMovie = {
      ...movie,
      reviews: transformedReviews,
    };

    return transformedMovie;
  }

  async createIfNotExist(tmdbId: number) {
    const movieDB = await this.moviesRepo.findOne({ where: { tmdbId } });

    if (movieDB) return movieDB;

    try {
      const data = await this.getMovieFromTMDB(tmdbId);
      const { id, original_title, release_date, poster_path, overview } = data;
      const tmdbMovie: CreateMovieDto = {
        tmdbId: id,
        title: original_title,
        release_date: new Date(release_date),
        poster_path,
        overview,
      };

      const newMovie = this.moviesRepo.create(tmdbMovie);
      return this.moviesRepo.save(newMovie);
    } catch (error) {
      throw new Error('Error fetching and saving movie from TMDB');
    }
  }

  private async getMovieFromTMDB(tmdbId: number): Promise<MovieTMDB> {
    try {
      const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.API_KEY_TMDB}`;
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY_TMDB}`,
      };
      const response = await axios.get(url, { headers });

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Error getting movie from TMDB');
      }
      return await response.data;
    } catch (error) {
      console.error('Error getting movie from TMDB:', error);
      throw error;
    }
  }
}
