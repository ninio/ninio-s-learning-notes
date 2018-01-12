import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import github from '../img/github-icon.svg';
import logo from '../img/logo.svg';

import network from '../img/network.svg';
import nodes from '../img/nodes.svg';
import phone from '../img/phone.svg';

import './all.sass';

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <figure className="image site-logo">
            <img src={nodes} alt="Server nodes" />
            <img src={network} alt="Network" />
            <img src={phone} alt="Phone" />
            <figcaption>Ninio's notes on technology</figcaption>
          </figure>
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/hey">
          About
        </Link>
      </div>
      <div className="navbar-end">
        <a className="navbar-item" href="https://github.com/ninio/" target="_blank" rel="noopener noreferrer">
          <span className="icon">
            <img src={github} alt="Github" />
          </span>
        </a>
      </div>
    </div>
  </nav>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <Navbar />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
