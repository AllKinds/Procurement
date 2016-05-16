procurement.factory('requestService', function($http, $q, $window) {
    return {
        get: function () {
            // Initialize a new promise ??
            var deferred = $q.defer();
            
            // Make an AJAX call to get all requests
            $http.get('/api/softwares').success(function (requests, status, headers, config) {
                if (requests) {
                    deferred.resolve(requests);
                } else {
                    deferred.reject();
                }
            }).error(function (err,status, m1, m2) {
                if (status == 401) {
                    $window.location.href = '/login';
                }
            });
            
            return deferred.promise;
        },
        getById: function (id) {
            return $http.get('/api/softwares/' + id);
        },
        createSoftware: function (softwareData) {
            return $http.post('/api/softwares', softwareData);
        },
        createPurchase: function (purchaseData) {
            return $http.post('/api/purchase', purchaseData);
        },
        delete: function(id) {
            console.log('Make a delete function');
        }
        
    }
})