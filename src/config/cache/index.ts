import { $log } from "@tsed/logger";

import IORedis from "ioredis";

import { REDIS_URI } from "../variables";

export const redisClient = new IORedis(REDIS_URI);

redisClient.on("connect", () => {
    $log.info("::: Redis Client Connection Estabilished :::");
});

redisClient.on("reconnecting", () => {
    $log.warn("!::: Redis Client Stalling... Something is off, reconnecting... :::!");
});

redisClient.on("error", (err) => {
    $log.error("!::: Redis Client Failed for reason: ", err);

    return;
});
