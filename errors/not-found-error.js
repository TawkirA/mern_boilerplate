import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error.js";

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.StatusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError;