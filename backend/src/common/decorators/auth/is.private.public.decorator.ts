import { SetMetadata } from '@nestjs/common';

export const IS_PRIVATE_PUBLIC = 'isPrivatePublic';
export const IsPrivatePublic = () => SetMetadata(IS_PRIVATE_PUBLIC, true);
