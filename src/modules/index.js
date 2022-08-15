import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';
import { todayComponents } from './contentComponents/todayIndex';
import { weekComponents } from './contentComponents/thisWeekIndex';

export const mainComponents = () => {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	// divWrapper.appendChild(inboxComponents());

	// setTimeout(() => {
	// 	/*
	// 		- Put if/else in order to remove the first event then add the current event you want to input.
	// 			- insert in AddEventListener the if/else method.
	// 		- Problem is the refresh every it refresh it is remove the eventlisterner.
	// 		- Remove the first Element then insert the new
	// 		- Try to use async await method in event listener in order to not use reload method
	// 		- Try Switch case method
	// 	*/
	// 	const inboxBtn = document.querySelector('#inboxId');
	// 	const todayBtn = document.querySelector('#todayId');
	// 	const weekBtn = document.querySelector('#weekId');

	// 	inboxBtn.addEventListener('click', () => {
	// 		divWrapper.appendChild(inboxComponents());
	// 	});

	// 	todayBtn.addEventListener('click', (event) => {
	// 		document.location.reload();
	// 		event.preventDefault();
	// 		setTimeout(() => {
	// 			divWrapper.appendChild(todayComponents());
	// 		}, 3000);
	// 	});

	// 	weekBtn.addEventListener('click', () => {
	// 		divWrapper.appendChild(weekComponents());
	// 	});
	// }, 1000);

	// const removeAllElement = () => {
	// 	const selectElement = document.querySelector('#inboxIndex');

	// 	return selectElement.removeChild(selectElement.lastElementChild);
	// };

	// IS NOT WORKING FIX THE PARAMS AREA WHERE SEARCH THE SPECIFIC ID AND INSERT IT INTO PAGES
	setTimeout(() => {
		const inboxBtn = document.querySelector('#inboxId');
		const todayBtn = document.querySelector('#todayId');
		const weekBtn = document.querySelector('#weekId');
		const params = document.querySelector('#inboxId');

		switch (params) {
			case '#inboxId':
				inboxBtn.addEventListener(() => {
					removeAllElement(inboxComponents());
				});
				break;

			case '#todayId':
				todayBtn.addEventListener(() => {
					removeAllElement(todayComponents());
				});
				break;

			case '#weekId':
				weekBtn.addEventListener(() => {
					removeAllElement(weekComponents());
				});
				break;

			default:
				divWrapper.appendChild(inboxComponents());
		}
	}, 10);

	const removeAllElement = (paramsComponents) => {
		const selectElement = document.querySelector('#inboxIndex');

		selectElement.parentElement.removeChild(selectElement);
		divWrapper.appendChild(paramsComponents);

		location.reload();
	};

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
};
