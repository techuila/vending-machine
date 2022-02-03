import React from 'react';
import styles from './PageContainer.module.css';

interface Props {
	title: string;
	children: JSX.Element | JSX.Element[] | null;

	nav?: JSX.Element;
}

const PageContainer: React.FC<Props> = ({ title, children }) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{title}</h2>

			<div>{children}</div>
		</div>
	);
};

export default PageContainer;
