import { PartialType } from '@nestjs/swagger'
import { CreateRequirementDto } from './create-requirement.dto'

export class UpdateRequirementDto extends PartialType(CreateRequirementDto) {
  // 继承CreateRequirementDto的所有字段并设为可选
}
