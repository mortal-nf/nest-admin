import { PartialType } from '@nestjs/mapped-types'
import { CreateServiceObjectDto } from './create-service-object.dto'

export class UpdateServiceObjectDto extends PartialType(CreateServiceObjectDto) {}
