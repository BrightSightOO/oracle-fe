enum RequestStatus {
	OPEN = 'Open',
	CLOSED = 'Closed',
	PROVIDED = 'Provided',
	DISPUTED = 'Disputed',
}

const now = new Date();

export const mockRequestData = {
	Open: [
		{
			id: '1',
			closingDate: now,
			status: RequestStatus.OPEN,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: null,
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
		{
			id: '2',
			closingDate: now,
			status: RequestStatus.OPEN,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: null,
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
		{
			id: '3',
			closingDate: now,
			status: RequestStatus.OPEN,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: null,
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
		{
			id: '4',
			closingDate: now,
			status: RequestStatus.OPEN,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: null,
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
		{
			id: '5',
			closingDate: now,
			status: RequestStatus.OPEN,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: null,
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
	],
	Closed: [
		{
			id: '6',
			closingDate: now,
			status: RequestStatus.CLOSED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: 'Yes',
			disputedVoted: 'Yes',
			resultFromVote: 'Yes',
			options: ['Yes', 'No'],
		},
		{
			id: '7',
			closingDate: now,
			status: RequestStatus.CLOSED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: 'Yes',
			disputedVoted: 'Yes',
			resultFromVote: 'Yes',
			options: ['Yes', 'No'],
		},
		{
			id: '8',
			closingDate: now,
			status: RequestStatus.CLOSED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: 'Yes',
			disputedVoted: 'Yes',
			resultFromVote: 'Yes',
			options: ['Yes', 'No'],
		},
	],
	Provided: [
		{
			id: '9',
			closingDate: now,
			status: RequestStatus.PROVIDED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
		{
			id: '10',
			closingDate: now,
			status: RequestStatus.PROVIDED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
		{
			id: '11',
			closingDate: now,
			status: RequestStatus.PROVIDED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
	],
	Disputed: [
		{
			id: '12',
			closingDate: now,
			status: RequestStatus.DISPUTED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
		{
			id: '13',
			closingDate: now,
			status: RequestStatus.DISPUTED,
			title:
				'Will Donald J. Trump win the U.S. 2024 Republican presidential nomination?',
			description:
				"This market will resolve to “Yes” if Donald J. Trump wins the 2024 nomination of the Republican Party for U.S. president. Otherwise, this market will resolve to “No”. (If no nominee has been confirmed by the end date/time of this market it will be marked 'invalid').Resolution source: https://www.gop.com as well as other official GOP sources.Any replacement of the nominee before election day will not change the resolution of the market.",
			bond: 750,
			reward: 10,
			disputeDate: now,
			answer: ['Yes'],
			disputed: null,
			disputedVoted: null,
			resultFromVote: null,
			options: ['Yes', 'No'],
		},
	],
};
