import { DILoggerOptions } from "@tsed/di";

import { $log } from "@tsed/logger";

import { NODE_ENV } from "../variables";

$log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug", "trace"],
    layout: {
        type: "colored",
    },
});

$log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
        type: "colored",
    },
});

export default <DILoggerOptions>{
    // disableRoutesSummary: process.env.PRODUCTION,
    debug: !NODE_ENV,
    perf: true,
};
