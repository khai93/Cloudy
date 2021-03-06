import { param, query } from 'express-validator';
import { IExecuteable, RouteDependencies } from "../../types";
import { Validate } from '../../middlewares/validate/validate';
import { WeatherControllerDependencies } from "../weatherController";
import { Location } from 'src/server/modules/weather/types';

const weatherDataRouteValidations = [
   query('long').exists().isFloat(),
   query('lat').exists().isFloat()
];

export default class ForecastWeatherRoute implements IExecuteable {
   constructor(
      private dependencies: RouteDependencies,
      private parentDependencies: WeatherControllerDependencies
   ) { }

   public execute() {
      this.dependencies.router.get('/forecast', ...Validate(weatherDataRouteValidations), async (req, res) => {
         try {
            const location: Location = {
               longitude: parseFloat(req.query.long),
               latitude: parseFloat(req.query.lat),
            }

            const data = await this.parentDependencies.weatherService.getForecastData(location);
           
            res.send(data);
         } catch (e) {
            this.parentDependencies.logger.error(e);
         }
      });
   }
}