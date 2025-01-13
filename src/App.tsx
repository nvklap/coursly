import { useEffect } from 'react';
import {
	Route,
	Navigate,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import { useAppDispatch } from './store';

import {
	Header,
	Courses,
	CourseForm,
	Registration,
	Login,
	CourseInfo,
	NotFound,
	PrivateRouter,
	ErrorBoundary,
} from './components';
import { getUserThunk } from './store/user/thunk';
import { useUser } from './store/selectors';
import { useSelector } from 'react-redux';
import { loader } from './helpers';
import { ROLES } from './constants';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const userToken = localStorage.getItem('userToken');
	const { isAuth } = useSelector(useUser);

	useEffect(() => {
		if (userToken) {
			dispatch(getUserThunk(userToken));
		}
	}, [dispatch, userToken]);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route
					path='/'
					element={isAuth ? <Navigate replace to={'/courses'} /> : <Login />}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route
					element={
						<PrivateRouter
							redirectPath='/login'
							allowedRoles={[ROLES.ADMIN, ROLES.USER]}
						/>
					}
					loader={loader}
					errorElement={<ErrorBoundary />}
				>
					<Route path='courses' element={<Courses />} />
					<Route path='courses/:courseId' element={<CourseInfo />} />
				</Route>
				<Route
					element={
						<PrivateRouter
							redirectPath='/courses'
							allowedRoles={[ROLES.ADMIN]}
						/>
					}
					loader={loader}
				>
					<Route path='/courses/add' element={<CourseForm />} />
					<Route path='/courses/update/:courseId' element={<CourseForm />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</>
		)
	);

	return (
		<>
			<Header />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
