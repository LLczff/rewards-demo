import { Controller, Get, Param, Query } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealSort } from 'src/common/enums/deal.enum';
import { FindDealDto } from './dto/find-deal.dto';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get('popular')
  findPopular() {
    return this.dealService.search({
      sort: DealSort.Popular,
      limit: 8,
      offset: 0,
    });
  }

  @Get('latest')
  findLatest() {
    return this.dealService.search({
      sort: DealSort.Latest,
      limit: 8,
      offset: 0,
    });
  }

  @Get()
  search(@Query() findDealDto: FindDealDto) {
    return this.dealService.search(findDealDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealService.findOne(id);
  }
}
