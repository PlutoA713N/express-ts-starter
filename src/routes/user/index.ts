import {Router} from "express";
import {registerUser} from '../../controller/user/user.register.controller'
import {handleUserLogin} from "../../controller/user/user.login.controller";
import {
    validateLoginRules,
    validateRegistrationRules,
    validateResult
} from "../../middleware/user_middleware/validate.middleware";
import {loginRateLimiter} from "../../middleware/express_middleware/rate.limiter.middleware";

const router = Router();

router.post("/register", validateRegistrationRules, validateResult, registerUser)

router.post("/login", loginRateLimiter, ...validateLoginRules, validateResult, handleUserLogin )

export default router;