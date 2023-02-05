import { StatusCodes } from 'http-status-codes';
import CustomAPIError from "./custom-api-error.js";

class UnAuthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.StatusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnAuthenticatedError;