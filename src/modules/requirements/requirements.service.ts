import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { ProjectsService } from '../projects/projects.service'
import { CreateRequirementDto } from './dto/create-requirement.dto'
import { UpdateRequirementDto } from './dto/update-requirement.dto'
import { Requirement } from './entities/requirement.entity'

@Injectable()
export class RequirementsService {
  constructor(
    @InjectRepository(Requirement)
    private readonly requirementRepository: Repository<Requirement>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createRequirementDto: CreateRequirementDto) {
    const requirement = this.requirementRepository.create(createRequirementDto)
    const savedRequirement = await this.requirementRepository.save(requirement)

    // 如果关联了项目，更新项目进度
    if (savedRequirement.projectId) {
      await this.updateProjectProgress(savedRequirement.projectId)
    }

    return savedRequirement
  }

  async findAll(query: any): Promise<Pagination<Requirement>> {
    const { page, pageSize, title, status, priority, requirementPoolId, projectId } = query

    const queryBuilder = this.requirementRepository.createQueryBuilder('requirement')
      .leftJoinAndSelect('requirement.requirementPool', 'requirementPool')
      .leftJoinAndSelect('requirement.project', 'project')

    if (title) {
      queryBuilder.andWhere('requirement.title LIKE :title', { title: `%${title}%` })
    }

    if (status) {
      queryBuilder.andWhere('requirement.status = :status', { status })
    }

    if (priority) {
      queryBuilder.andWhere('requirement.priority = :priority', { priority })
    }

    if (requirementPoolId) {
      queryBuilder.andWhere('requirement.requirementPoolId = :requirementPoolId', { requirementPoolId })
    }

    if (projectId) {
      queryBuilder.andWhere('requirement.projectId = :projectId', { projectId })
    }

    return paginate(queryBuilder, { page, pageSize })
  }

  async findOne(id: number) {
    return this.requirementRepository.findOne({
      where: { id },
      relations: ['requirementPool', 'project'],
    })
  }

  async update(id: number, updateRequirementDto: UpdateRequirementDto) {
    const requirement = await this.requirementRepository.findOneBy({ id })
    if (!requirement) {
      throw new Error('Requirement not found')
    }

    const oldProjectId = requirement.projectId
    const updatedRequirement = await this.requirementRepository.update(id, updateRequirementDto)

    // 更新进度
    if (oldProjectId && oldProjectId !== updateRequirementDto.projectId) {
      await this.updateProjectProgress(oldProjectId)
    }

    if (updateRequirementDto.projectId) {
      await this.updateProjectProgress(updateRequirementDto.projectId)
    }

    return updatedRequirement
  }

  async remove(id: number) {
    const requirement = await this.requirementRepository.findOneBy({ id })
    if (!requirement) {
      throw new Error('Requirement not found')
    }

    const projectId = requirement.projectId
    const result = await this.requirementRepository.delete(id)

    // 如果关联了项目，更新项目进度
    if (projectId) {
      await this.updateProjectProgress(projectId)
    }

    return result
  }

  // 更新项目进度
  async updateProjectProgress(projectId: number) {
    const requirements = await this.requirementRepository.find({
      where: { projectId },
      select: ['progress'],
    })

    if (requirements.length === 0) {
      await this.projectsService.updateProgress(projectId, 0)
      return
    }

    const totalProgress = requirements.reduce((sum, req) => sum + req.progress, 0)
    const averageProgress = Math.round(totalProgress / requirements.length)

    await this.projectsService.updateProgress(projectId, averageProgress)
  }
}
