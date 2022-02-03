import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { coins } from '../../data';
import Home from './Home';

describe('Vending Maching Payment', () => {
	const setup = (element: JSX.Element) => {
		render(element);
		const insertCoinBtn = screen.getByText('Insert Coin');
		const resetBtn = screen.getByText('Return Coins');

		const getMessage = () => screen.getByLabelText('message').textContent;
		const getChange = () => screen.getByLabelText('change').textContent;
		const getCredit = () => screen.getByRole('presentation', { name: /credit-amount/i }).textContent;

		const insertCoin = async (value: string) => {
			const input = screen.getByLabelText('coin');
			fireEvent.change(input, { target: { value } });
			userEvent.click(insertCoinBtn);
		};
		const expectedCredit = (value: number) => {
			const credit = getCredit() || '';
			expect(parseFloat(parseFloat(credit).toFixed(1))).toEqual(value);
		};
		const resetCredit = () => {
			userEvent.click(resetBtn);
		};

		const selectChocolate = (name: string) => {
			const chocolateBar = screen.getByText(name);
			userEvent.click(chocolateBar);
		};

		return { getChange, selectChocolate, expectedCredit, getCredit, insertCoin, resetCredit, getMessage };
	};

	describe('Show Invalid Currency', () => {
		const expectInvalidInput = (getMessage: () => any) => {
			const message = getMessage();
			expect(message).toBe('Invalid Currency');
		};

		test('input number only', () => {
			const { insertCoin, getMessage } = setup(<Home />);

			insertCoin('3');

			expectInvalidInput(getMessage);
		});

		test('input number w/ decimal', () => {
			const { insertCoin, getMessage } = setup(<Home />);
			insertCoin('3.2');
			expectInvalidInput(getMessage);
		});

		test('input number w/ $', () => {
			const { insertCoin, getMessage } = setup(<Home />);
			insertCoin('$3');
			expectInvalidInput(getMessage);
		});

		test('input number w/ $ + decimal', () => {
			const { insertCoin, getMessage } = setup(<Home />);
			insertCoin('$3.2');
			expectInvalidInput(getMessage);
		});

		test('input double valid denomination', () => {
			const { insertCoin, getMessage } = setup(<Home />);
			insertCoin('$2$2');
			expectInvalidInput(getMessage);
		});
	});

	describe('Accept valid denomination', () => {
		test('valid inserted denominations should increment credit', () => {
			const { insertCoin, getCredit, expectedCredit, resetCredit } = setup(<Home />);
			insertCoin('10c');
			expectedCredit(0.1);

			insertCoin('20c');
			expectedCredit(0.3);

			insertCoin('50c');
			expectedCredit(0.8);

			insertCoin('$1');
			expectedCredit(1.8);

			insertCoin('$2');
			expectedCredit(3.8);
		});
	});

	describe('Return inserted coin if credit exceeds highest item price', () => {
		const expectsReturnCoinMessage = (getMessage: () => void) => {
			const message = getMessage();
			expect(message).toBe('Use exact change (coin returned)');
		};

		test('$2 x 3', async () => {
			const { insertCoin, getMessage, expectedCredit } = setup(<Home />);
			insertCoin('$2');
			insertCoin('$2');
			insertCoin('$2');

			expectedCredit(4);
			expectsReturnCoinMessage(getMessage);
		});

		test('($2 x 1) + ($1 x 2) + (10c x 1)', async () => {
			const { insertCoin, getMessage, expectedCredit } = setup(<Home />);
			insertCoin('$2');
			insertCoin('$1');
			insertCoin('$1');
			insertCoin('10c');

			expectedCredit(4);
			expectsReturnCoinMessage(getMessage);
		});

		test('($2 x 1) + ($1 x 1) + (10c x 2)', async () => {
			const { insertCoin, getMessage, expectedCredit } = setup(<Home />);
			insertCoin('$2');
			insertCoin('$1');
			insertCoin('10c');
			insertCoin('10c');

			expectedCredit(3.1);
			expectsReturnCoinMessage(getMessage);
		});
	});

	// describe('Purchasing an item', () => {
	// 	describe('Return change after purchase (max credit)', () => {
	// 		const insertMaxCredit = (insertCoin: (value: string) => void, resetCredit: () => void) => {
	// 			resetCredit();
	// 			insertCoin('$2');
	// 			insertCoin('$2');
	// 		};

	// 		const expectsChangeMessage = (chocolate: string, getMessage: () => void, getChange: () => void) => {
	// 			const message = getMessage();
	// 			expect(message).toBe(`Successfully bought ${chocolate}`);
	// 		};

	// 		test('Buy Caramel', () => {
	// 			const CHOCOLATE_BAR = 'Caramel';
	// 			const { insertCoin, selectChocolate, resetCredit, getMessage, getChange } = setup(<Home />);
	// 			insertMaxCredit(insertCoin, resetCredit);

	// 			selectChocolate(CHOCOLATE_BAR);

	// 			expectsChangeMessage(CHOCOLATE_BAR, getMessage, getChange);
	// 		});
	// 	});
	// });
});
