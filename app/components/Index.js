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


var MAX_SIZE = 100;
var ICON_SIZE = 50;
var NUMBER_OF_DAYS = 7;

var BETTER = 'Better';
var WORSE = 'Worse';
var UNKNOWN = 'Unknown';
var UNCHANGED = 'Stable';

var Index = React.createClass({
	getInitialState: function() {
		return {records: [], toDate: moment()};
	},

	componentDidMount: function() {
		this.analyseTrends();
	},

	analyseTrends: function() {
		var records = RESULTS.records || [];
		var analysed = [];

		var toDate;
		var formFactor;
		var canonicalId;
		if (records.length > 0) {
			toDate = moment(records[0].date);
			formFactor = records[0].formfactor;
			canonicalId = records[0].canonical_id;
		}

		for (var i=0; i<records.length - 1; i++) {
			var current = records[i];
			var previous = records[i+1];
			var currentScore = current.pass - current.fail;
			var previousScore = previous.pass - previous.fail;

			// Set the trend by comparing with the previous submission
			if (currentScore > previousScore) {
				current.trend = BETTER;
			} else if (previousScore > currentScore) {
				current.trend = WORSE;
			} else {
				// Scores are the same, so check that pass/fail numbers are the same
				if ((current.pass === previous.pass) && (current.fail === previous.fail)) {
					current.trend = UNCHANGED;
				} else {
					current.trend = UNKNOWN;
				}
			}

			// Calculate the number of days from the start date
			current.daysFromDate = toDate.diff(current.date, 'days')

			analysed.push(current);
		}
		// We're ignoring the last record as we don't know the trend for that
		analysed.reverse();
		this.setState({records: analysed, toDate: records[0].date, formFactor: formFactor, canonicalId: canonicalId});
	},

	renderIconColumn: function(column) {
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

		if (rec.trend === BETTER) {
			return (
				<div key={index} title={title}>
					<div className="padding"></div>
					<svg width={ICON_SIZE} height={ICON_SIZE}>
						<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'green', fillOpacity:0.5, rx:5, ry:5}} />
					</svg>
					<p className="chart-labelx">{column.date}</p>
				</div>
			)
		} else if (rec.trend === WORSE) {
			return (
				<div key={index} title={title}>
					<div className="padding"></div>
					<svg width={ICON_SIZE} height={ICON_SIZE}>
						<rect width={ICON_SIZE} height={ICON_SIZE} style={{fill:'red', fillOpacity:0.8}} transform="rotate(45 25 25)" />
					</svg>
					<p className="chart-labelx">{column.date}</p>
				</div>
			)
		} else if (rec.trend === UNKNOWN) {
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
		var columns = this.pivotOnDate();

    return (
        <div className="inner-wrapper">

          <section className="row no-border">
            <h2>Dashboard</h2>
						<div className="twelve-col box">
							<h3>{this.state.canonicalId}</h3>
							<h4 className="formfactor">{this.state.formFactor}</h4>
							<div className="twelve-col">
									{columns.map(function(rec) {
										return (
											<div className="one-col" key={rec.index}>
													{self.renderIconColumn(rec)}
											</div>
										);
									})}
									<LegendSummary />
							</div>
						</div>
          </section>

        </div>
    );
  }
});

module.exports = Index;
