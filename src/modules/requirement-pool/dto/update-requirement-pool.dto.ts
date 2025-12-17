import { PartialType } from '@nestjs/mapped-types'
import { CreateRequirementPoolDto } from './create-requirement-pool.dto'

export class UpdateRequirementPoolDto extends PartialType(CreateRequirementPoolDto) {}
