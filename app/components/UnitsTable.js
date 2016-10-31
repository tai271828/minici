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

var UnitsTable = React.createClass({
 	render: function() {
    var units = this.props.units;
		var row_elements = [];
		var row_cells_title = [];
		row_cells_title.push(<td>NODE</td>);
		row_cells_title.push(<td>STATUS</td>);
		row_cells_title.push(<td>DATE</td>);
		row_elements.push(row_cells_title);

		for (var unit_key in units) {
			var unit = units[unit_key];
			var row_cells = [];
			row_cells.push(<td><a href={"#" + unit.canonicalId + "-" + unit.release + "-" + unit.formFactor}>{unit.canonicalId + " " + unit.release + " " + unit.formFactor}</a></td>)
			row_cells.push(<td>NA</td>)
			// TODO: assume the 1st record is the latest.
			row_cells.push(<td>{unit.records[0].date}</td>)
			row_elements.push(row_cells);
		}

		return (
      <table>
        {row_elements.map(function(row_cells){
          return (
            <tr>
              {row_cells}
            </tr>
          );
        })}
      </table>
		);
	}
});

module.exports = UnitsTable;
