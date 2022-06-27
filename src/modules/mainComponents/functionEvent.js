import { inboxComponents } from '../contentComponents/inboxIndex';

export const funcEvent = () => {
	const linkItem = document.querySelector(
		'.sideBarContainer__list--item__link'
	);

	linkItem.setAttribute('href', `${inboxComponents().innerHTML}`);

	return linkItem;

	// linkItem.setAttribute('href', `${inboxComponents().innerHTML}`);
};
