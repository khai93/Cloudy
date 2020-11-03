import { param, query } from 'express-validator';
import { IExecuteable } from "../../IExecuteable";
import { Validate } from '../../middlewares/validate/validate';
import { RouteDependencies } from "../../RouteDependencies";
import { WeatherControllerDependencies } from "../weatherController";
import { Location, Units } from "../weatherService";

const weatherDataRouteValidations = [
   query('long').exists().isFloat(),
   query('lat').exists().isFloat()
];

export default class weatherData implements IExecuteable {
   constructor(
      private dependencies: RouteDependencies,
      private parentDependencies: WeatherControllerDependencies
   ) { }

   public execute() {
      this.dependencies.router.get('/data', ...Validate(weatherDataRouteValidations), async (req, res) => {
         try {
            const location: Location = {
               longitude: parseInt(req.query.long),
               latitude: parseInt(req.query.lat),
            }

            const units: Units = req.params.units as Units || 'imperial';

            const data = await this.parentDependencies.weatherService.getOneCallData(location, units);
           
            res.send(data);
         } catch (e) {
            this.parentDependencies.logger.error(e);
            throw e;
         }
      });
   }
}