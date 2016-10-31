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
var moment = require('moment');
var LegendSummary = require('./LegendSummary');
var ChartColumnSelect = require('./ChartColumnSelect');
var Helper = require('./Helper');


var MAX_SIZE = 100;
var NUMBER_OF_DAYS = 7;


var Index = React.createClass({
	getInitialState: function() {
		return {records: this.props.records || RESULTS.records || [], toDate: moment(), units: {}};
	},

	getRecordsByCID: function() {
		var records = this.state.records;
		var units = {};

		for (var i=0; i<records.length - 1; i++) {
			var unit = {
				records: [],
				toDate: moment(),
				formFactor: "",
				canonicalId: "",
				release: ""
			}
			var cid = records[i].canonical_id;
			var formfactor = records[i].formfactor;
			var release = records[i].release;
			var unit_key = cid + '-' + formfactor + '-' + release;
			if (!units[unit_key]) {
				units[unit_key] = unit
			}
			units[unit_key].records.push(records[i])
			units[unit_key].formFactor = formfactor;
			units[unit_key].canonicalId = cid;
			units[unit_key].release = release;
		}

		this.props.units = units;

	},

	componentDidMount: function() {
		this.state.units = this.props.units;
		for (var unit_key in this.state.units) {
			this.analyseTrends(unit_key);
		}
	},

	analyseTrends: function(unit_key) {
		var units = this.props.units;
		var unit = units[unit_key];
		var records = units[unit_key].records;
		var analysed = [];

		var toDate;
		var formFactor;
		var canonicalId;
		var release;
		if (records.length > 0) {
			toDate = moment(records[0].date);
			formFactor = records[0].formfactor;
			canonicalId = records[0].canonical_id;
			release = records[0].release;
		}

		for (var i=0; i<records.length - 1; i++) {
			var current = records[i];
			var previous = records[i+1];
			var currentScore = current.passed - current.failed;
			var previousScore = previous.passed - previous.failed;

			// Set the trend by comparing with the previous submission
			if (currentScore > previousScore) {
				current.trend = Helper.BETTER;
			} else if (previousScore > currentScore) {
				current.trend = Helper.WORSE;
			} else {
				// Scores are the same, so check that pass/fail numbers are the same
				if ((current.passed === previous.passed) && (current.failed === previous.failed)) {
					current.trend = Helper.UNCHANGED;
				} else {
					current.trend = Helper.UNKNOWN;
				}
			}

			// Calculate the number of days from the start date
			current.daysFromDate = toDate.diff(current.date, 'days')

			analysed.push(current);
		}
		// We're ignoring the last record as we don't know the trend for that
		analysed.reverse();

		unit.records = analysed;
		unit.toDate = records[0].date;
		unit.fromFactor = formFactor;
		unit.canonicalId = canonicalId;
		unit.release = release;
		units[unit_key] = unit
		this.setState({units: units});
	},

	// Reorganise the submissions into the dates they occur
	pivotOnDate: function() {
		var self = this;
		var columns = [];
		for (var i=0; i<7; i++) {
			var dayNumber = NUMBER_OF_DAYS - 1 - i;
			var dateDisplay = moment(this.state.toDate).subtract(dayNumber, 'days');
			var rec = {
				index: i,
				date: dateDisplay.format('DD MMM'),
			};
			self.state.records.map(function(r) {
				if (dayNumber === r.daysFromDate) {
					rec.record = r;
				}
			});

			columns.push(rec)
		};
		return columns;
	},

  render: function() {
		var self = this;

		this.getRecordsByCID();
		//var columns_group = {};
		//var columns;
		//for (var unit_key in this.props.units) {
			//columns_group[unit_key] = this.pivotOnDate(this.props.units.records);
			// TODO: for refactring test, rm ME
			//columns = columns_group[unit_key];
		//}

		// summary table
		var row_elements = [];
		var row_cells_title = [];
		row_cells_title.push(<td>NODE</td>);
		row_cells_title.push(<td>STATUS</td>);
		row_cells_title.push(<td>DATE</td>);
		row_elements.push(row_cells_title);
		for (var unit_key in this.props.units) {
			var unit = this.props.units[unit_key];
			var row_cells = [];
			row_cells.push(<td><a href={"#" + unit.canonicalId + "-" + unit.release + "-" + unit.formFactor}>{unit.canonicalId + " " + unit.release + " " + unit.formFactor}</a></td>)
			row_cells.push(<td>NA</td>)
			// TODO: assume the 1st record is the latest.
			row_cells.push(<td>{unit.records[0].date}</td>)
			row_elements.push(row_cells);
		}

		// details for each test unit

    return (
        <div className="inner-wrapper">

          <section className="row no-border">
            <h2>Dashboard</h2>
						<table>
							{row_elements.map(function(row_cells) {
								return (
									<tr>
										{row_cells}
									</tr>
								);
							})}
						</table>
          </section>

        </div>
    );
  }
});

module.exports = Index;
