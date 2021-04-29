import React, { Component } from "react";
import "./navbar.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import fire from "./config";

class Navbar extends Component {
	state = {
		isLoggedIn: this.props.isLoggedIn,
		position: this.props.position,
		userName: ''
	};


	getUserData() {
		// user name
		const user = fire.auth().currentUser;
		if (user) {
			fire.firestore().collection('User').where('email', '==', user.email).get().then((snapshot) => {
				snapshot.forEach((doc) => {
					this.setState({
						...this.state, userName: doc.data().name
					})
					
				})
			})
			
		}
	}

	componentDidMount() {
		this.props.history.listen((location) => {
			document.querySelector("#nav-toggle").checked = false;
		});
	}
	logout = (e) => {
		e.preventDefault();
		//		var user = fire.auth().currentUser;
		//		console.log(user);
		fire.auth().signOut().then(() => {
			this.props.logout({ type: 'LOGOUT' })
			window.location.reload(false);
		}).catch((error) => {
			// An error happened.
			console.log(error.toString);
		});
	};
	render() {
		this.getUserData();
		return (
			<div className="navbar">
				<input id="nav-toggle" type="checkbox" />
				<img
					className="logo"
					src="https://i.ibb.co/Dg4r5Gt/logo.png"
					alt="LOGO"
				/>

				<ul className="nav-list">
					<NavLink exact to="/" className="item">Home</NavLink>
					<NavLink to="/Profile" className="item">Profile</NavLink>
					<NavLink to="/Map" className="item">Map</NavLink>
					{!this.props.isLoggedIn ? (
						<NavLink to="/SignIn" className="item">
							Sign In
						</NavLink>
					) : null}

					<NavLink to="/about" className="item">
						About
          </NavLink>
					{this.props.isLoggedIn ? (
						<div className="dropdown" id="List">
							<button className="item">{this.props.user}</button>
							{this.props.position === "ADMIN" ? (
								<div className="dropdown-content">
									<NavLink to="/Favorite" className="admin-item">Favorates</NavLink>
									<NavLink exact to="/AccountApproval" className="admin-item">Account Approval</NavLink>
									<NavLink to="/AddPlace" className="admin-item">Add fixed places</NavLink>
									<NavLink to="/AddNewAdmin" className="admin-item">Add new admin</NavLink>
									<NavLink onClick={this.logout} exact to="/" className="admin-item" > Log Out</NavLink>
								</div>
							) : (
								<div className="dropdown-content">
									<NavLink to="/Favorite" className="admin-item">Favorates</NavLink>
									<NavLink onClick={this.logout} exact to="/" className="admin-item">Log Out</NavLink>
								</div>
							)}
						</div>
					) : null}
				</ul>
				<label htmlFor="nav-toggle" className="icon-burger">
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
				</label>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		isLoggedIn: state.isLoggedIn,
		position: state.position,
		user: state.userName
	};
}
function mapDispatchToProps(dispatch) {
	return {
		logout: (item) => dispatch(item)
	};
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));