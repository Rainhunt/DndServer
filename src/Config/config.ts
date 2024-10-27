import c from "config";

interface Config {
    LOGGER: string;
    SCHEMA_VALIDATOR: string;
    AUTH: string;
}

const defaultConfig: Config = {
    LOGGER: "morgan",
    SCHEMA_VALIDATOR: "joi",
    AUTH: "jwt"
}

const config: Config = { ...defaultConfig, ...c } as Config;
export default config;