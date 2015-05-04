angular.module('ngIdle.localStorage', [])
  .service('IdleLocalStorage', ['$window', function($window) {
    var storage;

    if (chrome !== undefined && chrome.storage !== undefined) {
      // in case of Chrome App, shim localStorage with simple in memory hash
      storage = {
        _data       : {},
        setItem     : function(id, val) { return this._data[id] = String(val); },
        getItem     : function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined; },
        removeItem  : function(id) { return delete this._data[id]; },
        clear       : function() { return this._data = {}; }
      };
    }
    else {
      storage = $window.localStorage;
    }
    
    return {
      set: function(key, value) {
        storage.setItem('ngIdle.'+key, angular.toJson(value));
      },
      get: function(key) {
        return angular.fromJson(storage.getItem('ngIdle.'+key));
      },
      remove: function(key) {
        storage.removeItem('ngIdle.'+key);
      }
    };
  }]);
