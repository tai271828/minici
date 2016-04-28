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
//'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


jest.dontMock('../components/Index');
jest.dontMock('../components/ChartColumnSelect');
jest.dontMock('moment');

// Test fixture
var RESULTS = {
	"records": [
		{"pass": 10, "skip": 1, "fail": 5, "total": 16, "date": "2016-04-26", "release": "16.04", "formfactor": "server", "canonical_id": "201504-18263", "submission_id": 103997, "pastebin": "https://pastebin.canonical.com/152844/"},
		{"pass": 8, "skip": 1, "fail": 7, "total": 16, "date": "2016-04-25", "release": "16.04", "formfactor": "server", "canonical_id": "201504-18263", "submission_id": 103997, "pastebin": "https://pastebin.canonical.com/152844/"},
		{"pass": 12, "skip": 0, "fail": 4, "total": 16, "date": "2016-04-23", "release": "16.04", "formfactor": "server", "canonical_id": "201504-18263", "submission_id": 103997, "pastebin": "https://pastebin.canonical.com/152844/"},
		{"pass": 11, "skip": 2, "fail": 3, "total": 16, "date": "2016-04-22", "release": "16.04", "formfactor": "server", "canonical_id": "201504-18263", "submission_id": 103997, "pastebin": "https://pastebin.canonical.com/152844/"},
		{"pass": 8, "skip": 1, "fail": 7, "total": 16, "date": "2016-04-20", "release": "16.04", "formfactor": "server", "canonical_id": "201504-18263", "submission_id": 103997, "pastebin": "https://pastebin.canonical.com/152844/"},
		{"pass": 12, "skip": 0, "fail": 4, "total": 16, "date": "2016-04-19", "release": "16.04", "formfactor": "server", "canonical_id": "201504-18263", "submission_id": 103997, "pastebin": "https://pastebin.canonical.com/152844/"},
		{"pass": 11, "skip": 2, "fail": 3, "total": 16, "date": "2016-04-18", "release": "16.04", "formfactor": "server", "canonical_id": "201504-18263", "submission_id": 103997, "pastebin": "https://pastebin.canonical.com/152844/"}
	]
}

describe('index', function() {
 it('displays the index page elements', function() {
	 var Index = require('../components/Index');

	 // Render the component
	 var indexPage = TestUtils.renderIntoDocument(
			<Index records={RESULTS.records} />
	 );

	 expect(TestUtils.isCompositeComponent(indexPage)).toBeTruthy();

	 // Check all the expected elements are rendered
	 var section = TestUtils.findRenderedDOMComponentWithTag(indexPage, 'section');
	 var h2 = TestUtils.findRenderedDOMComponentWithTag(indexPage, 'h2');
	 expect(h2.textContent).toBe('Dashboard');
	 var h3 = TestUtils.findRenderedDOMComponentWithTag(indexPage, 'h3');
	 expect(h3.textContent).toBe(RESULTS.records[0].canonical_id);
 });

 it('generates the trends correctly', function() {
	 var Index = require('../components/Index');

	 // Render the component
	 var indexPage = TestUtils.renderIntoDocument(
			<Index records={RESULTS.records} />
	 );

	 // The analysed records should be in date order for 7 days
	 expect(indexPage.state.records.length).toBe(RESULTS.records.length - 1);
	 expect(indexPage.state.records[0].trend).toBe('Unknown');
	 expect(indexPage.state.records[1].trend).toBe('Worse');
	 expect(indexPage.state.records[2].trend).toBe('Better');
	 expect(indexPage.state.records[3].trend).toBe('Unknown');
	 expect(indexPage.state.records[4].trend).toBe('Worse');
	 expect(indexPage.state.records[5].trend).toBe('Better');

	 // Convert the records to date order with spaces for non-covered dates
	 var columns = indexPage.pivotOnDate();
	 expect(shallowRenderColumn(columns[0]).props.style.fill).toBe('red');
	 expect(shallowRenderColumn(columns[1]).props.style.fill).toBe('white');
	 expect(shallowRenderColumn(columns[2]).props.style.fill).toBe('green');
	 expect(shallowRenderColumn(columns[3]).props.style.fill).toBe('orange');
	 expect(shallowRenderColumn(columns[4]).props.style.fill).toBe('white');
	 expect(shallowRenderColumn(columns[5]).props.style.fill).toBe('red');
	 expect(shallowRenderColumn(columns[6]).props.style.fill).toBe('green');
 });
});

function shallowRenderColumn(record) {
	var ChartColumnSelect = require('../components/ChartColumnSelect');

	// Shallow render the component
	var shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(
		<ChartColumnSelect column={record} />
	);
	return shallowRenderer.getRenderOutput();
}
