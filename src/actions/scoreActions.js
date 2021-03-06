import { getSpiData } from '../selectors/contentSelector';
import { getScore, makeYearsArray } from '../services/SocialProgress';

export const GET_SCORE = 'GET_SCORE';
export const GET_SPI = 'GET_SPI';
export const GET_YEARS = 'GET_YEARS';

export const createScore = (name, longName, spiData) => dispatch => {
  getScore(name, longName, spiData)
    .then(createdScore => dispatch({
      type: GET_SCORE,
      payload: createdScore
    }));
};

export const createSPI = (data) => dispatch => {
  getSpiData(data)
    .then(createdSPI => dispatch({
      type: GET_SPI,
      payload: createdSPI
    }));
};

export const createYears = (spiData) => dispatch => {
  makeYearsArray(spiData)
    .then(array => dispatch({
      type: GET_YEARS,
      payload: array
    }));
};
