import React from 'react';
import cx from 'classnames';
import styles from './Card.module.css';
import { useClasses } from '../../helpers/hooks';

interface BooleanProps {
	disabled?: boolean;
}

type Props = {
	img?: string;
	title?: string;
	subTitle?: string;
	content?: string;
	children?: JSX.Element | null;
	onClick?: () => void;
} & BooleanProps;

const Card: React.FC<Props> = ({ img, title, subTitle, content, disabled, onClick, children }) => {
	const classes = useClasses<BooleanProps>({ disabled }, styles);

	return (
		<div className={cx(styles.card, classes)} onClick={onClick}>
			<img src={img} alt='img' className={styles.img} />

			<div>
				<span className={styles.title}>{title}</span> - <span className={styles.subTitle}>{subTitle}</span>
			</div>
			<p className={styles.content}>{content}</p>
			{children}
		</div>
	);
};

export default Card;
