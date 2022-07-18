import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';

export const mainComponents = () => {
	const divWrapper = document.createElement('div');
	const inboxBtn = document.querySelector('#inboxId');
	const todayBtn = document.querySelector('#todayId');
	const weekBtn = document.querySelector('#weekId');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	console.log(inboxBtn);

	divWrapper.appendChild(inboxComponents());

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
};
