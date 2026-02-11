import { Role } from 'src/common/constants/roles';

export class User {
  id: string;
  name?: string;
  email: string;
  roles: Role[];
}
