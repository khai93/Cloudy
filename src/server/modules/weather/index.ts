import { RequestModule } from "../request";
import { WeatherUnlockedModule } from "./weatherUnlocked";

export const WeatherModule = new WeatherUnlockedModule({
    requestModule: new RequestModule()
});