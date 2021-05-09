import {TRANSFER_EVENTS, ACTIVITY_EVENTS} from './event';

export const MONTHS_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getTotalSum = (tripPoints) => {
  const prices = tripPoints.map((tripPoint) => tripPoint.price);
  const pointsOptions = tripPoints.map((tripPoint) => {
    let pointOffer;
    if (tripPoint.offers.length) {
      pointOffer = tripPoint.offers;
    }
    else pointOffer = 0;

    return pointOffer;

  });

  const optionPrices = pointsOptions.map(getPointOptionsPrices).flat();
  const optionsPricesSum = optionPrices.reduce((sum, current)=> { return sum + current;}, 0);
  const pointsSum = prices.reduce((sum, current) => {
    return sum + current;
  }, 0);
  return pointsSum + optionsPricesSum;
};

export const getPointOptionsPrices = (pointOptions)=> {
  if (pointOptions) {
    return pointOptions.map((pointOption) => pointOption.price);
  }
  else return 0;
};
export const formatTypeWithPreposition = (type) => {
  switch (true) {
    case TRANSFER_EVENTS.indexOf(type) >= 0:
      return 'to';
    case ACTIVITY_EVENTS.indexOf(type) >= 0:
      return 'in';
    default:
      return ' ';
  }
};


export const formatDate = (date) => {
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return {year, day, month, hours, minutes};
};

export const getTripTitle = (tripPoints) => {
  switch (true) {
    case tripPoints.length > 3:
      return `${tripPoints[0].cityName} &mdash; ... &mdash; ${tripPoints[tripPoints.length - 1].cityName}`;
    case tripPoints.length === 3:
      return `${tripPoints[0].cityName} &mdash; ${tripPoints[1].cityName}  &mdash; ${tripPoints[tripPoints.length - 1].cityName}`;
    case tripPoints.length === 1:
      return `${tripPoints[0].cityName}`;
    case tripPoints.length === 2:
      return `${tripPoints[0].cityName} &mdash; ${tripPoints[1].cityName}`;
    default:
      return 'you dont plan any trip';
  }
};

export const getTripDates = (tripPoints) => {
  return `${MONTHS_NAMES[formatDate(tripPoints[0].tripDate.start).month]} ${formatDate(tripPoints[0].tripDate.start).day}&nbsp;&mdash;&nbsp${formatDate(tripPoints[tripPoints.length - 1].tripDate.end).day}`;
};
