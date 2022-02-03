import React from 'react';
import cx from 'classnames';
import styles from './Input.module.css';

interface Props {
	onChange: (event: string) => void;
	center?: boolean;

	[x: string]: any;
}
const Input: React.FC<Props> = ({ center, onChange, ...rest }) => {
	const classes = {
		[styles.center]: center,
	};

	return <input className={cx(styles.textbox, classes)} onChange={(event) => onChange(event.target.value)} {...rest} />;
};

export default Input;
