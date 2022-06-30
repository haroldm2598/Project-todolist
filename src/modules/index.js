import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { inboxComponents } from './contentComponents/inboxIndex';

export const mainComponents = () => {
	const divWrapper = document.createElement('div');

	divWrapper.classList.add('wrapper');

	divWrapper.appendChild(sidebarComponents());
	divWrapper.appendChild(inboxComponents());

	document.body.appendChild(headerComponents());
	document.body.appendChild(divWrapper);
	// document.body.appendChild(inboxComponents());
};
