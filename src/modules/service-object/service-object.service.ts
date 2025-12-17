import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { CreateServiceObjectDto } from './dto/create-service-object.dto'
import { ServiceObjectQueryDto } from './dto/service-object-query.dto'
import { UpdateServiceObjectDto } from './dto/update-service-object.dto'
import { ServiceObject } from './entities/service-object.entity'

@Injectable()
export class ServiceObjectService {
  constructor(
      @InjectRepository(ServiceObject)
      private serviceObjectRepository: Repository<ServiceObject>,
  ) {}

  /**
   * 创建服务对象
   */
  async create(createServiceObjectDto: CreateServiceObjectDto): Promise<ServiceObject> {
    const serviceObject = this.serviceObjectRepository.create(createServiceObjectDto)
    return this.serviceObjectRepository.save(serviceObject)
  }

  /**
   * 获取服务对象列表
   */
  async findAll(query: ServiceObjectQueryDto): Promise<Pagination<ServiceObject>> {
    const { page, pageSize, name } = query

    const queryBuilder = this.serviceObjectRepository.createQueryBuilder('serviceObject')

    // 添加查询条件
    if (name) {
      queryBuilder.andWhere('serviceObject.name LIKE :name', { name: `%${name}%` })
    }

    return paginate(queryBuilder, { page, pageSize })
  }

  /**
   * 查询单个服务对象
   */
  async findOne(id: number): Promise<ServiceObject> {
    const serviceObject = await this.serviceObjectRepository.findOne({
      where: { id },
    })

    if (!serviceObject) {
      throw new NotFoundException(`ServiceObject with ID ${id} not found`)
    }

    return serviceObject
  }

  /**
   * 更新服务对象
   */
  async update(id: number, updateServiceObjectDto: UpdateServiceObjectDto): Promise<ServiceObject> {
    const serviceObject = await this.findOne(id)
    Object.assign(serviceObject, updateServiceObjectDto)
    return this.serviceObjectRepository.save(serviceObject)
  }

  /**
   * 删除服务对象
   */
  async remove(id: number): Promise<void> {
    const serviceObject = await this.findOne(id)
    await this.serviceObjectRepository.remove(serviceObject)
  }
}
