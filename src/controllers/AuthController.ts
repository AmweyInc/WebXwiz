import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

const JWT_SECRET = 'your_jwt_secret_key';

class AuthController {
  static async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  static async changePassword(email: string, oldPassword: string, newPassword: string) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new Error('Invalid email or password');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return 'Password changed successfully';
  }
}

export default AuthController;
