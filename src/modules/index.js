import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';
import { todayComponents } from './contentComponents/todayIndex';
import { weekComponents } from './contentComponents/thisWeekIndex';

export const mainComponents = () => {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	divWrapper.appendChild(inboxComponents());

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

	/* 
		SOURCES
		- https://www.quackit.com/html/html_editors/scratchpad/?example=/javascript/examples/javascript_switch_statement
		- https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
		
		PROBLEMS
		- IS NOT WORKING FIX THE PARAMS AREA WHERE SEARCH THE SPECIFIC ID AND INSERT IT INTO PAGES (SOLVED)
		- PARAMS MUST BE TARGET DYNAMICALLY (SOLVED)
		- if submitted and refresh will be remove the current event
	*/

	document.addEventListener('DOMContentLoaded', (event) => {
		const body = document.getElementById('sideBarContainer');

		body.addEventListener(
			'click',
			(e) => {
				let params = e.target.id;

				switch (params) {
					case 'inboxId':
						divWrapper.appendChild(inboxComponents());
						break;

					case 'todayId':
						divWrapper.appendChild(todayComponents());
						break;

					case 'weekId':
						divWrapper.appendChild(weekComponents());
						break;
				}
			},
			false
		);
	});

	const removeAllElement = (paramsComponents) => {
		const selectElement = document.querySelector('#inboxIndex');

		selectElement.parentElement.removeChild(selectElement);
		divWrapper.appendChild(paramsComponents);

		location.reload();
	};

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
};
