import { Injectable } from '@nestjs/common';
import { RegisterUser } from 'src/dtos/User.dto';
import { PrismaLogicService } from 'src/prisma-logic/prisma-logic.service';
import { encrypt } from 'src/utils/bcrypt';

@Injectable()
export class RegisterserviceService {

    constructor(private readonly prisma: PrismaLogicService) { }
    async createUser(data: RegisterUser) {

        const { email, password } = data
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            const hashedPassword = await encrypt(password)
            const newUser = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword
                }
            })
            return newUser;
        }
    }
}
