import { StatusController } from "./status/statusController";
import LoggerModule from "../modules/logger";
import { RouteUtility } from "../utils/routes";
import { join, resolve } from 'path';
import { readdir } from 'fs/promises';
import { ControllerUtility } from "../utils/controllers";
import { WeatherController } from "./weather/weatherController";
import { WeatherService } from "./weather/weatherService";
import { WeatherModule } from "../modules/weather";

const RouteUtilityDep = new RouteUtility({ readdir, pathJoin: join, logger: LoggerModule});
const ControllerUtilityDep = new ControllerUtility({ pathResolve: resolve, routeUtility: RouteUtilityDep });

/**
 * The default dependencies for every controller
 */
const defaultControllerDependencies = { 
    controllerUtility: ControllerUtilityDep,
    logger: LoggerModule
};

/**
 * Export all controllers as an array to inject inside Server.
 * Also creates a new Controller from each of the controller classes with its dependencies.
 */
export default [
    new StatusController(defaultControllerDependencies),
    new WeatherController({
        ...defaultControllerDependencies,
        weatherService: new WeatherService({ 
            weatherModule: WeatherModule,
            logger: LoggerModule
         })
    })
]