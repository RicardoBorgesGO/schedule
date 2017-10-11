/**
 * Created by ricardo on 07/03/17.
 */
/*
 Simple GraphQL transport which send queries to a GraphQL endpoint
 */
function GraphQLTransport(path) {
    this.path = path || "/graphql";
}

GraphQLTransport.prototype.sendQuery = function (query, variables) {
    var self = this;
    variables = variables || {};

    return new Promise(function(resolve, reject) {
        // use fetch to get the result
        fetch(self.path, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            })
        })
        // get the result as JSON
        .then(function(res) {
            return res.json();
        })
        // trigger result or reject
        .then(function(response) {
            if(response.errors) {
                return reject(response.errors);
            }

            return resolve(response.data);
        })
        .catch(reject);
    });
};

GraphQLTransport.prototype.sendQueryWithParams = function (query, variables) {
    var self = this;
    variables = variables || {};

    var params = '';
    for (var key in variables) {
        params += key + "=" + variables[key];
        params += "&";
    }
    params = params.slice(0, -1)

    return new Promise(function(resolve, reject) {
        // use fetch to get the result
        fetch(self.path + '?query=' + encodeURI(query) + "&" + params, {
            // method: 'get',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        })
        // get the result as JSON
        .then(function(res) {
            return res.json();
        })
        // trigger result or reject
        .then(function(response) {
            if(response.errors) {
                return reject(response.errors);
            }

            return resolve(response);
        })
        .catch(reject);
    });
};