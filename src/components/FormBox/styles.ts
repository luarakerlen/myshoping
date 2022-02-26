import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const AllContent = styled.View`
	padding-left: 24px;
	padding-right: 24px;
	margin-top: 24px;
	margin-bottom: 4px;
`;

export const Container = styled.View`
	width: 100%;
	flex-direction: row;
`;

export const styles = StyleSheet.create({
	dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },

	dropdown1BtnStyle: {
		backgroundColor: '#FFF',
		borderRadius: 8,
		borderWidth: 2,
		width: '100%',
	},

	dropdown1BtnTxtStyle: { color: '#444', textAlign: 'center' },

	dropdown1RowStyle: {
		backgroundColor: '#EFEFEF',
		borderBottomColor: '#C5C5C5',
	},

	dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});
