import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { Project } from '~/modules/projects/entities/projects.entity'

@Entity('task_nodes')
export class TaskNode extends CompleteEntity {
  @ApiProperty({ description: '节点标题' })
  @Column({ length: 255, comment: '节点标题' })
  title: string

  @ApiProperty({ description: '节点描述', required: false })
  @Column({ type: 'text', nullable: true, comment: '节点描述' })
  description: string

  @ApiProperty({
    description: '节点状态',
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    example: 'pending',
  })
  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
    comment: '节点状态: pending-待处理, in_progress-处理中, completed-已完成, cancelled-已取消',
  })
  status: string

  @ApiProperty({ description: '节点顺序' })
  @Column({ type: 'int', default: 0, comment: '节点顺序' })
  order: number

  @ApiProperty({ description: '计划完成日期', required: false })
  @Column({ type: 'date', nullable: true, comment: '计划完成日期' })
  dueDate: Date

  @ApiProperty({ description: '实际完成日期', required: false })
  @Column({ type: 'date', nullable: true, comment: '实际完成日期' })
  actualCompletionDate: Date

  @ApiProperty({ description: '关联的项目ID' })
  @Column({ name: 'project_id', comment: '关联的项目ID' })
  projectId: number

  @ManyToOne(() => Project, project => project.taskNodes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project
}
