import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { Project } from '~/modules/projects/entities/projects.entity'
import { RequirementPool } from '~/modules/requirement-pool/entities/requirement-pool.entity'

@Entity('requirements')
export class Requirement extends CompleteEntity {
  @ApiProperty({ description: '需求标题' })
  @Column({ length: 255, comment: '需求标题' })
  title: string

  @ApiProperty({ description: '需求描述', required: false })
  @Column({ type: 'text', nullable: true, comment: '需求描述' })
  description: string

  @ApiProperty({
    description: '需求状态',
    enum: ['pending', 'in_progress', 'completed', 'cancelled', 'blocked'],
    default: 'pending',
  })
  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed', 'cancelled', 'blocked'],
    default: 'pending',
    comment: '需求状态: pending-待处理, processing-处理中, completed-已完成, cancelled-已取消, blocked-阻塞',
  })
  status: string

  @ApiProperty({
    description: '需求优先级',
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  })
  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    comment: '需求优先级: low-低, medium-中, high-高, urgent-紧急',
  })
  priority: string

  @ApiProperty({ description: '需求进度', example: 50, required: false })
  @Column({ type: 'int', default: 0, comment: '需求进度百分比(0-100)' })
  progress: number

  @ApiProperty({ description: '关联的需求池ID' })
  @Column({ name: 'requirement_pool_id', comment: '关联的需求池ID' })
  requirementPoolId: number

  @ManyToOne(() => RequirementPool, requirementPool => requirementPool.requirements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'requirement_pool_id' })
  requirementPool: RequirementPool

  @ApiProperty({ description: '关联的项目ID', required: false })
  @Column({ name: 'project_id', nullable: true, comment: '关联的项目ID' })
  projectId: number

  @ManyToOne(() => Project, project => project.requirements, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: Project
}
