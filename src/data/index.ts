import CaramelImg from '../assets/img/caramel.png';
import HazelnutImg from '../assets/img/hazelnut.jpeg';
import NoImg from '../assets/img/no_image.png';

export interface IChocolate {
	name: string;
	prefix: string;
	value: number;
	img: string;
}

export interface ICoin {
	label: string;
	value: number;
}

export const chocolates: IChocolate[] = [
	{
		img: CaramelImg,
		name: 'Caramel',
		prefix: '$',
		value: 2.5,
	},
	{
		img: HazelnutImg,
		name: 'Hazelnut',
		prefix: '$',
		value: 3.1,
	},
	{
		img: NoImg,
		name: 'Organic Raw',
		prefix: '$',
		value: 2.0,
	},
];

export const coins: ICoin[] = [
	{
		label: '10c',
		value: 0.1,
	},
	{
		label: '20c',
		value: 0.2,
	},
	{
		label: '50c',
		value: 0.5,
	},
	{
		label: '$1',
		value: 1,
	},
	{
		label: '$2',
		value: 2,
	},
];
