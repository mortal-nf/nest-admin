import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { CreateProjectDto } from './dto/create-project.dto'
import { ProjectQueryDto } from './dto/project-query.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { Project } from './entities/projects.entity'

@Injectable()
export class ProjectsService {
  constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
  ) {}

  /**
   * 创建项目
   */
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto)
    return this.projectRepository.save(project)
  }

  /**
   * 获取项目列表
   */
  async findAll(query: ProjectQueryDto): Promise<Pagination<Project>> {
    const { page, pageSize, name, status, requirementPoolId, serviceObjectId } = query

    const queryBuilder = this.projectRepository.createQueryBuilder('project')

    // 添加查询条件
    if (name) {
      queryBuilder.andWhere('project.name LIKE :name', { name: `%${name}%` })
    }

    if (status) {
      queryBuilder.andWhere('project.status = :status', { status })
    }

    if (requirementPoolId) {
      queryBuilder.andWhere('project.requirementPoolId = :requirementPoolId', { requirementPoolId })
    }

    if (serviceObjectId) {
      queryBuilder.andWhere('project.serviceObjectId = :serviceObjectId', { serviceObjectId })
    }

    return paginate(queryBuilder, { page, pageSize })
  }

  /**
   * 查询单个项目
   */
  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['requirementPool', 'serviceObject'],
    })

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`)
    }

    return project
  }

  /**
   * 更新项目
   */
  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id)
    Object.assign(project, updateProjectDto)
    return this.projectRepository.save(project)
  }

  /**
   * 删除项目
   */
  async remove(id: number): Promise<void> {
    const project = await this.findOne(id)
    await this.projectRepository.remove(project)
  }

  /**
   * 更新项目进度
   */
  async updateProgress(id: number, progress: number): Promise<Project> {
    const project = await this.findOne(id)
    project.progress = Math.max(0, Math.min(100, progress)) // 确保进度在0-100之间
    return this.projectRepository.save(project)
  }
}
