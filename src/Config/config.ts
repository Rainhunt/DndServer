import c from "config";

interface Config {
    LOGGER: string;
    SCHEMA_VALIDATOR: string;
}

const defaultConfig: Config = {
    LOGGER: "morgan",
    SCHEMA_VALIDATOR: "joi"
}

const config: Config = { ...defaultConfig, ...c } as Config;
export default config;