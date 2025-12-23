import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdDto } from '~/common/dto/id.dto'
import { CreateRequirementDto } from './dto/create-requirement.dto'
import { RequirementQueryDto } from './dto/requirement-query.dto'
import { UpdateRequirementDto } from './dto/update-requirement.dto'
import { RequirementsService } from './requirements.service'

@Controller('requirements')
@ApiTags('需求管理')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Post()
  @ApiOperation({ summary: '创建需求' })
  @ApiResult({})
  create(@Body() createRequirementDto: CreateRequirementDto) {
    return this.requirementsService.create(createRequirementDto)
  }

  @Get()
  @ApiOperation({ summary: '查询需求列表' })
  @ApiResult({})
  @ApiQuery({ type: RequirementQueryDto })
  findAll(@Query() query: RequirementQueryDto) {
    return this.requirementsService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询单个需求' })
  @ApiResult({})
  findOne(@Param() { id }: IdDto) {
    return this.requirementsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新需求' })
  @ApiResult({})
  update(@Param() { id }: IdDto, @Body() updateRequirementDto: UpdateRequirementDto) {
    return this.requirementsService.update(id, updateRequirementDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除需求' })
  @ApiResult({})
  remove(@Param() { id }: IdDto) {
    return this.requirementsService.remove(id)
  }
}
