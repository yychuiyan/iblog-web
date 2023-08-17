import { GET_WEATHER } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  weather: {},
};
export const WeatherReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        weather: action.weather,
      };
    default:
      return state;
  }
};
