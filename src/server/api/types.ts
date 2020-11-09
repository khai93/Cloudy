import { Router } from "express";

export interface IController {
    handler(app: Router): void
}

export type RouteDependencies = {
    router: Router
 }

 export interface IExecuteable {
    execute(): void
}
