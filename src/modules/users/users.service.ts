import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/constants/roles';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  getById(id: string): User {
    return {
      id,
      name: 'John Smith',
      email: `${id}@email.com`,
      roles: [Role.USER],
    };
  }

  update(id: string, data: UpdateUserDto): User {
    const { name, email } = data;

    return {
      id,
      name,
      email: email ?? 'example@site.com',
      roles: [Role.USER],
    };
  }
}
