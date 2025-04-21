import { $log } from "@tsed/logger";

import { PlatformExpress } from "@tsed/platform-express";

import { Server } from "./Server";

const SIG_EVENTS = [
    "beforeExit",
    "SIGHUP",
    "SIGINT",
    "SIGQUIT",
    "SIGILL",
    "SIGTRAP",
    "SIGABRT",
    "SIGBUS",
    "SIGFPE",
    "SIGUSR1",
    "SIGSEGV",
    "SIGUSR2",
    "SIGTERM",
];

const server = async () => {
    try {
        const platform = await PlatformExpress.bootstrap(Server);

        await platform.listen();

        SIG_EVENTS.forEach((evt) =>
            process.on(evt, async () => {
                await platform.stop();

                process.exit(0);
            }),
        );

        ["uncaughtException", "unhandledRejection"].forEach((evt) =>
            process.on(evt, async (error) => {
                $log.error({
                    event: "SERVER_" + evt.toUpperCase(),
                    message: error.message,
                    stack: error.stack,
                });

                await platform.stop();
            }),
        );
    } catch (error) {
        $log.error({
            event: "!::: SERVER_BOOTSTRAP_ERROR :::!",
            message: error.message,
            stack: error.stack,
        });
    }
};

server();
