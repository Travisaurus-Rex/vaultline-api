import { Role } from 'src/common/constants/roles';

export interface JwtPayload {
  sub: string;
  roles: Role[];
}
