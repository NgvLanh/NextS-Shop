import { Controller, Get, Param } from '@nestjs/common';
import { AddressesService } from './addresses.service';

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
}
