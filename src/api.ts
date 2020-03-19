export const TODO = {}

// import {init} from './gen/gateway/index';

// init({
//   url: 'https://httpbin.org/anything', // set your service url explicitly. Defaults to the one generated from your OpenAPI spec
//   getAuthorization // Add a `getAuthorization` handler for when a request requires auth credentials
// });


// // The param 'security' represents the security definition in your OpenAPI spec a request is requiring
// // For bearer type it has two properties:
// // 1. id - the name of the security definition from your OpenAPI spec
// // 2. scopes - the token scope(s) required
// // Should return a promise
// function getAuthorization(security: api.OperationSecurity) {
//   switch (security.id) {
//     case 'SimpleToken': return getSimpleToken();
//     default: throw new Error(`Unknown security type '${security.id}'`)
//   }
// };

// let token: api.OperationRightsInfo
// function getSimpleToken() {
//   return new Promise<api.OperationRightsInfo>((resolve) => {
//     if(!token) {
//       const user = JSON.parse(localStorage.getItem('user') || '{}')
//       token = {
//         username: user.username,
//         password: user.password
//       }
//     }
//     resolve(token)
//   })
// }
