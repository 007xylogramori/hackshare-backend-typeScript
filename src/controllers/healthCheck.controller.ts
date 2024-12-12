import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getCpuUsage,
  getMemoryUsage,
  checkDatabaseConnection,
  checkThirdPartyService
} from "../utils/SystemCheck";
import { config } from "../utils/config";

interface HealthCheck {
    uptime: number;
    message: string;
    timestamp: Date;
    environment: string;
    version: string;
    memoryUsage: ReturnType<typeof getMemoryUsage>;
    cpuUsage: ReturnType<typeof getCpuUsage>;
    db?: string;
    thirdPartyService?: string;
  }

const healthcheck = asyncHandler(async (req :Request, res:Response) => {
  const healthCheck = {
    
    uptime: process.uptime(),
    message: "OK",
    timestamp: new Date(Date.now()),
    environment: config.env || "development",
    version: process.version,
    memoryUsage: getMemoryUsage(),
    cpuUsage: getCpuUsage(),
  } as HealthCheck;

  try {
    const dbState = await checkDatabaseConnection();
    healthCheck.db = dbState;

    const thirdPartyServiceStatus = await checkThirdPartyService();
    healthCheck.thirdPartyService = thirdPartyServiceStatus;

    res.status(200).json(
      new ApiResponse(
        200,
        {
          healthCheck,
        },
        "Health check details"
      )
    );
  } catch (error) {
    throw new ApiError(400, `Healthcheck failed: ${(error as Error)?.message}`);
  }
});

export { healthcheck };
