/**
* Alert.js
*
* @description		:: Stores an alert for front end displayed
* @humpback-docs	:: https://github.com/CaliStyle/humpback/wiki/Models#alert
* @sails-docs		:: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	description: 'This is the system alert mechanism',
	
	autoCreatedBy: true,

	permissions: {
		'registered': {
			'create': {action: false,	relation: false},
			'read' 	: {action: true,	relation: false},
    	'update': {action: false,	relation: false},
    	'delete': {action: false,	relation: false}		
    },
		'public': {
			'create': {action: false,	relation: false},
			'read' 	: {action: true,	relation: false},
    	'update': {action: false,	relation: false},
    	'delete': {action: false,	relation: false}
		}
	},

	attributes: {
		type: {
			enum: ['error','success','warning'],
			required: true
		},

		// The message that is displayed 
		msg: {
			type: 'string',
			required: true
		},

		// A code used for tracking error alerts generated by the system
		code: {
			type: 'string'
		},

		// A boolean that allows the alert to be stored but not displayed
		active: {
			type: 'boolean',
			defaultsTo: true
		},
		
		// A boolean that decides if this is a personalized or global alert
		system: {
			type: 'boolean',
			defaultsTo: true
		},

		// These are roles that a user must have to see the alert
		roles: {
			collection: 'Role',
     		via: 'alerts',
      		dominant: true
    	},
	}
};
