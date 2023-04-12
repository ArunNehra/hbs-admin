import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/authSlice";

export { RouteGuard };
function RouteGuard(children: any) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);
	const authState = useSelector(selectAuthState);

	useEffect(() => {
		// on initial load - run auth check

		authCheck(router.asPath);
		console.log(authCheck(router.asPath));
		// on route change start - hide page content by setting authorized to false
		//const hideContent = () => setAuthorized(false);
		//router.events.on("routeChangeStart", hideContent);

		// on route change complete - run auth check
		//router.events.on("routeChangeComplete", authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			//router.events.off("routeChangeStart", hideContent);
			//router.events.off("routeChangeComplete", authCheck);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function authCheck(url: any) {
		// redirect to login page if accessing a private page and not logged in
		const publicPaths = ["/login"];
		const path = url.split("?")[0];
		console.log(authorized, authState, !publicPaths.includes(path));
		if (!authorized && !publicPaths.includes(path)) {
			//console.log("redirected");
			setAuthorized(false);
			router.push({
				pathname: "authentication/login",
				//query: { returnUrl: router.asPath },
			});
		} else {
			//console.log("Logged in");
			setAuthorized(true);
		}
	}

	return authorized && children;
}
