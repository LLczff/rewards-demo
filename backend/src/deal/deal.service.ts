import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal, DealDocument } from './schemas/deal.schema';
import { Model } from 'mongoose';
import { FindDealDto } from './dto/find-deal.dto';
import { DealSort } from 'src/common/enums/deal.enum';

@Injectable()
export class DealService {
  constructor(
    @InjectModel(Deal.name)
    private dealModel: Model<DealDocument>,
  ) {}

  async search(findDealDto: FindDealDto) {
    const matchStage: {
      title?: { $regex: string; $options: 'i' };
      'category.name'?: { $in: string[] };
    } = {};

    const aggregation: any[] = [];

    // Filter
    if (findDealDto.category) {
      aggregation.push(
        // Lookup places from deals
        {
          $lookup: {
            from: 'places',
            localField: 'placeId',
            foreignField: '_id',
            as: 'place',
          },
        },
        // Unwind the place array (converts array to object)
        {
          $unwind: '$place',
        },
        // Lookup categories from places
        {
          $lookup: {
            from: 'categories',
            localField: 'place.categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        // Unwind the category array
        {
          $unwind: '$category',
        },
      );

      matchStage['category.name'] = { $in: findDealDto.category };
    }

    // Search
    if (findDealDto.search) {
      matchStage.title = { $regex: findDealDto.search, $options: 'i' };
    }

    aggregation.push({ $match: matchStage });

    // Sort
    if (findDealDto.sort) {
      switch (findDealDto.sort) {
        case DealSort.Popular:
          aggregation.push({ $sort: { usage: -1 } });
          break;
        case DealSort.Latest:
          aggregation.push({ $sort: { createdAt: -1 } });
          break;
        case DealSort.CoinAscending:
          aggregation.push({ $sort: { cost: 1 } });
          break;
        case DealSort.CoinDescending:
          aggregation.push({ $sort: { cost: -1 } });
          break;
        default:
          break;
      }
    }

    // Skip
    if (findDealDto.offset) {
      aggregation.push({ $skip: findDealDto.offset });
    }

    // Limit
    if (findDealDto.limit) {
      aggregation.push({ $limit: findDealDto.limit });
    }

    // Select only wanted fields
    aggregation.push({
      $project: {
        _id: 1,
        image: 1,
        title: 1,
        cost: 1,
        totalQuota: 1,
        remainingQuota: 1,
        availableDate: 1,
        expiryDate: 1,
        description: 1,
        termsAndCondition: 1,
      },
    });

    return this.dealModel.aggregate(aggregation).exec();
  }

  findOne(id: string) {
    return this.dealModel.findById(id).populate('placeId').exec();
  }
}
