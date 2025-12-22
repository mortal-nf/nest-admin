import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'
import { CompleteEntity } from '~/common/entity/common.entity'

@Entity('service_objects')
export class ServiceObject extends CompleteEntity {
  @ApiProperty({ description: '服务对象名称' })
  @Column({ length: 255, comment: '服务对象名称' })
  name: string

  @ApiProperty({ description: '服务对象描述' })
  @Column({ type: 'text', nullable: true, comment: '服务对象描述' })
  description: string

  @ApiProperty({ description: '是否启用' })
  @Column({ type: 'string', default: '1', comment: '是否启用，0禁用，1启用' })
  enabled: string
}
