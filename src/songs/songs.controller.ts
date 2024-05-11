import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
// import { Song } from 'src/interface';

@Controller('songs')
export class SongsController {
  constructor(
    private songService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(
      `This is the connection string ${this.connection.CONNECTION_STRING}`,
    );
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songService.create(createSongDTO);
  }

  @Get()
  findAll() {
    try {
      return this.songService.findAll();
    } catch (e) {
      throw new HttpException(
        'Error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      // console.log('Entered errors here', e);
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetch a single song based on id ${typeof id}`;
  }

  @Put(':id')
  update() {
    return 'update a single song based on id ${id}';
  }

  @Delete(':id')
  delete() {
    return 'delete a single song based on id ${id}';
  }
}
