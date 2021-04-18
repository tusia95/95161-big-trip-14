import {getTotalSum} from '../mock/utils';
export const createCostTemplate = (tripPoints) => {
  return (
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalSum(tripPoints)}</span>
     </p>`);
};

