import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTaskNodeDto } from './create-task-node.dto'

export class UpdateTaskNodeDto extends PartialType(CreateTaskNodeDto) {
  @ApiProperty({ description: '实际完成日期', required: false })
  actualCompletionDate?: string
}
