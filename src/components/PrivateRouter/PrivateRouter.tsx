import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import type { UserResponse } from '../../types/interfaces';

export const PrivateRouter: React.FC<{
	redirectPath: string;
	allowedRoles: string[];
	children?: React.ReactNode;
}> = ({ redirectPath, children, allowedRoles }) => {
	const data = useLoaderData() as UserResponse;
	const role = data?.result?.role;

	if (role && allowedRoles.includes(role)) {
		return children ? <>{children}</> : <Outlet />;
	}

	return <Navigate to={redirectPath} />;
};
