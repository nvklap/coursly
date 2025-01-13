import { fetchUser } from '../services';

export const loader = async () => {
	const token = localStorage.getItem('userToken');

	if (token) {
		const userData = await fetchUser(token);

		if (!userData.successful) {
			throw new Error('Can not fetch data');
		}

		return userData;
	}
	return null;
};
