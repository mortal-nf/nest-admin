import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceObject } from '~/modules/service-object/entities/service-object.entity'
import { ServiceObjectController } from './service-object.controller'
import { ServiceObjectService } from './service-object.service'

@Module({
  imports: [TypeOrmModule.forFeature([ServiceObject])],
  controllers: [ServiceObjectController],
  providers: [ServiceObjectService],
})
export class ServiceObjectModule {
}
