export class ServerError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
        this.name = "ServerError";
    }
}

export default function createError(source: string, error: Error, status?: number): never {
    throw new ServerError(`${source} Error: ${error.message}`, status);
}