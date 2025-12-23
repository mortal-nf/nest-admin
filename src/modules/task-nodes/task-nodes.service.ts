import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'
import { ProjectsService } from '../projects/projects.service'
import { CreateTaskNodeDto } from './dto/create-task-node.dto'
import { UpdateTaskNodeDto } from './dto/update-task-node.dto'
import { TaskNode } from './entities/task-node.entity'

@Injectable()
export class TaskNodesService {
  constructor(
    @InjectRepository(TaskNode)
    private readonly taskNodeRepository: Repository<TaskNode>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createTaskNodeDto: CreateTaskNodeDto) {
    const taskNode = this.taskNodeRepository.create({
      ...createTaskNodeDto,
      dueDate: createTaskNodeDto.dueDate ? new Date(createTaskNodeDto.dueDate) : null,
    })

    const savedTaskNode = await this.taskNodeRepository.save(taskNode)

    // 更新项目的节点进度
    await this.updateProjectProgressByNodes(createTaskNodeDto.projectId)

    return savedTaskNode
  }

  async findAll(query: any): Promise<Pagination<TaskNode>> {
    const { page, pageSize, title, status, projectId } = query

    const queryBuilder = this.taskNodeRepository.createQueryBuilder('taskNode')
      .where('taskNode.projectId = :projectId', { projectId })
      .orderBy('taskNode.order', 'ASC')

    if (title) {
      queryBuilder.andWhere('taskNode.title LIKE :title', { title: `%${title}%` })
    }

    if (status) {
      queryBuilder.andWhere('taskNode.status = :status', { status })
    }

    return paginate(queryBuilder, { page, pageSize })
  }

  async findOne(id: number) {
    const taskNode = await this.taskNodeRepository.findOne({
      where: { id },
      relations: ['project'],
    })

    if (!taskNode) {
      throw new NotFoundException(`Task node with ID ${id} not found`)
    }

    return taskNode
  }

  async update(id: number, updateTaskNodeDto: UpdateTaskNodeDto) {
    const taskNode = await this.findOne(id)
    const projectId = taskNode.projectId

    // 转换日期格式
    const updatedData: any = { ...updateTaskNodeDto }
    if (updateTaskNodeDto.dueDate) {
      updatedData.dueDate = new Date(updateTaskNodeDto.dueDate)
    }
    if (updateTaskNodeDto.actualCompletionDate) {
      updatedData.actualCompletionDate = new Date(updateTaskNodeDto.actualCompletionDate)
    }

    await this.taskNodeRepository.update(id, updatedData)

    // 更新项目的节点进度
    await this.updateProjectProgressByNodes(projectId)

    return this.findOne(id)
  }

  async remove(id: number) {
    const taskNode = await this.findOne(id)
    const projectId = taskNode.projectId

    const result = await this.taskNodeRepository.delete(id)

    // 更新项目的节点进度
    await this.updateProjectProgressByNodes(projectId)

    return result
  }

  // 根据任务节点更新项目进度
  async updateProjectProgressByNodes(projectId: number) {
    const taskNodes = await this.taskNodeRepository.find({
      where: { projectId },
      select: ['status'],
    })

    if (taskNodes.length === 0) {
      return
    }

    // 计算已完成节点的百分比
    const completedNodes = taskNodes.filter(node => node.status === 'completed').length
    const nodeProgress = Math.round((completedNodes / taskNodes.length) * 100)

    // 获取当前项目
    const project = await this.projectsService.findOne(projectId)

    // 结合需求进度和节点进度，取平均值作为项目进度
    await this.projectsService.updateProgress(projectId, nodeProgress)
  }
}
