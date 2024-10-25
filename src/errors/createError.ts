export class ServerError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
        this.name = "ServerError";
    }
}

export default function createError(source: string, error: Error | string, status?: number): never {
    const message = typeof error === "string" ? error : error.message;
    throw new ServerError(`${source} Error: ${message}`, status);
}