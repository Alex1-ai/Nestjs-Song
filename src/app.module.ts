import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { LoggerModule } from './common/middleware/logger.module';
import { UsersModule } from './users/users.module';
import { Song } from './songs/song.entity';
import { User } from './users/users.entity';
import { Playlist } from './playlist/playlist.entity';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your naem',
      password: 'your password',
      database: 'name of database',
      entities: [Song, User, Playlist],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },

    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENv === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
