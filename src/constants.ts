export const ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

export const courseTemplate = {
	id: '',
	title: '',
	description: '',
	creationDate: '',
	duration: 0,
	authors: [],
};

export const BUTTON_TEXT_LOGOUT = 'Logout';
export const BUTTON_TEXT_SHOW_COURSE = 'Show Course';
export const BUTTON_TEXT_ADD_COURSE = 'Add new course';
export const BUTTON_TEXT_CREATE_COURSE = 'Create Course';
export const BUTTON_TEXT_UPDATE_COURSE = 'Update Course';
export const BUTTON_TEXT_SEARCH = 'Search';
export const BUTTON_TEXT_CREATE_AUTHOR = 'Create author';
export const BUTTON_TEXT_ADD_AUTHOR = 'Add author';
export const BUTTON_TEXT_REMOVE_AUTHOR = 'Delete author';
export const BUTTON_TEXT_REGISTRATION = 'Registration';
export const BUTTON_TEXT_LOGIN = 'Login';
export const BUTTON_TEXT_LOGGIN_IN = 'Logging in...';
export const BUTTON_TEXT_CREATING_USER = 'Creating new account...';

export const PLACEHOLDER_TEXT_SEARCH = 'Enter course name...';
export const PLACEHOLDER_TEXT_TITLE = 'Enter title...';
export const PLACEHOLDER_TEXT_DESCRIPTION = 'Enter description...';
export const PLACEHOLDER_TEXT_AUTHOR = 'Enter author name...';
export const PLACEHOLDER_TEXT_DURATION = 'Enter duration in minutes...';
export const PLACEHOLDER_TEXT_NAME = 'Enter name';
export const PLACEHOLDER_TEXT_EMAIL = 'Enter email';
export const PLACEHOLDER_TEXT_PASSWORD = 'Enter password';

export const LABEL_TEXT_TITLE = 'Title';
export const LABEL_TEXT_DESCRIPTION = 'Description';
export const LABEL_TEXT_AUTHOR = 'Author name';
export const LABEL_TEXT_DURATION = 'Duration';
export const LABEL_TEXT_NAME = 'Name';
export const LABEL_TEXT_EMAIL = 'Email';
export const LABEL_TEXT_PASSWORD = 'Password';

export const API_ENDPOINTS = {
	LOGIN: 'login',
	LOGOUT: 'logout',
	REGISTRATION: 'register',
	LIST: 'all',
	USER: 'users/me',
	COURSE: 'courses',
	ADD_COURSE: 'courses/add',
	UPDATE_COURSE: 'courses',
	DELETE_COURSE: 'courses',
	AUTHORS: 'authors',
	ADD_AUTHOR: 'authors/add',
};
