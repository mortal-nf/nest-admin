import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class TaskNodeQueryDto extends PagerDto {
  @ApiProperty({ description: '节点标题搜索', required: false })
  @IsString()
  @IsOptional()
  title?: string

  @ApiProperty({
    description: '节点状态',
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    required: false,
  })
  @IsEnum(['pending', 'in_progress', 'completed', 'cancelled'])
  @IsOptional()
  status?: string

  @ApiProperty({ description: '项目ID' })
  @IsInt()
  @IsOptional()
  projectId: number
}
