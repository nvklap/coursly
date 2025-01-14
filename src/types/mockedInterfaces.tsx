export interface StoreMocked {
	getState: () => {
		user: { isLoading: boolean; isAuth: boolean; name: string; role?: string };
		courses: {
			isLoading: boolean;
			coursesList: {
				id: string;
				title: string;
				description: string;
				creationDate: string;
				duration: number;
				authors: string[];
			}[];
		};
		authors: {
			isLoading: boolean;
			authorsList: {
				id: string;
				name: string;
			}[];
		};
	};
	subscribe: jest.Mock<any, any, any>;
	dispatch: jest.Mock<any, any, any>;
	replaceReducer: jest.Mock<any, any, any>;
	[Symbol.observable]: jest.Mock<any, any, any>;
}
