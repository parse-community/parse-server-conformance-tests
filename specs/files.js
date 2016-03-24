var testAdapter = function(name, adapter) {
  it("should properly create, read, delete files", (done) => {
    var filename = 'file.txt';
    adapter.createFile(filename, "hello world", 'text/utf8').then((result) => {
      return adapter.getFileData(filename);
    }, (err) => {
      fail("The adapter should create the file");
      done();
    }).then((result) => {
      expect(result instanceof Buffer).toBe(true);
      expect(result.toString('utf-8')).toEqual("hello world");
      return adapter.deleteFile(filename);
    }, (err) => {
      fail("The adapter should get the file");
      done();
    }).then((result) => {

      adapter.getFileData(filename).then((res) => {
        fail("the file should be deleted");
        done();
      }, (err) => {
        done();
      });

    }, (err) => {
      fail("The adapter should delete the file");
      done();
    });
  }, 5000);
}

module.exports = {
  testAdapter: testAdapter
}
