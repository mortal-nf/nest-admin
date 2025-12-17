import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class RequirementPoolQueryDto extends PagerDto {
  @ApiPropertyOptional({ description: '需求池名称模糊查询' })
  @IsString()
  @IsOptional()
  name?: string

  @ApiPropertyOptional({ description: '关联服务对象ID筛选' })
  @IsInt()
  @Min(1)
  @IsOptional()
  serviceObjectId?: number
}
