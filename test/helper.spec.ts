import { expect } from 'chai'
import * as fs from 'fs'
import { parseGPXData } from '../src/renderer/lib/helper'
import { GPXData, GPXPoint } from '../src/declarations'

describe('helper', () => {
	it('should parse GPX data', () => {
		// read test file data (file specified relative to root, where test is executed)
		const sFileData = fs.readFileSync('Kuwait.gpx', 'utf8')

		const oParsedData: GPXData = parseGPXData(sFileData)

		// test against parse function
		expect(oParsedData.name).to.equal('Kuwait')

		expect(oParsedData.points).to.exist
		expect(oParsedData.points.length).to.equal(237)

		expect(oParsedData.points[0].latitude).to.equal(29.241724)
	})
	it('should parse big GPX file', () => {
		// read test file data (file specified relative to root, where test is executed)
		const sFileData = fs.readFileSync('big-file.gpx', 'utf8')

		const oParsedData: GPXData = parseGPXData(sFileData)

		// test against parse function
		expect(oParsedData.name).to.equal('India')

		expect(oParsedData.points).to.exist
		expect(oParsedData.points.length).to.equal(37013)
	})
})
