import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
