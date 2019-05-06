import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import ChartSagas from "./Chart";

export default [...ApiErrors, ...WeatherSagas, ...ChartSagas];
