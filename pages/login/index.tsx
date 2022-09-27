import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import {
	AuthSection,
	Login,
	ControlItem,
	ControlLabel,
	ControlInput,
	SubmitButtonWrapper,
	SubmitButton,
} from './index.style';

const LoginForm = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const router = useRouter();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (result?.ok) {
			console.log(`result: ${JSON.stringify(result)}`)
			router.push('/product/1');
		}
	};

	return (
		<AuthSection>
			<Login>Login</Login>
			<form onSubmit={handleSubmit}>
				<ControlItem>
					<ControlLabel htmlFor="email">Your Email</ControlLabel>
					<ControlInput
						type="email"
						id="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</ControlItem>
				<ControlItem>
					<ControlLabel htmlFor="password">Your Password</ControlLabel>
					<ControlInput
						type="password"
						id="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</ControlItem>
				<SubmitButtonWrapper>
					<SubmitButton type="submit">Login</SubmitButton>
				</SubmitButtonWrapper>
			</form>
		</AuthSection>
	);
};

export default LoginForm;