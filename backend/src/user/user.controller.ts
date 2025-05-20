import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CoinHistoryFilter } from 'src/common/interfaces/transaction.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/random')
  async randomOne() {
    return this.userService.randomOne();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get(':id/coin')
  async findCoinHistory(
    @Param('id') id: string,
    @Query('filter') filter: CoinHistoryFilter,
  ) {
    return this.userService.findCoinHistory(id, filter);
  }
}
