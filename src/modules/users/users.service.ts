import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/constants/roles';

@Injectable()
export class UsersService {
  getById(id: string) {
    return {
      id,
      email: `${id}@email.com`,
      roles: [Role.USER],
    };
  }

  update(id: string, data: any) {
    return {
      id,
      ...data,
      updated: true,
    };
  }
}
