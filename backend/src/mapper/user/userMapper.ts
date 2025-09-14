// src/mappers/user/userMapper.ts
import { IUser } from '../../model/userModel';
import { IUserDto } from '../../dtos/user/userDto';

export const mapUserToDto = (user: IUser): IUserDto => {
  return {
    _id: user._id ? user._id.toString() : '',
    username: user.username,
    email: user.email,
    role: user.role ?? 'attendee',
    about: user.about ?? '',
    createdAt: user.createdAt ? user.createdAt.toISOString() : '',
    updatedAt: user.updatedAt ? user.updatedAt.toISOString() : ''
  };
};

export const mapUsersToDto = (users: IUser[]): IUserDto[] => {
  return users.map(mapUserToDto);
};
