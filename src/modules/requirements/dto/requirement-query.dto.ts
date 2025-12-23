import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { PagerDto } from '~/common/dto/pager.dto'

export class RequirementQueryDto extends PagerDto {
  @ApiProperty({ description: '需求标题搜索', required: false })
  @IsString()
  @IsOptional()
  title?: string

  @ApiProperty({
    description: '需求状态',
    enum: ['pending', 'processing', 'completed', 'cancelled', 'blocked'],
    required: false,
  })
  @IsEnum(['pending', 'processing', 'completed', 'cancelled', 'blocked'])
  @IsOptional()
  status?: string

  @ApiProperty({
    description: '需求优先级',
    enum: ['low', 'medium', 'high', 'urgent'],
    required: false,
  })
  @IsEnum(['low', 'medium', 'high', 'urgent'])
  @IsOptional()
  priority?: string

  @ApiProperty({ description: '需求池ID', required: false })
  @IsInt()
  @IsOptional()
  requirementPoolId?: number

  @ApiProperty({ description: '项目ID', required: false })
  @IsInt()
  @IsOptional()
  projectId?: number
}
