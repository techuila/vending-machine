import React, { useState, useEffect } from 'react';
import { chocolates, coins, coins as validCoins, ICoin } from '../../data';

type ICoinsOnHand = {
	qty: number;
} & ICoin;

export interface IChange {
	amount: number;
	coinsReceived: ICoinsOnHand[];
}

const initialMessage = {
	type: 'success',
	content: '',
};

const initialChange = {
	amount: 0,
	coinsReceived: [],
};

const HomeController = () => {
	const [credit, setCredit] = useState(0);
	const [change, setChange] = useState(initialChange);
	const [coinInserted, setCoinInserted] = useState('');
	const [message, setMessage] = useState(initialMessage);

	const buyChocolate = (name: string) => {
		const chocolate = chocolates.find((_choco) => _choco.name === name) || { name: '', value: 0 };
		if (isCreditSufficient(credit, chocolate.value)) {
			setCredit(0);
			setMessage({
				content: `Successfully bought ${chocolate.name}`,
				type: 'success',
			});
			console.log(getChange(credit, chocolate.value));
			setChange(getChange(credit, chocolate.value));

			setTimeout(() => {
				setMessage(initialMessage);
				setChange(initialChange);
			}, 10000);
		} else {
			setMessage({
				content: 'Insufficient Credits',
				type: 'error',
			});
		}
	};

	const handleInputChange = (value: string) => {
		setCoinInserted(value);
	};

	const handleInsertCoin = () => {
		if (validateCoin(coinInserted)) {
			const coinValue = convertToNumber(coinInserted);
			if (checkIfExceeding(credit)) {
				setMessage({ content: 'Use exact change (coin returned)', type: 'warning' });
			} else {
				setCredit((value) => value + coinValue);
				setMessage(initialMessage);
			}
		} else {
			setMessage({ content: 'Invalid Currency', type: 'error' });
		}

		setCoinInserted('');
	};

	const handleResetCoin = () => {
		setCredit(0);
		setCoinInserted('');
	};

	return { chocolates, credit, change, coinInserted, handleInputChange, handleInsertCoin, handleResetCoin, buyChocolate, message };
};

function getChange(credit: number, price: number) {
	const change = roundOff(credit - price);
	const _coins = coins.sort((a, b) => b.value - a.value);
	const coinsReceived = getCoins(change, _coins[0]);

	function getCoins(_remaining: number, coin: ICoin, coinsOnHand: ICoinsOnHand[] = []): any {
		const index = _coins.findIndex((_coin) => _coin.label === coin.label);

		if (_remaining !== 0 && _remaining >= coin.value) {
			const qty = coinsOnHand.find((_c: ICoinsOnHand) => _c.label === coin.label)?.qty || 0;
			const _coin = { ...coin, qty: qty + 1 };
			return getCoins(roundOff(_remaining - coin.value), coin, coinsOnHand.concat(_coin));
		} else if (_remaining !== 0) {
			return getCoins(_remaining, _coins[index + 1], coinsOnHand);
		} else {
			return coinsOnHand;
		}
	}
	return { amount: change, coinsReceived };
}

function convertToNumber(value: string): number {
	return validCoins.find((_validCoin) => _validCoin.label === value)?.value || 0;
}

function validateCoin(value: string): boolean {
	return validCoins.some((_validCoin) => _validCoin.label === value);
}

function checkIfExceeding(credit: number) {
	const highestPrice = Math.max(...chocolates.map((chocolate) => chocolate.value));

	return credit >= highestPrice;
}

function isCreditSufficient(credit: number, price: number) {
	return credit - price >= 0;
}

function roundOff(value: any) {
	return parseFloat(parseFloat(value).toFixed(1));
}

export default HomeController;
