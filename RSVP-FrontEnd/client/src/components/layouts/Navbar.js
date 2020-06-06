import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../comtext/authContext/authContext';
import GuestContext from '../../comtext/guestContext/guestContext';

const Navbar = ({ title, icon }) => {
	const { user, logout, isAuthencated, clearErrors } = useContext(AuthContext);
	const { clearGuests } = useContext(GuestContext);

	const onLogout = () => {
		logout();
		clearGuests();
		clearErrors();
	};
	const authLinks = (
		<Fragment>
			<li>Hello, {user && user.firstName}</li>
			<span className='sm-hide'>|</span>
			<li>
				<a href='#!' onClick={onLogout}>
					<span className='sm-hide'>Logout</span> <i className='fas fa-sign-out-alt' />
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<span className='sm-hide'>|</span>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar'>
			<div className='logo'>
				<h1>
					<i className={icon} /> {title}{' '}
				</h1>
				<p>
					Made with <span>❤</span> by Mu Idrees
				</p>
			</div>
			<ul>{isAuthencated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'Party RSVP',
	icon: 'fas fa-glass-cheers'
};

export default Navbar;
