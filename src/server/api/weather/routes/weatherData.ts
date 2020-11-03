import { IExecuteable } from "../../IExecuteable";
import { RouteDependencies } from "../../RouteDependencies";
import { WeatherControllerDependencies } from "../weatherController";
import { Location, Units } from "../weatherService";

export default class weatherData implements IExecuteable {
   constructor(
      private dependencies: RouteDependencies,
      private parentDependencies: WeatherControllerDependencies
   ) { }

   public execute() {
      this.dependencies.router.get('/data', async (req, res) => {
         const location: Location = {
            longitude: parseInt(req.params.long),
            latitude: parseInt(req.params.lat),
         }

         const units: Units = req.params.units as Units || 'imperial';

         const data =  await this.parentDependencies.weatherService.getOneCallData(location, units);
         
         res.send(data);
      });
   }
}