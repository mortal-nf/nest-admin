import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class ProjectQueryDto extends PagerDto {
  @ApiPropertyOptional({ description: '项目名称模糊查询' })
  @IsString()
  @IsOptional()
  name?: string

  @ApiPropertyOptional({
    description: '项目状态筛选',
    enum: ['planning', 'in_progress', 'overdue', 'completed', 'archived', 'cancelled', 'paused'],
  })
  @IsEnum(['planning', 'in_progress', 'overdue', 'completed', 'archived', 'cancelled', 'paused'])
  @IsOptional()
  status?: string

  @ApiPropertyOptional({ description: '关联需求池ID筛选' })
  @IsInt()
  @Min(1)
  @IsOptional()
  requirementPoolId?: number

  @ApiPropertyOptional({ description: '关联服务对象ID筛选' })
  @IsInt()
  @Min(1)
  @IsOptional()
  serviceObjectId?: number
}
