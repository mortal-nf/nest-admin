import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResult } from '~/common/decorators/api-result.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { CreateProjectDto } from './dto/create-project.dto'
import { ProjectQueryDto } from './dto/project-query.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { Project } from './entities/projects.entity'

import { ProjectsService } from './projects.service'

@ApiTags('项目管理模块')
@Controller('projects')
@ApiSecurityAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {
  }

  @Post()
  @ApiOperation({ summary: '创建项目' })
  @ApiCreatedResponse({ type: Project })
  @ApiResult({ type: Project })
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto)
  }

  @Get()
  @ApiOperation({ summary: '获取项目列表' })
  @ApiOkResponse({ type: [Project] })
  @ApiResult({ type: [Project], isPage: true })
  async findAll(@Query() query: ProjectQueryDto): Promise<Pagination<Project>> {
    return this.projectsService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取项目详情' })
  @ApiOkResponse({ type: Project })
  @ApiResult({ type: Project })
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新项目' })
  @ApiOkResponse({ type: Project })
  @ApiResult({ type: Project })
  async update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(+id, updateProjectDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除项目' })
  @ApiResult({ type: Number, status: 200 })
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(+id)
  }
}
