import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../configs/api-response';
import { isVerifyUser } from '../../libs/auth-verifit';
import { User } from '../users/entities/user.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

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
      const result$ = response.data.data?.map((province: any) => ({
        ProvinceID: province.ProvinceID,
        ProvinceName: province.ProvinceName,
      }));
      const result = result$.filter(
        (province) => !province.ProvinceName.toLowerCase().includes(`test`),
      );
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

  async create(createAddressDto: CreateAddressDto, req) {
    const user = await isVerifyUser(req, this.userRepository);

    const { fullName, phone, address } = createAddressDto;

    const existed = user.addresses?.find(
      (addr) =>
        addr.address?.details === address.details &&
        addr.address?.ward === address.ward &&
        addr.address?.district === address.district &&
        addr.address?.province === address.province,
    );

    if (existed) {
      throw new HttpException(ApiResponse.error('Địa chỉ đã tồn tại!'), 400);
    }
    const isFirst = user.addresses?.length === 0;

    try {
      const data = {
        fullName: fullName,
        phone: phone,
        address: address,
        user: user,
        isDefault: isFirst,
      };
      const newAddress = this.addressRepository.create(data);
      const result$ = await this.addressRepository.save(newAddress);
      const { user: _, ...result } = result$;
      return ApiResponse.success('Tạo điểm giao hàng thành công!', result);
    } catch (error) {
      throw new HttpException(
        ApiResponse.error('Đã xảy ra lỗi khi tạo điểm giao hàng!' + error),
        500,
      );
    }
  }

  async findAll(req) {
    const user = await isVerifyUser(req, this.userRepository);

    const result$ = await this.addressRepository.find({
      where: { user: { id: user.id } },
      order: { id: 'ASC' },
    });

    return ApiResponse.success(
      'Lấy danh sách điểm giao hàng của người dùng!',
      result$,
    );
  }
}
