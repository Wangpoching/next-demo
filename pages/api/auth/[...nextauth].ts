import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const res = await fetch('http://localhost:8000/auth/login', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const user = await res.json();

				if (res.ok && user) {
					return user; // 回傳通過驗證的物件
				}
				return null; // 沒有通過驗證
			},
		}),
	],
	callbacks: {
		jwt: async ({token, user}) => {
			if (user) {
				token.accessToken = user.access_token;
			}
			return token;
		},
		session: async ({session, token}) => {
			session.accessToken = token.accessToken;
			return session;
		},
	},
	pages: {
		signIn: '/login', //Need to define custom login page (if using)
	},
});