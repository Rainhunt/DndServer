"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
exports.default = createError;
class ServerError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "ServerError";
    }
}
exports.ServerError = ServerError;
function createError(source, error, status, err) {
    if (err instanceof ServerError) {
        throw err;
    }
    else {
        const message = typeof error === "string" ? error : error.message;
        throw new ServerError(`${source} Error: ${message}`, status);
    }
}
