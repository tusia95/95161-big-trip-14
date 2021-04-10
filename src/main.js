const TRIP_POINTS_NUMBER = 3;
import {createEventCardTemplate} from './view/event-card';
import {createMenuTemplate} from './view/menu';
import {createEventEditTemplate} from './view/event-edit';
import {сreateFiltersTemplate}  from './view/filter';
import {createSortTemplate}  from './view/sort';
import {createCostTemplate} from './view/trip-cost';
import {createTripInfoTemplate} from './view/trip-info';
import {createDayEventsContainer} from './view/day-events-container';

// render template
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const tripMainInfoElement = document.querySelector('.trip-main');

render(tripMainInfoElement, createTripInfoTemplate(), 'afterbegin');
// render(tripMainInfoElement, createNewEventButtonTemplate(), `beforeend`);

const tripControlElement = document.querySelector('.trip-controls');
const tripInfoElement = document.querySelector('.trip-info');

render(tripInfoElement, createCostTemplate(), 'beforeend');

render(tripControlElement, сreateFiltersTemplate(), 'beforeend');

const tripSwitcherElement = tripControlElement.querySelector(':first-child');


render(tripSwitcherElement, createMenuTemplate(), 'afterend');

const tripEventsElement = document.querySelector('.trip-events');

render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createEventEditTemplate(), 'beforeend');

const sortingElement = document.querySelector('.event--edit');
render(sortingElement, createDayEventsContainer(), 'afterend');


const eventsListElement = tripEventsElement.querySelector('.trip-events__list');

// 3 trip points
for(let i = 0; i<TRIP_POINTS_NUMBER; i++) {
  render(eventsListElement, createEventCardTemplate(), 'beforeend');
}

