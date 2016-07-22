const Parse = require('parse/node').Parse;

// this is just a copy and paste of:
// https://github.com/ParsePlatform/parse-server/blob/master/spec/adapter.spec.js
var testAdapter = function (name, adapter) {
  it("Verify INFO logs", (done) => {
    const message = 'testing info logs';
    adapter.info(message, () => {
      adapter.query({
        from: new Date(Date.now() - 500),
        size: 100,
        level: 'info'
      }, (results) => {
        if (results.length == 0) {
          fail('The adapter should return non-empty results');
        } else {
          expect(results[0].message).toEqual(message);
          done();
        }
      });
    });
  });

  describe('error logs', () => {
    it("Verify ERROR logs", (done) => {
      const message = 'testing error logs';
      adapter.error(message, () => {
        adapter.query({
          from: new Date(Date.now() - 500),
          size: 100,
          level: 'error'
        }, (results) => {
          if (results.length == 0) {
            fail('The adapter should return non-empty results');
            done();
          }
          else {
            expect(results[0].message).toEqual(message);
            done();
          }
        });
      });
    });
  });

//   describe('verbose logs', () => {
//     it("mask sensitive information in _User class", (done) => {
//       reconfigureServer({ verbose: true })
//         .then(() => createTestUser())
//         .then(() => {
//           let adapter = new adapter();
//           return adapter.query({
//             from: new Date(Date.now() - 500),
//             size: 100,
//             level: 'verbose'
//           });
//         }).then((results) => {
//           let logString = JSON.stringify(results);
//           expect(logString.match(/\*\*\*\*\*\*\*\*/g).length).not.toBe(0);
//           expect(logString.match(/moon-y/g)).toBe(null);

//           var headers = {
//             'X-Parse-Application-Id': 'test',
//             'X-Parse-REST-API-Key': 'rest'
//           };
//           request.get({
//             headers: headers,
//             url: 'http://localhost:8378/1/login?username=test&password=moon-y'
//           }, (error, response, body) => {
//             let adapter = new adapter();
//             return adapter.query({
//               from: new Date(Date.now() - 500),
//               size: 100,
//               level: 'verbose'
//             }).then((results) => {
//               let logString = JSON.stringify(results);
//               expect(logString.match(/\*\*\*\*\*\*\*\*/g).length).not.toBe(0);
//               expect(logString.match(/moon-y/g)).toBe(null);
//               done();
//             });
//           });
//         }).catch((err) => {
//           fail(JSON.stringify(err));
//           done();
//         })
//     });

//     it("should not mask information in non _User class", (done) => {
//       let obj = new Parse.Object('users');
//       obj.set('password', 'pw');
//       obj.save().then(() => {
//         let adapter = new adapter();
//         return adapter.query({
//           from: new Date(Date.now() - 500),
//           size: 100,
//           level: 'verbose'
//         });
//       }).then((results) => {
//         expect(results[1].body.password).toEqual("pw");
//         done();
//       });
//     });
//   });
 }

module.exports = {
  testAdapter
}
