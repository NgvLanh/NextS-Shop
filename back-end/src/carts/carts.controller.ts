import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCartDto: CreateCartDto, @Req() req: Request) {
    return await this.cartsService.create(createCartDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findOne(@Req() req: Request) {
    return await this.cartsService.findOne(req);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartsService.update(+id, updateCartDto);
  }
}
