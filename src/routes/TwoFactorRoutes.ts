import { Router } from 'express';
import TwoFactorController from '../controllers/TwoFactorController';

const twoFactorRouter = Router();

twoFactorRouter.post('/generate-qr', async (req, res) => {
  try {
    const { email } = req.body;
    const qrCodeURL = await TwoFactorController.generateQRCode(email);
    res.json({ qrCodeURL });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

twoFactorRouter.post('/login-with-two-factor', async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const token = await TwoFactorController.loginWithTwoFactor(email, password, otp);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default twoFactorRouter;
