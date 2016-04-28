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
var Helper = require('./Helper');

var ICON_SIZE = 50;

var ChartColumn = React.createClass({
 	render: function() {
    var submissionLink;
    if (this.props.column.record) {
      submissionLink = Helper.CERTIFICATION.concat('hardware/',this.props.column.record.canonical_id, '/submission/', this.props.column.record.submission_id, '/');
    }
		return (
			<div key={this.props.index} title={this.props.title}>
				<div className="padding"></div>
        <a href={submissionLink}>
  				<svg width={ICON_SIZE} height={ICON_SIZE}>
  					<rect width={ICON_SIZE} height={ICON_SIZE} style={this.props.style} transform={this.props.transform} />
  				</svg>
        </a>
				<p className="chart-labelx">{this.props.column.date}</p>
        {this.props.column.record ? <p><a href={this.props.column.record.pastebin}>Log</a></p> : ''}
			</div>
		);
	}
});

module.exports = ChartColumn;
