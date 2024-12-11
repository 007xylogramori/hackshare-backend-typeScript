import axios from "axios";
import os from "os";
import mongoose from "mongoose";

const checkDatabaseConnection = async () => {
    const state = mongoose.connection.readyState;
    return ["Disconnected", "Connecting", "Connected", "Disconnecting"][state] || "Unknown";
};

const checkThirdPartyService = async () => {
    try {
        const response = await axios.get("https://third-party-service.com/health");
        return response.status === 200 ? "Available" : "Unavailable";
    } catch {
        return "Unavailable";
    }
};

const getCpuUsage = () => {
    const cpus = os.cpus();
    let user = 0, nice = 0, sys = 0, idle = 0, irq = 0;

    for (const cpu of cpus) {
        user += cpu.times.user;
        nice += cpu.times.nice;
        sys += cpu.times.sys;
        idle += cpu.times.idle;
        irq += cpu.times.irq;
    }

    const total = user + nice + sys + idle + irq;
    return {
        user: Math.round((100 * user) / total),
        nice: Math.round((100 * nice) / total),
        sys: Math.round((100 * sys) / total),
        idle: Math.round((100 * idle) / total),
        irq: Math.round((100 * irq) / total),
    };
};

const getMemoryUsage = () => {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();

    return {
        freeMemory: `${Math.round(freeMemory / 1024 / 1024)} MB`,
        totalMemory: `${Math.round(totalMemory / 1024 / 1024)} MB`,
        usedMemory: `${Math.round((totalMemory - freeMemory) / 1024 / 1024)} MB`,
        memoryUsage: `${Math.round((100 * (totalMemory - freeMemory)) / totalMemory)} %`,
    };
};

export {
    checkDatabaseConnection,
    checkThirdPartyService,
    getCpuUsage,
    getMemoryUsage,
};
