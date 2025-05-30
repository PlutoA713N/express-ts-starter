import {Router} from 'express';
import {mongoHealthcheck} from "../models/mongo_operations";

const router = Router();

/**
 * @openapi
 * /health/mongodb:
 *   get:
 *     summary: MongoDB Healthcheck
 *     description: Checks the connection to MongoDB and returns the connection status.
 *     responses:
 *       200:
 *         description: MongoDB is connected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 result:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: string
 *                   example: MONGO_OK
 *                 message:
 *                   type: string
 *                   example: MongoDB connected
 *                 data:
 *                   type: object
 *                   properties:
 *                     mongo:
 *                       type: string
 *                       example: connected
 *                 requestId:
 *                   type: string
 *                   example: a1b2c3d4-e5f6-7890
 *                 timestamp:
 *                   type: string
 *                   example: 2021-01-01T00:00:00.000Z
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: urn:error:DB_PING_ERROR
 *                 title:
 *                   type: string
 *                   example: Database Error
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 detail:
 *                   type: string
 *                   example: Unknown error
 *                 code:
 *                   type: string
 *                   example: DB_PING_ERROR
 *                 requestId:
 *                   type: string
 *                   example: a1b2c3d4-e5f6-7890
 *                 timestamp:
 *                   type: string
 *                   example: 2021-01-01T00:00:00.000Z
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: urn:error:TOO_MANY_REQUESTS
 *                 title:
 *                   type: string
 *                   example: Too Many Requests
 *                 status:
 *                   type: integer
 *                   example: 429
 *                 detail:
 *                   type: string
 *                   example: You have sent too many requests. Please try again later.
 *                 code:
 *                   type: string
 *                   example: TOO_MANY_REQUESTS
 *                 requestId:
 *                   type: string
 *                   example: a1b2c3d4-e5f6-7890
 *                 timestamp:
 *                   type: string
 *                   example: 2021-01-01T00:00:00.000Z
 */

router.get("/mongodb", mongoHealthcheck)

export default router;
