import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  // local db
  // local array
  private readonly songs: CreateSongDTO[] = [];

  create(song: CreateSongDTO): CreateSongDTO[] {
    // save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch the songs from the db
    // throw new Error('Error in Db while fetching records');
    return this.songs;
  }
}
