import { Controller, Get } from '@nestjs/common';
import { BannersService } from './banners.service';

@Controller('api/banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  async findAll() {
    return await this.bannersService.findAll();
  }
}
