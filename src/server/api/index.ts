import { StatusController } from "./status/statusController";
import { Logger } from "../logger/logger";
import { RouteUtility } from "../utils/routes";
import { join, resolve } from 'path';
import { readdir } from 'fs/promises';
import { ControllerUtility } from "../utils/controllers";
import { WeatherController } from "./weather/weatherController";
import { WeatherService } from "./weather/weatherService";
import { RequestModule } from "../modules/request";

const logger = new Logger();

const RouteUtilityDep = new RouteUtility({ readdir, pathJoin: join, logger});
const ControllerUtilityDep = new ControllerUtility({ pathResolve: resolve, routeUtility: RouteUtilityDep });
const requestModDep = new RequestModule({});

const defaultControllerDependencies = { 
    controllerUtility: ControllerUtilityDep,
    logger: logger
};

const weatherService = new WeatherService({ 
    requestModule: requestModDep,
    logger
 })

export default [
    new StatusController(defaultControllerDependencies),
    new WeatherController({
        ...defaultControllerDependencies,
        weatherService
    })
]