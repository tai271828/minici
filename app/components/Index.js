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
			var currentScore = current.pass - current.fail;
			var previousScore = previous.pass - previous.fail;

			// Set the trend by comparing with the previous submission
			if (currentScore > previousScore) {
				current.trend = Helper.BETTER;
			} else if (previousScore > currentScore) {
				current.trend = Helper.WORSE;
			} else {
				// Scores are the same, so check that pass/fail numbers are the same
				if ((current.pass === previous.pass) && (current.fail === previous.fail)) {
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
		this.setState({records: analysed, toDate: records[0].date, formFactor: formFactor, canonicalId: canonicalId,
									 release: release});
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
						<div className="twelve-col">
							<h3><a href={Helper.CERTIFICATION.concat('hardware/',this.state.canonicalId, '/')}>{this.state.canonicalId}</a></h3>
							<h4 className="formfactor">{this.state.formFactor} {this.state.release}</h4>
							<div className="twelve-col">
									<div className="eight-col box">
										{columns.map(function(rec) {
											return (
												<div className="one-col" key={rec.index}>
														<ChartColumnSelect column={rec} />
												</div>
											);
										})}
									</div>
									<LegendSummary />
							</div>
						</div>
          </section>

        </div>
    );
  }
});

module.exports = Index;
