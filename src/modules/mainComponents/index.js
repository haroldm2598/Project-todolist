import { headerComponents } from './headerComponents';
import { sidebarComponents } from './sidebarComponents';

export const mainComponents = () => {
	document.body.appendChild(headerComponents());
	document.body.appendChild(sidebarComponents());
};
