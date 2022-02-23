import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
	const [products, setProducts] = useState<ProductProps[]>([]);

	useEffect(() => {
		firestore()
			.collection('products')
			.get()
			.then((response) => {
				const data = response.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				}) as ProductProps[];
				setProducts(data);
			})
			.catch((error) => console.error(error));
	}, []);

	// useEffect(() => {
	// 	firestore()
	// 		.collection('products')
	// 		.doc('fHka2JOFUuo32r3Rhmll')
	// 		.get()
	// 		.then((response) => console.log({ id: response.id, ...response.data() }));
	// }, []);

	return (
		<FlatList
			data={products}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <Product data={item} />}
			showsVerticalScrollIndicator={false}
			style={styles.list}
			contentContainerStyle={styles.content}
		/>
	);
}
