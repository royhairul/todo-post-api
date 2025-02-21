import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoRequest } from './dto/create-todo-request.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateTodoRequest } from './dto/update-todo-request.dto';

@Controller('/api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // ✅ Get All Todos
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all Todos',
  })
  async getAll() {
    const todos = await this.todoService.getAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved all todos.',
      data: todos,
    };
  }

  // ✅ Get Todo by ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a specific Todo by ID',
  })
  async getById(@Param('id') id: string) {
    const todo = await this.todoService.getById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved the todo.',
      data: todo,
    };
  }

  // ✅ Create a New Todo
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Todo successfully created',
  })
  async create(@Body() request: CreateTodoRequest) {
    const newTodo = await this.todoService.create(request);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Todo has been successfully created.',
      data: newTodo,
    };
  }

  // ✅ Update an Existing Todo
  @Put('/update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Todo successfully updated',
  })
  async update(@Param('id') id: string, @Body() request: UpdateTodoRequest) {
    const updatedTodo = await this.todoService.update(id, request);
    return {
      statusCode: HttpStatus.OK,
      message: 'Todo has been successfully updated.',
      data: updatedTodo,
    };
  }

  // ✅ Delete a Todo
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Todo successfully deleted',
  })
  async delete(@Param('id') id: string) {
    await this.todoService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Todo has been successfully deleted.',
    };
  }
}
