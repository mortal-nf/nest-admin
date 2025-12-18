import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class CreateProjectDto {
  @ApiProperty({ description: '项目名称', example: '电商平台开发' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '项目描述', example: '开发一个全新的电商平台' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiPropertyOptional({
    description: '项目状态',
    enum: ['planning', 'in_progress', 'overdue', 'completed', 'archived', 'cancelled', 'paused'],
    example: 'planning',
  })
  @IsEnum(['planning', 'in_progress', 'overdue', 'completed', 'archived', 'cancelled', 'paused'])
  @IsOptional()
  status?: string

  @ApiPropertyOptional({ description: '项目开始日期', example: '2023-01-01' })
  @IsOptional()
  startDate?: Date

  @ApiPropertyOptional({ description: '项目结束日期', example: '2023-12-31' })
  @IsOptional()
  endDate?: Date

  @ApiPropertyOptional({ description: '关联的需求池ID' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  requirementPoolId?: number

  @ApiPropertyOptional({ description: '关联的服务对象ID' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  serviceObjectId?: number
}
