import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await AuthController.register(name, email, password);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthController.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

authRouter.post('/change-password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const message = await AuthController.changePassword(email, oldPassword, newPassword);
    res.json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default authRouter;
