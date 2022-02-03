import React from 'react';
import styles from './Alert.module.css';
import statusStyles from '../../assets/css/__status.module.css';
import cx from 'classnames';
import { StatusTypes } from '../../types';
import { useClasses } from '../../helpers/hooks';

interface Props {
	message: JSX.Element | string;
	type: string;
	show?: boolean;

	[x: string]: any;
}

const Alert: React.FC<Props> = ({ type, message, show, ...rest }) => {
	const classes = useClasses<StatusTypes>({ [type]: !!type }, { ...styles, ...statusStyles });

	return (typeof show === 'undefined' && message) || (typeof show !== undefined && show) ? (
		<div className={cx(styles.alert, classes)} role='presentation' aria-label='message' {...rest}>
			{message}
		</div>
	) : (
		<></>
	);
};

export default Alert;
