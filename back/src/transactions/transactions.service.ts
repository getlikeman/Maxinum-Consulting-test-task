import {Injectable} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {}
    create(createTransactionDto: CreateTransactionDto) {
        return this.prisma.transactions.create({
            data: createTransactionDto,
        });
    }

    async findAll() {
        return this.prisma.transactions.findMany();
    }

    async findOne(id: number) {
        return this.prisma.transactions.findFirst({where: {id}});
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
            return this.prisma.transactions.updateMany({
            where: {id},
            data:updateTransactionDto
        });
    }
    async remove(id: number) {
        return this.prisma.transactions.deleteMany({where: {id}});
    }
}
