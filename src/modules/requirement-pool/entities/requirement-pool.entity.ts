import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'
import { Requirement } from '~/modules/requirements/entities/requirement.entity'
import { ServiceObject } from '~/modules/service-object/entities/service-object.entity'

@Entity('requirement_pools')
export class RequirementPool extends CompleteEntity {
  @ApiProperty({ description: '需求池名称' })
  @Column({ length: 255, comment: '需求池名称' })
  name: string

  @ApiProperty({ description: '关联的服务对象ID' })
  @Column({ name: 'service_object_id', comment: '关联的服务对象ID' })
  serviceObjectId: number

  @ApiProperty({ description: '需求池描述' })
  @Column({ type: 'text', nullable: true, comment: '需求池描述' })
  description: string

  // 与 ServiceObject 建立关系
  @ManyToOne(() => ServiceObject, { cascade: true })
  @JoinColumn({
    name: 'service_object_id', // 当前表的外键列名
    referencedColumnName: 'id', // 关联表(ServiceObject)的主键列名
  })
  serviceObject: ServiceObject

  // 与 Requirement 建立一对多关系
  @OneToMany(() => Requirement, requirement => requirement.requirementPool)
  requirements: Requirement[]
}
