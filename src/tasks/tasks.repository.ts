import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async getTasks(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const result = await this.taskModel.findOne({ _id: id }).exec();
    return result;
  }

  async updateTask(updateTaskDto: UpdateTaskDto, id: string): Promise<Task> {
    const { title, description } = updateTaskDto;
    const data = {
      title: title,
      description: description,
    };
    const task = await this.taskModel.findById(id);
    return await task.updateOne(data);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskModel.findById(id);
    return await task.deleteOne();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const data = {
      title: title,
      description: description,
    };
    const createTask = new this.taskModel(data);
    return createTask.save();
  }
}
