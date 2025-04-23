import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../configs/api-response';

@Injectable()
export class AddressesService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl =
    'https://dev-online-gateway.ghn.vn/shiip/public-api';
  private readonly token = process.env.GHN_TOKEN;

  async getProvinces(): Promise<any> {
    const response$ = this.httpService.get(
      `${this.baseUrl}/master-data/province`,
      {
        headers: { Token: this.token },
      },
    );
    try {
      const response = await firstValueFrom(response$);
      const result = response.data.data?.map((province: any) => ({
        ProvinceID: province.ProvinceID,
        ProvinceName: province.ProvinceName,
      }));
      return ApiResponse.success('Lấy danh sách tỉnh thành công!', result);
    } catch (error) {
      throw new HttpException(
        ApiResponse.notFound('Không tìm thấy dữ liệu!'),
        404,
      );
    }
  }

  async getDistricts(provinceId: number): Promise<any> {
    const response$ = this.httpService.post(
      `${this.baseUrl}/master-data/district`,
      {
        province_id: provinceId,
      },
      {
        headers: { Token: this.token },
      },
    );
    try {
      const response = await firstValueFrom(response$);
      const result = response.data.data?.map((district: any) => ({
        DistrictID: district.DistrictID,
        DistrictName: district.DistrictName,
      }));
      return ApiResponse.success(
        'Lấy danh sách quận/huyện thành công!',
        result,
      );
    } catch (error) {
      throw new HttpException(
        ApiResponse.notFound('Không tìm thấy dữ liệu!'),
        404,
      );
    }
  }

  async getWards(districtId: number): Promise<any> {
    const response$ = this.httpService.post(
      `${this.baseUrl}/master-data/ward`,
      {
        district_id: districtId,
      },
      {
        headers: { Token: this.token },
      },
    );
    try {
      const response = await firstValueFrom(response$);
      const result = response.data.data?.map((ward: any) => ({
        WardCode: ward.WardCode,
        WardName: ward.WardName,
      }));
      return ApiResponse.success('Lấy danh sách phường/xã thành công!', result);
    } catch (error) {
      throw new HttpException(
        ApiResponse.notFound('Không tìm thấy dữ liệu!'),
        404,
      );
    }
  }
}
