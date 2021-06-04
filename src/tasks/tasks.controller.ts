import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from 'schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(): Promise<Task[]> {
    console.log('call get tasks controller');
    return this.taskService.getTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('call create task controller');
    return this.taskService.createTask(createTaskDto);
  }
}
