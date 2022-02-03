import React from 'react';
import styles from './Home.module.css';
import { PageContainer, Card, Button, Input, Alert } from '../../components';
import useHomeController, { IChange } from './HomeController';

interface IAlertChangeContent {
	change: IChange;
}

const AlertChangeContent: React.FC<IAlertChangeContent> = ({ change }) => {
	return (
		<>
			<b>Change: </b> <span>{change.amount}</span> <br />
			<b>Coins: </b> <span>{change.coinsReceived.map((e) => `${e.label} x ${e.qty}`).join(' , ')}</span>
		</>
	);
};

const Home: React.FC = () => {
	const { coinInserted, message, chocolates, credit, change, handleInputChange, handleInsertCoin, buyChocolate, handleResetCoin } = useHomeController();

	return (
		<PageContainer title='Vending Machine'>
			<div className={styles.itemsContainer}>
				{chocolates.map(({ img, name, value, prefix }) => (
					<Card key={name} img={img} title={name} subTitle={`${prefix}${value}`} disabled={!!!credit} onClick={() => buyChocolate(name)} />
				))}
			</div>

			<div className={styles.creditContainer}>
				<h4 className={styles.creditTitle}>Your Credit</h4>
				<span role='presentation' aria-label='credit-amount' className={styles.creditAmount}>
					{credit}
				</span>
			</div>

			<Alert message={message.content} type={message.type} arial-label='message' />
			<Alert message={<AlertChangeContent change={change} />} show={!!change.amount} type='success' />

			<div className={styles.controlsContainer}>
				<Input onChange={handleInputChange} value={coinInserted} aria-label='coin' center />

				<Button onClick={handleInsertCoin} label='Insert Coin' disabled={!!!coinInserted} primary />
				<Button onClick={handleResetCoin} label='Return Coins' ghost />
			</div>
		</PageContainer>
	);
};

export default Home;
