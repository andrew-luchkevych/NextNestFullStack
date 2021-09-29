import { Request } from 'express';
import User from 'src/entities/User/User.entity';

interface RequestWithUser extends Request {
	user: User;
}

export default RequestWithUser;