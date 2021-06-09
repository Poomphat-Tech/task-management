import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is empyty' })
  title: string;

  @IsNotEmpty()
  description: string;
}
