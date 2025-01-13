import { API_ENDPOINTS, courseTemplate } from './constants';
import type {
	GetListResponse,
	AuthResponse,
	UserResponse,
	AuthorResponse,
	CourseResponse,
	RemoveCourseResponse,
	User,
	Author,
	Course,
} from './types/interfaces';

const REACT_APP_URL = process.env.REACT_APP_URL;

export const auth = async (
	endpoint: string,
	data: User
): Promise<AuthResponse | undefined> => {
	try {
		const response: Response = await fetch(`${REACT_APP_URL}/${endpoint}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const authData: AuthResponse = await response.json();

		if (!response.ok || !authData.successful) {
			if (authData.errors) {
				throw new Error(`Error: ${authData.errors.join(';')}`);
			}

			if (authData.result) {
				throw new Error(`Error: ${authData.result}`);
			}

			throw new Error(`Fetch error. Reason: ${response.status}`);
		}
		return authData;
	} catch (error) {
		const { message } = error as Error;
		alert(message);

		return { successful: false, error };
	}
};

export const logoutUser = (userToken: string): void => {
	fetch(`${REACT_APP_URL}/${API_ENDPOINTS.LOGOUT}`, {
		method: 'DELETE',
		headers: {
			Authorization: userToken,
		},
	});
};

export const fetchUser = async (token: string): Promise<UserResponse> => {
	try {
		const response = await fetch(`${REACT_APP_URL}/${API_ENDPOINTS.USER}`, {
			headers: {
				Authorization: token,
			},
		});

		const result: UserResponse = await response.json();
		return result;
	} catch (error) {
		return { successful: false, error };
	}
};

export const getList = async <T>(
	listType: string
): Promise<T[] | undefined> => {
	try {
		const response: Response = await fetch(
			`${REACT_APP_URL}/${listType}/${API_ENDPOINTS.LIST}`
		);

		const result: GetListResponse<T> = await response.json();

		if (!response.ok || !result.successful) {
			throw new Error(
				`Fetch error. Reason: ${response.status},  ${result.error}`
			);
		}
		if (result.successful) {
			return result.result;
		}
	} catch (error) {
		return [];
	}
};

export const getCourse = async (id: string): Promise<CourseResponse> => {
	try {
		const response: Response = await fetch(
			`${REACT_APP_URL}/${API_ENDPOINTS.COURSE}/${id}`
		);
		const course = await response.json();

		if (!response.ok || !course.successful) {
			throw new Error(
				`Fetch error. Reason: ${response.status}, ${course?.result}`
			);
		}
		return course;
	} catch (error) {
		return {
			successful: false,
			result: courseTemplate,
		};
	}
};

export const createCourseRequest = async (
	course: Course,
	token: string
): Promise<CourseResponse> => {
	try {
		const response = await fetch(
			`${REACT_APP_URL}/${API_ENDPOINTS.ADD_COURSE}`,
			{
				method: 'POST',
				body: JSON.stringify(course),
				headers: { 'Content-Type': 'application/json', Authorization: token },
			}
		);
		if (!response.ok) {
			throw new Error(`Fetch error. Reason: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		return {
			successful: false,
			result: courseTemplate,
		};
	}
};

export const updateCourseRequest = async (
	course: Course,
	token: string,
	id: string
): Promise<CourseResponse> => {
	try {
		const response = await fetch(
			`${REACT_APP_URL}/${API_ENDPOINTS.UPDATE_COURSE}/${id}`,
			{
				method: 'PUT',
				body: JSON.stringify(course),
				headers: { 'Content-Type': 'application/json', Authorization: token },
			}
		);

		if (!response.ok) {
			throw new Error(`Fetch error. Reason: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		return {
			successful: false,
			result: courseTemplate,
		};
	}
};

export const removeCourseRequest = async (
	id: string,
	token: string
): Promise<RemoveCourseResponse> => {
	try {
		const response = await fetch(
			`${REACT_APP_URL}/${API_ENDPOINTS.DELETE_COURSE}/${id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: token,
				},
			}
		);
		if (!response.ok) {
			throw new Error(`Fetch error. Reason: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		return { successful: false };
	}
};

export const addAuthorRequest = async (
	author: Author,
	token: string
): Promise<AuthorResponse> => {
	try {
		const response = await fetch(
			`${REACT_APP_URL}/${API_ENDPOINTS.ADD_AUTHOR}`,
			{
				method: 'POST',
				body: JSON.stringify(author),
				headers: { 'Content-Type': 'application/json', Authorization: token },
			}
		);

		if (!response.ok) {
			throw new Error(`Fetch error. Reason: ${response.status}`);
		}
		const result = await response.json();

		return result;
	} catch (error) {
		return { successful: false, result: { name: '', id: '' } };
	}
};
