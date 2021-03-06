/**
* @description 
* Global Category. Model
* humpback-model created at Fri Sep 04 2015 11:20:23 GMT-0400 (EDT)
**/
angular.module('category.model', [
    'humpback.models'
])

/**
* @description 
* Run and ignore for unit testing
* 
**/
.run(function($sailsSocket, DS, CategoryService, utils){
    if(utils.development()){ console.log(window._name,': listening to category changes')};
    
    $sailsSocket.subscribe('category', function(envelope){
        //console.log(envelope);
        CategoryService.handler[envelope.verb](envelope)
    });
    
    return DS.defineResource({
        name: 'category',
        maxAge: 36000000,
        deleteOnExpire: 'none',
        onExpire: function (id, category) {
            console.log(id, 'Category Expired');
        },
        storageMode: 'localStorage',
        idAttribute: 'id',
        endpoint: '/category',
        baseUrl: window._prefix || '/api',
        meta: {
            contentCount: 0
        },


        /**
        * @description 
        * Model's Life Cycle Callbacks
        * http://www.js-data.io/v1.5.8/docs/dsdefaults
        **/
        beforeInject: function(resource, data){
           
        },
        beforeCreate: function (resource, data, cb) {
            cb(null, data);
        },
        beforeUpdate: function(resource, data, cb){
            cb(null, data);
        },
        afterUpdate: function(resource, data, cb){
            cb(null, data);
        },
        afterInject: function(resource, attrs){
            console.log(attrs);
        },
        afterCreate: function (resource, data, cb) {
            cb(null, data);
        },
        beforeDestroy: function (resource, data, cb) {
            cb(null, data);
        },
        afterDestroy: function (resource, data, cb) {
            cb(null, data);
        },

        /**
        * @description 
        * Define's Relations to the Model 
        * 
        **/
        relations:{
           
        }
    });    
})

/**
* @description 
* The CategoryService factory Exposes Handler and Service methods for the Category Server Side Model
* 
**/
.factory('CategoryService',function(DS, $sailsSocket, utils){
	var _service = {};
	var _handler = {};

    /**
    * @description 
    * When a Category is created that the app is listenting to inject it into the local DB
    * 
    **/
	_handler.created = function(envelope){
        'use strict';
        utils.development(envelope);
        DS.inject('category', envelope.data);
        
    };

    /**
    * @description 
    * When a Category is deleted that the app is listenting to eject it from the local DB 
    * 
    **/
    _handler.deleted = function(envelope){
        'use strict';
        utils.development(envelope);
        DS.eject('category', envelope.data);
    };

    /**
    * @description 
    * When a Category is updated that the app is listenting to inject it from the local DB, or if only a ID fetch it from the server 
    * 
    **/
    _handler.updated = function(envelope){
        'use strict';
        utils.development(envelope);
        if(envelope.data){
            envelope.data.id = envelope.id;
            DS.inject('category', envelope.data);
        }else{
            DS.refresh('category',envelope.id);
        }

    };

    /**
    * @description 
    * When a Category model's collection is added to, inject it into the Category Model 
    * 
    **/
    _handler.addedTo = function(envelope){
        'use strict';
        utils.development(envelope);
    };

    /**
    * @description 
    * When a Category model's collection is detracted from eject it from the Category Model 
    * 
    **/
    _handler.removedFrom = function(envelope){
        'use strict';
        utils.development(envelope);
    };

    /**
    * @description 
    * When a Category model is messaged 
    * 
    **/
    _handler.messaged = function(envelope){
        'use strict';
        utils.development(envelope);
    };

	return {
		service : _service,
		handler : _handler
	}
});