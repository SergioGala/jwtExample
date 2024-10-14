const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null
		},
		actions: {
			signup: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});
					if (!resp.ok) throw Error("There was a problem in the signup request");
					return true;
				} catch (error) {
					console.error("There was an error signing up", error);
					return false;
				}
			},
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});
					if (!resp.ok) throw Error("There was a problem in the login request");
					const data = await resp.json();
					setStore({ token: data.access_token, user: email });
					return true;
				} catch (error) {
					console.error("There was an error logging in", error);
					return false;
				}
			},
			logout: () => {
				setStore({ token: null, user: null });
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			}
		}
	};
};

export default getState;