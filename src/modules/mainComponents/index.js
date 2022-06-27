import { headerComponents } from './headerComponents';
import { sidebarComponents } from './sidebarComponents';
import { funcEvent } from './functionEvent';

export const mainComponents = () => {
	document.body.appendChild(headerComponents());
	document.body.appendChild(sidebarComponents());
	funcEvent();
};
