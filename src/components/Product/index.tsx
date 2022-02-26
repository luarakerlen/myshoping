import React from 'react';
import firestore from '@react-native-firebase/firestore';

import { ButtonIcon } from '../ButtonIcon';
import {
	Container,
	Info,
	Title,
	Quantity,
	Options,
	Categories,
	Category,
} from './styles';
import { categoriesColors } from '../../enums';

export type ProductProps = {
	id: string;
	description: string;
	quantity: number;
	done: boolean;
	categories?: Array<keyof typeof categoriesColors>;
};

type Props = {
	data: ProductProps;
};

export function Product({ data }: Props) {
	const categories: Array<keyof typeof categoriesColors> = data.categories || ['outros'];
	
	function handleDoneToggle() {
		firestore().collection('products').doc(data.id).update({
			done: !data.done,
		});
	}

	function handleDelete() {
		firestore().collection('products').doc(data.id).delete();
	}

	return (
		<Container>
			<Info>
				<Title done={data.done}>{data.description}</Title>

				<Quantity>Quantidade: {data.quantity}</Quantity>

				<Categories>
					{categories.map((category) => (
						<Category key={category} category={category}>
							{category}
						</Category>
					))}
				</Categories>
			</Info>

			<Options>
				<ButtonIcon
					icon={data.done ? 'undo' : 'check'}
					onPress={handleDoneToggle}
				/>

				<ButtonIcon icon='delete' color='alert' onPress={handleDelete} />
			</Options>
		</Container>
	);
}
