import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  TopLevelCategory,
  TopPageDocument,
  TopPageModel,
} from './top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id);
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias });
  }

  async findByCategory(firstLevelCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate()
      .match({ firstLevelCategory })
      .group({
        _id: { secondCategory: '$secondCategory' },
        page: { $push: { alias: '$alias', title: '$title' } },
      });
  }

  async findByText(text: string) {
    return this.topPageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id);
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
