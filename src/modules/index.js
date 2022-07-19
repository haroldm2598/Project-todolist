import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';
import { todayComponents } from './contentComponents/todayIndex';
import { weekComponents } from './contentComponents/thisWeekIndex';

export const mainComponents = () => {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	// divWrapper.appendChild(weekComponents());

	setTimeout(() => {
		const inboxBtn = document.querySelector('#inboxId');
		const todayBtn = document.querySelector('#todayId');
		const weekBtn = document.querySelector('#weekId');

		inboxBtn.addEventListener('click', () => {
			divWrapper.appendChild(inboxComponents());
		});

		todayBtn.addEventListener('click', () => {
			divWrapper.appendChild(todayComponents());
		});

		weekBtn.addEventListener('click', () => {
			divWrapper.appendChild(weekComponents());
		});
	}, 1000);

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
};
