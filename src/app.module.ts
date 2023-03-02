import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from './bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'codica-test',
      entities: [],
    }),
    BankModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
