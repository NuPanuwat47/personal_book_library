import { Router } from "express";
import { deleteUser, getUsers } from "./user.controller.js";
import { auth } from "../middleware/auth.js";
const router = Router();
router.get('/api/users', auth, getUsers);
router.delete('/api/users/:id', auth, deleteUser);
export default router;
//# sourceMappingURL=user.route.js.map