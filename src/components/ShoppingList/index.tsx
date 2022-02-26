import React, { useState, useEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';
import { Button } from '../Button';
import theme from '../../theme';

export function ShoppingList() {
	const [products, setProducts] = useState<ProductProps[]>([]);

	function handleClearList() {
		Alert.alert(
			'Limpar lista',
			'Tem certeza que deseja limpar a lista inteira?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Sim',
					onPress: () => {
						firestore()
							.collection('products')
							.get()
							.then((querySnapshot) => {
								querySnapshot.forEach((doc) => {
									firestore().collection('products').doc(doc.id).delete();
								});
							});
					},
				},
			]
		);
	}

	// *** RECUPERAR DADOS DE UMA COLEÇÃO *** //
	// useEffect(() => {
	// 	firestore()
	// 		.collection('products')
	// 		.get()
	// 		.then((response) => {
	// 			const data = response.docs.map((doc) => {
	// 				return {
	// 					id: doc.id,
	// 					...doc.data(),
	// 				};
	// 			}) as ProductProps[];
	// 			setProducts(data);
	// 		})
	// 		.catch((error) => console.error(error));
	// }, []);

	// *** RECUPERAR DADOS DE UM DOCUMENTO ESPECÍFICO *** //
	// useEffect(() => {
	// 	firestore()
	// 		.collection('products')
	// 		.doc('fHka2JOFUuo32r3Rhmll')
	// 		.get()
	// 		.then((response) => console.log({ id: response.id, ...response.data() }));
	// }, []);

	// *** RECUPERAR DADOS EM TEMPO REAL *** //
	useEffect(() => {
		const subscribe = firestore()
			.collection('products')
			.orderBy('description')
			.onSnapshot((querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				}) as ProductProps[];
				setProducts(data);
			});
		return () => subscribe();
	}, []);

	return (
		<>
			<FlatList
				data={products}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Product data={item} />}
				showsVerticalScrollIndicator={false}
				style={styles.list}
				contentContainerStyle={styles.content}
			/>
			<View style={styles.buttonContainer}>
				<Button
					title='Limpar lista'
					onPress={handleClearList}
					style={{
						backgroundColor: theme.COLORS.RED,
					}}
				/>
			</View>
		</>
	);
}
