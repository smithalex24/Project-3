import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			zipcode: '',
			results: [
			{
				name: '',
				email: '',
				zipcode: ''
			}
			],
			user: this.props.user
		};
	}

handleZipChange = (e) => {
		this.setState({ zipcode: e.target.value });
	}

handleSearch = (e) => {
	e.preventDefault();
	console.log("Zip was submitted!", this.state);
	axios.post('http://localhost:3001/getusersnearby', {zipcode: this.state.zipcode})
	.then(res => {
		const results = res.data;
		console.log('this is res data: ', res.data)
		this.setState({
			results : res.data
		})

		
	})
	.catch(err => {
		console.log('ERROR', err);
	});
}
saveContacts = (e) => {
	e.preventDefault();
	console.log(e.target);
	console.log(this.state);
	axios.post(`http://localhost:3001/profile/${this.state.user.id}`, {Mentor: e.target.getAttribute('data-mentor'), Contact: e.target.getAttribute('data-email'), Location: e.target.getAttribute('data-location')})
}

	render() {
		const results = this.state.results.map(person => {
			if(person && person.name){
				return (
					<div className = "contact" key={person.id}>
						<p>Mentor: {person.name}</p>
						<p>Contact: {person.email}</p>
						<p>Location: {person.zipcode}</p>
						<div>
							<input onClick = {this.saveContacts} type = "submit" value = "Connect" className = "button" data-mentor = {person.name} data-email = {person.email} data-location = {person.zipcode} />
						</div>
						<hr />
					</div>
				);
			}
		});

		return (
			<div>
				<form onSubmit = {this.handleSearch}>
					<div>
						<input name = "Zipcode" placeholder = "What is your Zipcode?" value = {this.state.zipcode} onChange = {this.handleZipChange} />
					</div>
					<button onClick = "search">Search Mentors</button>
				</form>
				<hr />
				<div>
					{results}
				</div>
			</div>
	
	
		);


	}
}

export default Search;
