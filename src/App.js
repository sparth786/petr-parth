import React, { Component } from 'react';
import { Button, Table, FormGroup, ControlLabel, Col, Form, FormControl } from 'react-bootstrap';

import { makeRequest } from './helpers/fetchHelper';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formBankAccount: {
				sortCode: []
			}
		};
	}

	componentDidMount() {
		this.getBankAccounts();
	}

	getBankAccounts = () => {
		makeRequest({ url: 'bankdetails' })
			.then(res => {
				if (res.items) this.setState({ bankAccounts: res.items });
			});
	};

	handleChange = (event) => {
		const { formBankAccount } = this.state;
		const { name, value, alt } = event.target;
		if (name === 'sortCode') {
			formBankAccount[name][alt] = value && value.substring(0, 2);
		} else {
			formBankAccount[name] = value;
		}
		this.setState({ formBankAccount });
	};

	handleEdit = (bankAccount) => {
		const formBankAccount = {
			...bankAccount,
			sortCode: (typeof bankAccount.sortCode === 'string' && bankAccount.sortCode.split('-')) || bankAccount.sortCode
		};
		this.setState({ formBankAccount });
	};

	handleSave = () => {
		const { formBankAccount } = this.state;
		let method;
		if (formBankAccount._id) {
			method = 'PUT';
			delete formBankAccount.userId;
		} else {
			method = 'POST';
		}

		if (Array.isArray(formBankAccount.sortCode)) {
			formBankAccount.sortCode = formBankAccount.sortCode.join('-');
		}
		makeRequest({ url: 'bankdetails', data: formBankAccount, method })
			.then(() => {
				this.setState({ formBankAccount: { sortCode: [] } });
				this.getBankAccounts();
			});
	};

	render() {
		const { bankAccounts, formBankAccount } = this.state;

		if (!bankAccounts) return (<div>Loading...</div>);
		return (
			<div className="App">
				<Table striped bordered condensed hover>
					<thead>
					<tr>
						<th>Name</th>
						<th>Account</th>
						<th>IBAN</th>
						<th>Sort Code</th>
						<th>SWIFT</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{bankAccounts.map((bankAccount) => <tr key={bankAccount.iban}>
						<td>{bankAccount.name}</td>
						<td>{bankAccount.account}</td>
						<td>{bankAccount.iban}</td>
						<td>{bankAccount.sortCode}</td>
						<td>{bankAccount.swift}</td>
						<td><Button onClick={() => this.handleEdit(bankAccount)}>Edit</Button></td>
					</tr>)}
					</tbody>
				</Table>

				<br />
				<br />

				<Form horizontal>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Name
						</Col>
						<Col sm={10}>
							<FormControl
								type="text"
								name="name"
								value={formBankAccount.name || ''}
								placeholder="Enter Name"
								onChange={this.handleChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Account
						</Col>
						<Col sm={10}>
							<FormControl
								type="text"
								name="account"
								value={formBankAccount.account || ''}
								placeholder="Enter Account No."
								onChange={this.handleChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							IBAN
						</Col>
						<Col sm={10}>
							<FormControl
								type="text"
								name="iban"
								value={formBankAccount.iban || ''}
								placeholder="Enter IBAN No."
								onChange={this.handleChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Sort Code
						</Col>
						<Col sm={10}>
							<Col sm={4}>
								<FormControl
									type="number"
									name="sortCode"
									maxLength={2}
									alt={0}
									value={formBankAccount.sortCode[0] || ''}
									onChange={this.handleChange}
								/>
							</Col>
							<Col sm={4}>
								<FormControl
									type="number"
									name="sortCode"
									maxLength={2}
									alt={1}
									value={formBankAccount.sortCode[1] || ''}
									onChange={this.handleChange}
								/>
							</Col>
							<Col sm={4}>
								<FormControl
									type="number"
									name="sortCode"
									maxLength={2}
									alt={2}
									value={formBankAccount.sortCode[2] || ''}
									onChange={this.handleChange}
								/>
							</Col>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							SWIFT
						</Col>
						<Col sm={10}>
							<FormControl
								type="text"
								name="swift"
								value={formBankAccount.swift || ''}
								placeholder="Swift"
								onChange={this.handleChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button onClick={this.handleSave}>Save</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default App;
