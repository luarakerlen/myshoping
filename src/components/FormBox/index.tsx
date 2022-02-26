import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { Container, AllContent, styles } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';
import SelectDropdown from 'react-native-select-dropdown';
import { categoriesColors } from '../../enums';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

export function FormBox() {
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [category, setCategory] = useState<
		Array<keyof typeof categoriesColors>
	>(['outros']);

	const categories: string[] = Object.entries(categoriesColors)
		.map(([key]) => key)
		.sort();

	async function handleProductAdd() {
		firestore()
			.collection('products')
			.add({
				description,
				quantity,
				done: false,
				createdAt: firestore.FieldValue.serverTimestamp(),
				categories: category,
			})
			.then(() => {
				setDescription('');
				setQuantity(0);
				setCategory(['outros']);
			})
			.catch((error) => console.error(error));
	}

	return (
		<AllContent>
			<Container>
				<Input
					placeholder='Nome do produto'
					size='medium'
					onChangeText={setDescription}
					value={description}
				/>

				<Input
					placeholder='0'
					keyboardType='numeric'
					size='small'
					style={{ marginHorizontal: 8 }}
					onChangeText={(value) => setQuantity(Number(value))}
					value={quantity ? String(quantity) : ''}
				/>

				<ButtonIcon
					size='large'
					icon='add-shopping-cart'
					onPress={handleProductAdd}
				/>
			</Container>
			<SelectDropdown
				data={categories}
				onSelect={(value) => setCategory([value])}
				buttonTextAfterSelection={(selectedItem) => {
					return selectedItem;
				}}
				rowTextForSelection={(item) => {
					return item;
				}}
				defaultButtonText='Selecione a categoria'
				dropdownIconPosition={'right'}
				renderDropdownIcon={(isOpened) => {
					return (
						<FontAwesome
							name={isOpened ? 'chevron-up' : 'chevron-down'}
							color={categoriesColors[category[0]]}
							size={18}
						/>
					);
				}}
				dropdownStyle={styles.dropdown1DropdownStyle}
				rowStyle={styles.dropdown1RowStyle}
				rowTextStyle={styles.dropdown1RowTxtStyle}
				buttonStyle={[
					styles.dropdown1BtnStyle,
					{ borderColor: categoriesColors[category[0]] },
				]}
				buttonTextStyle={styles.dropdown1BtnTxtStyle}
			/>
		</AllContent>
	);
}
