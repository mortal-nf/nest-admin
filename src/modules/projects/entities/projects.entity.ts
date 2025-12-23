import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { RequirementPool } from '~/modules/requirement-pool/entities/requirement-pool.entity'
import { Requirement } from '~/modules/requirements/entities/requirement.entity'
import { ServiceObject } from '~/modules/service-object/entities/service-object.entity'
import { TaskNode } from '~/modules/task-nodes/entities/task-node.entity'

@Entity('projects')
export class Project extends CompleteEntity {
  @ApiProperty({ description: '项目名称', example: '电商平台开发' })
  @Column({ length: 255, comment: '项目名称' })
  name: string

  @ApiProperty({ description: '项目描述', example: '开发一个全新的电商平台', required: false })
  @Column({ type: 'text', nullable: true, comment: '项目描述' })
  description: string

  @ApiProperty({
    description: '项目状态',
    enum: ['planning', 'in_progress', 'overdue', 'completed', 'archived', 'cancelled', 'paused'],
    example: 'planning',
  })
  @Column({
    type: 'enum',
    enum: ['planning', 'in_progress', 'overdue', 'completed', 'archived', 'cancelled', 'paused'],
    default: 'planning',
    comment: '项目状态: planning-规划中, in_progress-进行中, overdue-已逾期, completed-已完成, archived-已归档, cancelled-已取消, paused-暂停中',
  })
  status: string

  @ApiProperty({ description: '项目开始日期', example: '2023-01-01', required: false })
  @Column({ type: 'date', nullable: true, comment: '项目开始日期' })
  startDate: Date

  @ApiProperty({ description: '项目结束日期', example: '2023-12-31', required: false })
  @Column({ type: 'date', nullable: true, comment: '项目结束日期' })
  endDate: Date

  @ApiProperty({ description: '关联的服务对象ID', required: false })
  @Column({ name: 'service_object_id', nullable: true, comment: '关联的服务对象ID' })
  serviceObjectId: number

  @ManyToOne(() => ServiceObject, { nullable: true })
  @JoinColumn({ name: 'service_object_id' })
  serviceObject: ServiceObject

  @ApiProperty({ description: '关联的需求池ID', required: false })
  @Column({ name: 'requirement_pool_id', nullable: true, comment: '关联的需求池ID' })
  requirementPoolId: number

  // 建立与需求池的关系
  @ManyToOne(() => RequirementPool, { nullable: true })
  @JoinColumn({ name: 'requirement_pool_id' })
  requirementPool: RequirementPool

  @ApiProperty({ description: '项目进度百分比', example: 50, required: false })
  @Column({ type: 'int', default: 0, comment: '项目进度百分比(0-100)' })
  progress: number

  // 建立与需求的一对多关系
  @OneToMany(() => Requirement, requirement => requirement.project)
  requirements: Requirement[]

  // 建立与任务节点的一对多关系
  @OneToMany(() => TaskNode, taskNode => taskNode.project, { cascade: ['insert', 'update'] })
  taskNodes: TaskNode[]
}
