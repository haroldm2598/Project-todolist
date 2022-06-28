import { inboxComponents } from '../contentComponents/inboxIndex';

export const funcEvent = () => {
	const linkItem = document.querySelector(
		'.sideBarContainer__list--item__link'
	);

	linkItem.addEventListener('click', () => {
		inboxComponents();
	});

	return linkItem;
};
