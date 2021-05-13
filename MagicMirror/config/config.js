/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	// address: "localhost", 	// Address to listen on, can be:
	address: "0.0.0.0",
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	// ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
	ipWhitelist: [],
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "MMM-MyScoreboard",
			position: "top_left",
			classes: "default everyone",
			header: "My Scoreboard",
			config: {
				showLeagueSeparators: true,
				colored: true,
				viewStyle: "stackedWithLogos",
				sports: [
					{
						league: "NBA",
						groups: ["West"]
					},
					{
						league: "UEFA_CHAMPIONS",
					},
					{
						league: "ENG_PREMIERE_LEAGUE",
					},
					{
						league: "GER_BUNDESLIGA",
						teams: ["DOR"]
					},
					{
						league: "ESP_LALIGA",
						teams: ["BAR"]
					},

				]

			}
		},

		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				units: "imperial",
				locationID: "4758023", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "24f136a3c63643b86b424d64b5f43cc6"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				units: "imperial",
				locationID: "4758023", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "24f136a3c63643b86b424d64b5f43cc6"
			}
		},
		{
			module: "calendar",
			position: "bottom_right",
			header: "UIUC MCS Calendar",
			config: {
				wrapEvents: true,
				calendars: [
					{
						url: 'https://calendar.google.com/calendar/ical/3osf8bb2v48sv0gg2m06u8ei8oehe48d%40import.calendar.google.com/public/basic.ics', //add your own calendar
						symbol: 'calendar',
					}
				]
			}

		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
		{
			module: 'MMM-Remote-Control',
			// uncomment the following line to show the URL of the remote control on the mirror
			position: 'bottom_left',
			// you can hide this module afterwards from the remote control itself
			config: {
				customCommand: {},  // Optional, See "Using Custom Commands" below
				showModuleApiMenu: true, // Optional, Enable the Module Controls menu
				secureEndpoints: true, // Optional, See API/README.md
				// uncomment any of the lines below if you're gonna use it
				// customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
				// apiKey: "", // Optional, See API/README.md for details
				// classes: {} // Optional, See "Custom Classes" below
			}
		},
		{
			module: 'MMM-awesome-alexa',
			position: 'bottom_bar',
			config: {
				wakeWord: 'Alexa',
				clientId: 'amzn1.application-oa2-client.ae5dc85b09d74ca5b974a12b32714870',
				clientSecret: 'dd623e966161b5a4330e21a4846588fb33ec35582b21559db87dc250eac7aef0',
				deviceId: 'PiMirror',
				refreshToken: 'Atzr|IwEBIE3SyJEXIlGazIGdKWr58PdRDBsD6wA23CMFWTmDoa8EawUVfhpaL-5oDhY7cv3F7HNDZyGBBHFh9MdJ32wF47QLtaePvdMeK3SSQEWzP4Im_z3dPdFFNdFDZ7Pj-9Osa5yvfoqbX-KoJ4ZAufX73eTqTo4g-PbqyZrvbSjJ86m3y1hTaIRSKRqrDBy05EaTzNVJtaLwrqHEDihbZvGJhd-EdR3CtVicDqxgaJhwv4LfVW6JAbrvEJoyi2shN9JIlXgc2GFMb2n7Zl46kkCFe2cknxyRxn6m3Gwjt0fpUApzm1z6sy9_AIKsYuKcGiRKEt0iVynzlW1nv7RbwPaKGeOz',
				lite: false,
				isSpeechVisualizationEnabled: true
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
