import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { DictItemEntity } from '~/modules/system/dict-item/dict-item.entity'
import { DictTypeEntity } from '~/modules/system/dict-type/dict-type.entity'

import { DictTypeDto, DictTypeQueryDto } from './dict-type.dto'
import { DictTypeResponseVo, LabelValueOptions } from './vo/dict-type-response.vo'

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictTypeEntity)
    private dictTypeRepository: Repository<DictTypeEntity>,
  ) { }

  /**
   * 罗列所有配置
   */
  async page({
    page,
    pageSize,
    name,
    code,
  }: DictTypeQueryDto): Promise<Pagination<DictTypeEntity>> {
    const queryBuilder = this.dictTypeRepository.createQueryBuilder('dict_type').where({
      ...(name && { name: Like(`%${name}%`) }),
      ...(code && { code: Like(`%${code}%`) }),
    })

    return paginate(queryBuilder, { page, pageSize })
  }

  /** 一次性获取所有的字典类型 */
  async getAll() {
    return this.dictTypeRepository.find()
  }

  /**
   * 获取参数总数
   */
  async countConfigList(): Promise<number> {
    return this.dictTypeRepository.count()
  }

  /**
   * 新增
   */
  async create(dto: DictTypeDto): Promise<void> {
    await this.dictTypeRepository.insert(dto)
  }

  /**
   * 更新
   */
  async update(id: number, dto: Partial<DictTypeDto>): Promise<void> {
    await this.dictTypeRepository.update(id, dto)
  }

  /**
   * 删除
   */
  async delete(id: number): Promise<void> {
    await this.dictTypeRepository.delete(id)
  }

  /**
   * 查询单个
   */
  async findOne(id: number): Promise<DictTypeEntity> {
    return this.dictTypeRepository.findOneBy({ id })
  }

  async getItemList(code: string): Promise<LabelValueOptions[]> {
    /** 校验字典code 是否存在 */
    const dictType = await this.dictTypeRepository.findOneBy({ code })
    if (!dictType) {
      throw new NotFoundException(`字典类型 ${code} 不存在`)
    }
    // 获取其所有子项
    const dictItemRepository = this.dictTypeRepository.manager.getRepository(DictItemEntity)
    const dictItems = await dictItemRepository.find({
      where: { type: { id: dictType.id } },
      order: { orderNo: 'ASC' },
      relations: ['type'],
    })
    // 转换为 LabelValueOptions 格式
    return dictItems.map(item => ({
      label: item.label,
      value: item.value,
    }))
  }

  /**
   * 获取指定字典code 的所有字典项
   */
  async getItems(code: string): Promise<DictTypeResponseVo> {
    /** 校验字典code 是否存在 */
    const dictType = await this.dictTypeRepository.findOneBy({ code })
    if (!dictType) {
      throw new NotFoundException(`字典类型 ${code} 不存在`)
    }
    // 获取其所有子项
    const dictItemRepository = this.dictTypeRepository.manager.getRepository(DictItemEntity)
    const dictItems = await dictItemRepository.find({
      where: { type: { id: dictType.id } },
      order: { orderNo: 'ASC' },
      relations: ['type'],
    })
    // 构建响应VO
    const responseVo = new DictTypeResponseVo()
    Object.assign(responseVo, dictType)
    responseVo.children = dictItems
    return responseVo
  }
}
