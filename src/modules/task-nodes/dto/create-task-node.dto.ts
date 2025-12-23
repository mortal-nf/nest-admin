import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateTaskNodeDto {
  @ApiProperty({ description: '节点标题' })
  @IsString()
  @MaxLength(255)
  title: string

  @ApiProperty({ description: '节点描述', required: false })
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty({
    description: '节点状态',
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  })
  @IsEnum(['pending', 'in_progress', 'completed', 'cancelled'])
  @IsOptional()
  status: string

  @ApiProperty({ description: '节点顺序', required: false })
  @IsInt()
  @IsOptional()
  order: number

  @ApiProperty({ description: '计划完成日期', required: false })
  @IsString()
  @IsOptional()
  dueDate: string

  @ApiProperty({ description: '关联的项目ID' })
  @IsInt()
  projectId: number
}
