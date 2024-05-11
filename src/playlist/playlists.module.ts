import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/users.entity';
import { PLayListsService } from './playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  //   controllers: [PlayListsController],
  providers: [PLayListsService],
})
export class PlaylistModule {}
