import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import User from '../models/UserModel';

class TwoFactorController {
  static async generateQRCode(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const secret = speakeasy.generateSecret({ name: email });
    user.secretKey = secret.base32;
    await user.save();
    const qrCodeURL = await qrcode.toDataURL(secret.otpauth_url);
    return qrCodeURL;
  }

  static async loginWithTwoFactor(email: string, password: string, otp: string) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    if (!user.secretKey) {
      throw new Error('Two-factor authentication is not set up for this user');
    }
    const verified = speakeasy.totp.verify({
      secret: user.secretKey,
      encoding: 'base32',
      token: otp,
    });
    if (!verified) {
      throw new Error('Invalid OTP');
    }
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

export default TwoFactorController;
