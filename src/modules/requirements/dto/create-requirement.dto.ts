import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateRequirementDto {
  @ApiProperty({ description: '需求标题' })
  @IsString()
  @MaxLength(255)
  title: string

  @ApiProperty({ description: '需求描述', required: false })
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty({
    description: '需求状态',
    enum: ['pending', 'processing', 'completed', 'cancelled', 'blocked'],
    default: 'pending',
  })
  @IsEnum(['pending', 'processing', 'completed', 'cancelled', 'blocked'])
  @IsOptional()
  status: string

  @ApiProperty({
    description: '需求优先级',
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  })
  @IsEnum(['low', 'medium', 'high', 'urgent'])
  @IsOptional()
  priority: string

  @ApiProperty({ description: '需求池ID' })
  @IsInt()
  requirementPoolId: number

  @ApiProperty({ description: '项目ID', required: false })
  @IsInt()
  @IsOptional()
  projectId: number

  @ApiProperty({ description: '估计工时', required: false })
  @IsInt()
  @IsOptional()
  estimatedHours: number

  @ApiProperty({ description: '完成百分比', required: false })
  @IsInt()
  @IsOptional()
  progress: number
}
