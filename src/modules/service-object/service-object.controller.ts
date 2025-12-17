import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { CreateServiceObjectDto } from './dto/create-service-object.dto'
import { ServiceObjectQueryDto } from './dto/service-object-query.dto'
import { UpdateServiceObjectDto } from './dto/update-service-object.dto'
import { ServiceObject } from './entities/service-object.entity'
import { ServiceObjectService } from './service-object.service'

@ApiTags('服务对象管理模块')
@Controller('service-objects')
export class ServiceObjectController {
  constructor(private readonly serviceObjectService: ServiceObjectService) {
  }

  @Post()
  @ApiOperation({ summary: '创建服务对象' })
  @ApiCreatedResponse({ type: ServiceObject })
  @ApiResult({ type: ServiceObject })
  async create(@Body() createServiceObjectDto: CreateServiceObjectDto): Promise<ServiceObject> {
    return this.serviceObjectService.create(createServiceObjectDto)
  }

  @Get()
  @ApiOperation({ summary: '获取服务对象列表' })
  @ApiOkResponse({ type: [ServiceObject] })
  @ApiResult({ type: [ServiceObject], isPage: true })
  async findAll(@Query() query: ServiceObjectQueryDto): Promise<Pagination<ServiceObject>> {
    return this.serviceObjectService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取服务对象详情' })
  @ApiOkResponse({ type: ServiceObject })
  @ApiResult({ type: ServiceObject })
  async findOne(@Param('id') id: string): Promise<ServiceObject> {
    return this.serviceObjectService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新服务对象' })
  @ApiOkResponse({ type: ServiceObject })
  @ApiResult({ type: ServiceObject })
  async update(
        @Param('id') id: string,
        @Body() updateServiceObjectDto: UpdateServiceObjectDto,
  ): Promise<ServiceObject> {
    return this.serviceObjectService.update(+id, updateServiceObjectDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除服务对象' })
  @ApiResult({ type: ServiceObject })
  async remove(@Param('id') id: string): Promise<void> {
    return this.serviceObjectService.remove(+id)
  }
}
