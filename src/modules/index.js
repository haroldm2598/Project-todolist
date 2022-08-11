import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';
import { todayComponents } from './contentComponents/todayIndex';
import { weekComponents } from './contentComponents/thisWeekIndex';

export const mainComponents = () => {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());

	setTimeout(() => {
		/*
			- Put if/else in order to remove the first event then add the current event you want to input.
				- insert in AddEventListener the if/else method.
			- Problem is the refresh every it refresh it is remove the eventlisterner.
			- Remove the first Element then insert the new
		*/
		const inboxBtn = document.querySelector('#inboxId');
		const todayBtn = document.querySelector('#todayId');
		const weekBtn = document.querySelector('#weekId');

		inboxBtn.addEventListener('click', () => {
			divWrapper.appendChild(inboxComponents());
		});

		todayBtn.addEventListener('click', () => {
			removeAllElement();
			divWrapper.appendChild(todayComponents());
			location.reload();
		});

		weekBtn.addEventListener('click', () => {
			divWrapper.appendChild(weekComponents());
		});
	}, 1000);

	const removeAllElement = () => {
		document
			.querySelector('#inboxIndex')
			.removeChild(document.querySelector('#inboxIndex').lastElementChild);
	};

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
};
