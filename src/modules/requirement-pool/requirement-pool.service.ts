import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { CreateRequirementPoolDto } from './dto/create-requirement-pool.dto'
import { RequirementPoolQueryDto } from './dto/requirement-pool-query.dto'
import { UpdateRequirementPoolDto } from './dto/update-requirement-pool.dto'
import { RequirementPool } from './entities/requirement-pool.entity'

@Injectable()
export class RequirementPoolService {
  constructor(
      @InjectRepository(RequirementPool)
      private requirementPoolRepository: Repository<RequirementPool>,
  ) {}

  /**
   * 创建需求池
   */
  async create(createRequirementPoolDto: CreateRequirementPoolDto): Promise<RequirementPool> {
    const requirementPool = this.requirementPoolRepository.create(createRequirementPoolDto)
    return this.requirementPoolRepository.save(requirementPool)
  }

  /**
   * 获取需求池列表
   */
  async findAll(query: RequirementPoolQueryDto): Promise<Pagination<RequirementPool>> {
    const { page, pageSize, name, serviceObjectId } = query

    const queryBuilder = this.requirementPoolRepository.createQueryBuilder('requirementPool')

    // 添加查询条件
    if (name) {
      queryBuilder.andWhere('requirementPool.name LIKE :name', { name: `%${name}%` })
    }

    if (serviceObjectId) {
      queryBuilder.andWhere('requirementPool.serviceObjectId = :serviceObjectId', { serviceObjectId })
    }

    return paginate(queryBuilder, { page, pageSize })
  }

  /**
   * 查询单个需求池
   */
  async findOne(id: number): Promise<RequirementPool> {
    const requirementPool = await this.requirementPoolRepository.findOne({
      where: { id },
      relations: ['serviceObject'],
    })

    if (!requirementPool) {
      throw new NotFoundException(`RequirementPool with ID ${id} not found`)
    }

    return requirementPool
  }

  /**
   * 更新需求池
   */
  async update(id: number, updateRequirementPoolDto: UpdateRequirementPoolDto): Promise<RequirementPool> {
    const requirementPool = await this.findOne(id)
    Object.assign(requirementPool, updateRequirementPoolDto)
    return this.requirementPoolRepository.save(requirementPool)
  }

  /**
   * 删除需求池
   */
  async remove(id: number): Promise<void> {
    const requirementPool = await this.findOne(id)
    await this.requirementPoolRepository.remove(requirementPool)
  }
}
