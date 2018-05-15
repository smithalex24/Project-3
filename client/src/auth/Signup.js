import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			zipcode: '',
			mentor: ''
		};
	}

	handleNameChange = (e) => {
		this.setState({ name: e.target.value });
	}
	
	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	}
	
	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	handleZipCodeChange = (e) => {
		this.setState({ zipcode: e.target.value });
  	}

	handleMentorChange = (event) => {
		if (event.currentTarget.value === 'true'){
		    this.setState({
		      mentor: true
		    })
			
		}
		else if (event.currentTarget.value === 'false') {
			this.setState({
				mentor: false
			})
		}
  	};


	handleSubmit = (e) => {
		e.preventDefault();
		console.log("form was submitted!", this.state);
		axios.post('http://localhost:3001/auth/signup', this.state)
		.then(result => {
			localStorage.setItem('mernToken', result.data.token);
			//Update the user 
			this.props.updateUser();
		})
		.catch(err => {
			console.log('ERROR', err);
		});
	}



	render() {
		if(this.props.user) {
			return (<Redirect to = "/profile" />);
		}
		return (
			<div>
				<h2 className = "signupheader">Sign up as a new user</h2>
				<form onSubmit = {this.handleSubmit}>
					<div>
						<input name = "Name" placeholder = "What is your name?" value = {this.state.name} onChange = {this.handleNameChange} />
					</div>
					<div>
						<input name = "Email" placeholder = "What is your email?" value = {this.state.email} onChange = {this.handleEmailChange} />
					</div>
					<div>
						<input name = "Password" placeholder = "Type a password" type = "password" value = {this.state.password} onChange = {this.handlePasswordChange} />
					</div>
					<div>
						<input name = "ZipCode" placeholder = "What's your zipcode?" value = {this.state.zipcode}
							onChange = {this.handleZipCodeChange} />
					</div>
					<div className="radio-row">
						<div className="input-row">
							<input id="Mentor" name = "Mentor" type= "radio" value = 'true' checked={this.state.mentor === true ? 'checked' : null}
							onChange = {this.handleMentorChange} />
							<label htmlFor="Mentor">Mentor</label>
						</div>
						<div className="input-row">
							<input id="Student" name = "Student" type= "radio" value = 'false' checked={this.state.mentor === false ? 'checked': null}
							onChange = {this.handleMentorChange}/>
							<label htmlFor="Student">Student</label>
						</div>
					</div>
					<br />

					<input type = "submit" value = "Sign Me Up!" className = "button" />
				</form>
			</div>
		);
	}
}

export default Signup;