import React from 'react';
import styled from 'styled-components';
import SignupComponent from '../component/SignupComponent';

interface Props {}

const SignupPage: React.FC<Props> = () => {
	return (
		<SignupPageBackground>
			<SignupComponent />
		</SignupPageBackground>
	);
};

const SignupPageBackground = styled.div`
	width: 100%;
	height: 100vh;
	background-color: ${(props) => props.theme.color.PrimaryBG};
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default SignupPage;
