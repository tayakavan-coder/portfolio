import { Router } from 'express';
import { createContactMessage } from '../controllers/contactController';
import { getProjects } from '../controllers/projectController';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ONLINE', system: 'YAKAVAN CYBER CORE v2.0', timestamp: new Date() });
});

// Contact Route
router.post('/contact', createContactMessage);

// Projects Route
router.get('/projects', getProjects);

export default router;
