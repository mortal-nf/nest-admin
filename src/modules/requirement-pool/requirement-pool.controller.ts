import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { CreateRequirementPoolDto } from './dto/create-requirement-pool.dto'
import { RequirementPoolQueryDto } from './dto/requirement-pool-query.dto'
import { UpdateRequirementPoolDto } from './dto/update-requirement-pool.dto'
import { RequirementPool } from './entities/requirement-pool.entity'
import { RequirementPoolService } from './requirement-pool.service'

@ApiTags('需求池管理模块')
@Controller('requirement-pools')
export class RequirementPoolController {
  constructor(private readonly requirementPoolService: RequirementPoolService) {
  }

  @Post()
  @ApiOperation({ summary: '创建需求池' })
  @ApiCreatedResponse({ type: RequirementPool })
  @ApiResult({ type: RequirementPool })
  async create(@Body() createRequirementPoolDto: CreateRequirementPoolDto): Promise<RequirementPool> {
    return this.requirementPoolService.create(createRequirementPoolDto)
  }

  @Get()
  @ApiOperation({ summary: '获取需求池列表' })
  @ApiOkResponse({ type: [RequirementPool] })
  @ApiResult({ type: [RequirementPool], isPage: true })
  async findAll(@Query() query: RequirementPoolQueryDto): Promise<Pagination<RequirementPool>> {
    return this.requirementPoolService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取需求池详情' })
  @ApiOkResponse({ type: RequirementPool })
  @ApiResult({ type: RequirementPool })
  async findOne(@Param('id') id: string): Promise<RequirementPool> {
    return this.requirementPoolService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新需求池' })
  @ApiOkResponse({ type: RequirementPool })
  @ApiResult({ type: RequirementPool })
  async update(
        @Param('id') id: string,
        @Body() updateRequirementPoolDto: UpdateRequirementPoolDto,
  ): Promise<RequirementPool> {
    return this.requirementPoolService.update(+id, updateRequirementPoolDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除需求池' })
  @ApiResult({ type: RequirementPool })
  async remove(@Param('id') id: string): Promise<void> {
    return this.requirementPoolService.remove(+id)
  }
}
