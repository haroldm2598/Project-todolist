import { headerComponents } from '../modules/mainComponents/headerComponents';
import { sidebarComponents } from '../modules/mainComponents/sidebarComponents';
import { funcEvent } from '../modules/mainComponents/functionEvent';

export const mainComponents = () => {
	document.body.appendChild(headerComponents());
	document.body.appendChild(sidebarComponents());
	// funcEvent();
};
