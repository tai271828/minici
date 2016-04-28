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

var ICON_SIZE = 25;

var LegendSummary = React.createClass({
	render: function() {
		return (
			<div>
				<div className="one-col"></div>
				<div className="three-col last-col">
					<table>
						<thead>
							<tr>
								<th colSpan="2">Legend</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<svg width={ICON_SIZE} height={ICON_SIZE}>
										<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'green', fillOpacity:0.5, rx:2.5, ry:2.5}} />
									</svg>
								</td>
								<td>Better than previous</td>
							</tr>
							<tr>
								<td>
									<svg width={ICON_SIZE} height={ICON_SIZE}>
										<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'red', fillOpacity:0.8}} transform="rotate(45 12.5 12.5)" />
									</svg>
								</td>
								<td>Worse than previous</td>
							</tr>
							<tr>
								<td>
									<svg width={ICON_SIZE} height={ICON_SIZE}>
										<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'orange', fillOpacity:0.5, rx:12.5, ry:12.5}} />
									</svg>
								</td>
								<td>Unknown</td>
							</tr>
							<tr>
								<td>
									<svg width={ICON_SIZE} height={ICON_SIZE}>
										<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'black', fillOpacity:0.5, rx:2.5, ry:2.5}} />
									</svg>
								</td>
								<td>Unchanged from previous</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
});

module.exports = LegendSummary;
