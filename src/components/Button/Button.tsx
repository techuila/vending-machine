import React from 'react';
import cx from 'classnames';
import styles from './Button.module.css';
import statusStyles from '../../assets/css/__status.module.css';
import { StatusTypes } from '../../types';
import { useClasses } from '../../helpers/hooks';

interface BooleanProps {
	ghost?: boolean;
	disabled?: boolean;
}

type Props = {
	label: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	children?: JSX.Element | null;
} & BooleanProps;

const Button: React.FC<Props & StatusTypes> = ({ label, success, error, warning, primary, ghost, onClick, children, disabled }) => {
	const classes = useClasses<StatusTypes & BooleanProps>({ success, error, warning, primary, ghost, disabled }, { ...styles, ...statusStyles });

	return (
		<button onClick={onClick} className={cx(styles.btn, classes)} disabled={disabled}>
			{label}
			{children}
		</button>
	);
};

export default Button;
