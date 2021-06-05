import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from 'schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(): Promise<Task[]> {
    console.log('call get tasks controller');
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskbyId(id);
  }

  @Put('/:id')
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    console.log(`controller ${id}`);
    return this.taskService.updateTask(updateTaskDto, id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('call create task controller');
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
