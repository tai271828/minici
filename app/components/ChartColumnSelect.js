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
var ChartColumn = require('./ChartColumn');
var Helper = require('./Helper');


var ICON_SIZE = 50;

var ChartColumnSelect = React.createClass({
	render: function() {
		var column = this.props.column;
		var index = column.index;
		var rec = column.record;

		if (!column.record) {
			return (
				<ChartColumn column={column} style={{fill:'white', fillOpacity:0.0}} title={title} />
			);
		}

		var title = 'Passed='.concat(rec.pass,' Failed=',rec.fail, ' Days Ago=', rec.daysFromDate);

		if (rec.trend === Helper.BETTER) {
			return (
				<ChartColumn column={column} style={{fill:'green', fillOpacity:0.5, rx:5, ry:5}} title={title} />
			)
		} else if (rec.trend === Helper.WORSE) {
			return (
				<ChartColumn column={column} style={{fill:'red', fillOpacity:0.8}} title={title} transform="rotate(45 25 25)" />
			)
		} else if (rec.trend === Helper.UNKNOWN) {
			return (
				<ChartColumn column={column} style={{fill:'orange', fillOpacity:0.5, rx:50, ry:50}} title={title} />
			)
		} else {
			return (
				<ChartColumn column={column} style={{fill:'black', fillOpacity:0.5, rx:5, ry:5}} title={title} />
			)
		}

	}
});

module.exports = ChartColumnSelect;
