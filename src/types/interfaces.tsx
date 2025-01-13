export interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface Author {
	id: string;
	name: string;
}

export interface User {
	email: string;
	name?: string;
	password?: string;
	token?: string;
	role?: string;
}

export interface UserState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

export interface GetListResponse<T> {
	successful: boolean;
	result?: T[];
	error?: unknown;
}

export interface AuthResponse {
	successful: boolean;
	result?: string;
	user?: User;
	errors?: string[];
	error?: unknown;
}

export interface UserResponse {
	successful: boolean;
	result?: User;
	error?: unknown;
}

export interface CourseResponse {
	result: Course;
	successful: boolean;
}
export interface RemoveCourseResponse {
	successful: boolean;
	result?: string;
}
export interface AuthorResponse {
	result: Author;
	successful: boolean;
}
