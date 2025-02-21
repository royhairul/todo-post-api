import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { TodoPriority, TodoStatus } from '@prisma/client';

export class CreateTodoRequest {
  @ApiProperty({
    example: 'Promo Shopee 11.11',
    description: 'Judul dari todo',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'Menjadwalkan post promo Shopee 11.11 di Instagram',
    description: 'Deskripsi opsional',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Shopee Official',
    description: 'Nama brand atau akun sosial media',
  })
  @IsString()
  brand: string;

  @ApiProperty({
    example: '2025-03-01',
    description: 'Tanggal deadline todo (format YYYY-MM-DD)',
  })
  @IsDateString({ strict: true })
  dueDate: string;

  @ApiProperty({
    example: 'Instagram',
    description: 'Platform sosial media yang digunakan',
  })
  @IsString()
  platform: string;

  @ApiPropertyOptional({
    example: 150000,
    description: 'Budget untuk post berbayar (opsional)',
  })
  @IsOptional()
  @IsNumber()
  payment?: number;

  @ApiProperty({
    enum: TodoPriority,
    example: TodoPriority.HIGH,
    description: 'Prioritas todo',
  })
  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @ApiProperty({
    enum: TodoStatus,
    example: TodoStatus.PENDING,
    description: 'Status todo',
  })
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
