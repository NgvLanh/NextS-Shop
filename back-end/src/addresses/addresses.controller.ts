import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('api/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get('provinces')
  getProvinces() {
    return this.addressesService.getProvinces();
  }

  @Get('districts/:provinceId')
  getDistricts(@Param('provinceId') provinceId: number) {
    return this.addressesService.getDistricts(provinceId);
  }

  @Get('wards/:districtId')
  getWards(@Param('districtId') districtId: number) {
    return this.addressesService.getWards(districtId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Req() req: Request,
  ) {
    return await this.addressesService.create(createAddressDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.addressesService.findAll(req);
  }
}
