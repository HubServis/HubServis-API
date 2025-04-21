import { readFileSync } from "node:fs";

import loggerConfig from "./logger";

const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const config: Partial<TsED.Configuration> = {
    version: pkg.version,
    ajv: {
        returnsCoercedValues: true,
    },
    logger: loggerConfig,
    // additional shared configuration
};
