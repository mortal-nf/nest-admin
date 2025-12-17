import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateRequirementPoolDto {
  @ApiProperty({ description: '需求池名称', example: '电商平台需求池' })
  @IsString()
  name: string

  @ApiProperty({ description: '关联的服务对象ID' })
  @IsNumber()
  @Min(1)
  serviceObjectId: number

  @ApiPropertyOptional({ description: '需求池描述', example: '电商平台相关需求收集' })
  @IsString()
  @IsOptional()
  description?: string
}
