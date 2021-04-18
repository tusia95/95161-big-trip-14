const TRIP_POINTS_NUMBER = 3;
import {createEventCardTemplate} from './view/event-card';
import {createMenuTemplate} from './view/menu';
import {createEventEditTemplate} from './view/event-edit';
import {сreateFiltersTemplate}  from './view/filter';
import {createSortTemplate}  from './view/sort';
import {createCostTemplate} from './view/trip-cost';
import {createTripInfoTemplate} from './view/trip-info';
import {createDayEventsContainer} from './view/day-events-container';
import {createPointsContainer} from './view/points-container';
import {generateMockData, MOCK_DATA_NUM, generateDestinations, generateTypes} from './mock/event';
import {formatDate} from './mock/utils';

const pointDatas = generateMockData();
const eventCards = pointDatas.slice(1, MOCK_DATA_NUM);

const destinations = generateDestinations();
const types = generateTypes();
// render template
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const tripMainInfoElement = document.querySelector('.trip-main');

render(tripMainInfoElement, createTripInfoTemplate(eventCards), 'afterbegin');
//render(tripMainInfoElement, createNewEventButtonTemplate(), `beforeend`);

const tripControlElement = document.querySelector('.trip-controls');
const tripInfoElement = document.querySelector('.trip-info');

render(tripInfoElement, createCostTemplate(eventCards), 'beforeend');

render(tripControlElement, сreateFiltersTemplate(), 'beforeend');

const tripSwitcherElement = tripControlElement.querySelector(':first-child');


render(tripSwitcherElement, createMenuTemplate(), 'afterend');

const tripEventsElement = document.querySelector('.trip-events');

render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createEventEditTemplate(pointDatas[0], destinations, types), 'beforeend');

// render container for all trip days
render(tripEventsElement, createPointsContainer(), 'beforeend');

const sortCards = eventCards.sort((a, b) => {
  return formatDate(a.tripDate.start).month - formatDate(b.tripDate.start).month;
});

// all days container element
const daysContainerElement = document.querySelector('.trip-days');
let startPointDate = sortCards[0].tripDate.start;
let counter = 1;

render(daysContainerElement, createDayEventsContainer(sortCards[0], counter++), 'beforeend');
let dayEventsContainerElement = daysContainerElement.querySelector('.trip-events__list:last-child');
for (let i = 0; i < sortCards.length; i++) {
  const currentCard = sortCards[i];
  if (currentCard.tripDate.start === startPointDate) {
    render(dayEventsContainerElement, createEventCardTemplate(currentCard), 'beforeend');
  } else {
    startPointDate = currentCard.tripDate.start;
    render(daysContainerElement, createDayEventsContainer(currentCard, counter++), 'beforeend');
    dayEventsContainerElement = daysContainerElement.querySelector('.trip-events__list:last-child');
    render(dayEventsContainerElement, createEventCardTemplate(currentCard), 'beforeend');
  }
}
