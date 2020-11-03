import { RequestHandler } from "express";
import { ValidationChain, validationResult } from "express-validator";

export function Validate(validations: ValidationChain[]): [ValidationChain[], RequestHandler] {
    return [
        validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            return next();
        }
    ]
}