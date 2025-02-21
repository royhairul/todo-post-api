import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { TodoPriority, TodoStatus } from '@prisma/client';
import { CreateTodoRequest } from './create-todo-request.dto';

export class UpdateTodoRequest extends PartialType(CreateTodoRequest) {
  @ApiPropertyOptional({
    example: 'Updated Todo Title',
    description: 'Updated title of the todo',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Updated description for the todo',
    description: 'Updated description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'Updated Brand Name',
    description: 'Updated brand or social media account',
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    example: '2025-03-15',
    description: 'Updated due date in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsDateString({ strict: true })
  dueDate?: string;

  @ApiPropertyOptional({
    example: 'Facebook',
    description: 'Updated platform',
  })
  @IsOptional()
  @IsString()
  platform?: string;

  @ApiPropertyOptional({
    example: 200000,
    description: 'Updated budget for paid posts',
  })
  @IsOptional()
  @IsNumber()
  payment?: number;

  @ApiPropertyOptional({
    enum: TodoPriority,
    example: TodoPriority.MEDIUM,
    description: 'Updated priority of the todo',
  })
  @IsOptional()
  @IsEnum(TodoPriority)
  priority?: TodoPriority;

  @ApiPropertyOptional({
    enum: TodoStatus,
    example: TodoStatus.COMPLETED,
    description: 'Updated status of the todo',
  })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
