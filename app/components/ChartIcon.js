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

var ChartIcon = React.createClass({
	render: function() {
		var column = this.props.column;
		var index = column.index;
		var rec = column.record;

		if (!column.record) {
			return (
				<div key={'key' + index}>
					<div className="padding"></div>
					<svg width={ICON_SIZE} height={ICON_SIZE} title={title}>
						<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'white', fillOpacity:0.0}} />
					</svg>
					<p className="chart-labelx">{column.date}</p>
				</div>
			);
		}

		var title = 'Passed='.concat(rec.pass,' Failed=',rec.fail, ' Days Ago=', rec.daysFromDate);

		if (rec.trend === Helper.BETTER) {
			return (
				<div key={index} title={title}>
					<div className="padding"></div>
					<svg width={ICON_SIZE} height={ICON_SIZE}>
						<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'green', fillOpacity:0.5, rx:5, ry:5}} />
					</svg>
					<p className="chart-labelx">{column.date}</p>
				</div>
			)
		} else if (rec.trend === Helper.WORSE) {
			return (
				<div key={index} title={title}>
					<div className="padding"></div>
					<svg width={ICON_SIZE} height={ICON_SIZE}>
						<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'red', fillOpacity:0.8}} transform="rotate(45 25 25)" />
					</svg>
					<p className="chart-labelx">{column.date}</p>
				</div>
			)
		} else if (rec.trend === Helper.UNKNOWN) {
			return (
				<div key={index} title={title}>
					<div className="padding"></div>
					<svg width={ICON_SIZE} height={ICON_SIZE}>
						<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'orange', fillOpacity:0.5, rx:50, ry:50}} />
					</svg>
					<p className="chart-labelx">{column.date}</p>
				</div>
			)
		} else {
			return (
				<div key={index} title={title}>
					<div className="padding"></div>
					<svg width={ICON_SIZE} height={ICON_SIZE}>
						<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'black', fillOpacity:0.5, rx:5, ry:5}} />
					</svg>
					<p className="chart-labelx">{column.date}</p>
				</div>
			)
		}

	}
});

module.exports = ChartIcon;
