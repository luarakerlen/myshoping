import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import { Container, Content, Progress, Transferred } from './styles';
import { Alert } from 'react-native';

export function Upload() {
	const [image, setImage] = useState('');
	const [bytesTransferred, setBytesTransferred] = useState('');
	const [progress, setProgress] = useState('0');

	async function handlePickImage() {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status == 'granted') {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [4, 4],
				quality: 1,
			});

			if (!result.cancelled) {
				setImage(result.uri);
			}
		}
	}

	async function handleUpload() {
		const fileName = new Date().getTime(); //estratégia para não ter nomes repetidos
		const reference = storage().ref(`/images/${fileName}.png`);

		const uploadTask = reference.putFile(image);

		uploadTask.on('state_changed', (taskSnapshot) => {
			const percent = (
				(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
				100
			).toFixed(0);

			setProgress(percent);
			setBytesTransferred(
				`${taskSnapshot.bytesTransferred} de ${taskSnapshot.totalBytes} bytes transferido(s)`
			);
		});

		uploadTask.then(async() => {
			const imageUrl = await reference.getDownloadURL(); //obter a url da imagem e salvar no banco pra listar as imagens
			Alert.alert('Sucesso!', 'Upload concluído com sucesso.');
		});
	}

	return (
		<Container>
			<Header title='Upload de fotos' />

			<Content>
				<Photo uri={image} onPress={handlePickImage} />

				<Button title='Fazer upload' onPress={handleUpload} />

				<Progress>{progress}%</Progress>

				<Transferred>{bytesTransferred}</Transferred>
			</Content>
		</Container>
	);
}
