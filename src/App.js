import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class MyErrorBoundary extends Component {
	state = { hasError: false, error: null, info: null }

	componentDidCatch(error, info) {
		this.setState({ hasError: true, error, info })
	}

	render() {
		if (this.state.hasError) {
			return (
				<p style={{ color: 'red', fontSize: '1.8rem', fontWeight: '700' }}>
					Erm, something went wrong...
				</p>
			)
		}
		return this.props.children
	}
}

const Profile = ({ profile }) => (
	<section>
		<header>
			<h1>{profile.name === '' ? 'Choose your name' : profile.name}</h1>
		</header>
		<p>Rest of your amazing bio goes here...</p>
	</section>
)

class App extends Component {
	state = {
		profile: {
			name: ''
		}
	}

	handleChange = evt => {
		evt.persist()
		const profile = { name: evt.target.value }
		this.setState(state => ({ ...state, profile }))
	}

	breakProfile = () => this.setState(state => ({ profile: null }))

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<MyErrorBoundary>
					<input
						type="text"
						onChange={this.handleChange}
						value={this.state.profile ? this.state.profile.name : ''}
					/>
					<button onClick={this.breakProfile}>Change name to null!</button>
					<Profile profile={this.state.profile} />
				</MyErrorBoundary>
			</div>
		)
	}
}

export default App
