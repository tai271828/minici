/*
 * Copyright (C) 2016-2017 Canonical Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
'use strict'
var React = require('react');

var App = React.createClass({

  render: function() {

    return (
      <div>
				<header className="banner global" role="banner">
				  <nav role="navigation" className="nav-primary">
				    <span id="main-navigation-link"><a href="#navigation">Jump to site nav</a></span>
				    <div className="logo">
				        <h1>Mini CI Loop</h1>
				    </div>
				  </nav>
				</header>

				<div className="wrapper">
					{this.props.children}
				</div>

      </div>
    )
  }
});

module.exports = App;
