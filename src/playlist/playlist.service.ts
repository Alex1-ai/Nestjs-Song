import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';

@Injectable()
export class PLayListsService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepo: Repository<Song>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
}
