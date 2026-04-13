import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { auth } from "./auth.js";
const router = Router();
router.post('/api/register', register);
router.post('/api/login', login);
export default router;
//# sourceMappingURL=auth.route.js.map