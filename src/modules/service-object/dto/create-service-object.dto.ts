import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateServiceObjectDto {
  @ApiProperty({ description: '服务对象名称', example: '内部团队' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '服务对象描述', example: '公司内部开发团队' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '是否启用', example: true })
  @IsBoolean()
  @IsOptional()
  enabled?: boolean = true
}
