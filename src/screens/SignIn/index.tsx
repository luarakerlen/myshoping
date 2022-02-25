import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';
import theme from '../../theme';

export function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSignInAnonymously() {
		const { user } = await auth().signInAnonymously();
		console.log(user);
	}

	function handleCreateUserAccount() {
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => Alert.alert('Usuário criado com sucesso!'))
			.catch((error) => {
				switch (error.code) {
					case 'auth/email-already-in-use':
						Alert.alert('E-mail já está em uso!');
						break;
					case 'auth/invalid-email':
						Alert.alert('E-mail inválido!');
						break;
					case 'auth/weak-password':
						Alert.alert('A senha deve ter no mínimo 6 caracteres!');
						break;

					default:
						Alert.alert('Erro ao criar usuário!');
						break;
				}
			});
	}

	function handleSignInWithEmailAndPassword() {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				console.log(user);
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/invalid-email':
						Alert.alert('E-mail inválido!');
						break;
					case 'auth/user-not-found':
						Alert.alert('Usuário não encontrado!');
						break;
					case 'auth/wrong-password':
						Alert.alert('Senha incorreta!');
						break;

					default:
						Alert.alert('Erro ao logar!');
						break;
				}
			});
	}

	function handleForgotPassword() {
		auth()
			.sendPasswordResetEmail(email)
			.then(() =>
				Alert.alert(
					'Enviamos um link no seu e-mail para você redefinir a sua senha'
				)
			);
	}

	return (
		<Container>
			<Title>MyShopping</Title>
			<Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

			<Input
				placeholder='e-mail'
				keyboardType='email-address'
				autoCapitalize='none'
				onChangeText={setEmail}
			/>

			<Input placeholder='senha' secureTextEntry onChangeText={setPassword} />

			<Button title='Entrar' onPress={handleSignInWithEmailAndPassword} />
			<Button
				title='Entrar sem login'
				onPress={handleSignInAnonymously}
				style={{
					backgroundColor: theme.COLORS.GRAY800,
					marginTop: 10,
				}}
			/>

			<Account>
				<ButtonText title='Recuperar senha' onPress={handleForgotPassword} />
				<ButtonText
					title='Criar minha conta'
					onPress={handleCreateUserAccount}
				/>
			</Account>
		</Container>
	);
}
