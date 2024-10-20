import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UploadModule,
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
