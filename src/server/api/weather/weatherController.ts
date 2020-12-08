import { Router } from "express";
import { Logger } from "src/server/modules/logger/logger";
import { ControllerUtility } from "src/server/utils/controllers";
import { IController } from "../types";
import { WeatherService } from "./weatherService";

export type WeatherControllerDependencies = {
    controllerUtility: ControllerUtility,
    logger: Logger,
    weatherService: WeatherService
}

export class WeatherController implements IController {
    private _router: Router;

    constructor(
        private dependencies: WeatherControllerDependencies
    ) {}

    public async handler(app: Router): Promise<void> {
        try {
            this._router = Router();

            app.use("/weather", this._router);

            this.dependencies.controllerUtility.setUpController({
                router: this._router,
                dirname: __dirname,
                parentDependencies: this.dependencies
            });
        } catch (e) {
            this.dependencies.logger.error(e);
        }
    }
}