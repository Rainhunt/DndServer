import c from "config";

interface Config {
    LOGGER: string;
}

const defaultConfig: Config = {
    LOGGER: "morgan"
}

const config: Config = { ...defaultConfig, ...c } as Config;
export default config;