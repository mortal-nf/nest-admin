import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class ServiceObjectQueryDto extends PagerDto {
  @ApiPropertyOptional({ description: '服务对象名称模糊查询' })
  @IsString()
  @IsOptional()
  name?: string
}
