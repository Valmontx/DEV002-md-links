
const  { existsPath, verifyPath}  = require('../api.js')


describe('existsPath', () => {

  it('should be a function', () => {
    expect(typeof existsPath ).toBe('function');
  });
it('should return the validate path', () =>{
   expect(existsPath('/valeria/md-links/noexiste.md')).toBe('C:\\Users\\Ronald Nicolas\\DEV002-md-links\\index.js')
  
})
});

describe('existsPath', () => { 
  it('should be a function' ,() => {
}); 
  expect(typeof existsPath).toBe('function');
});
it('should return an invalid path',() =>{
  it(verifyPath('/valeria/md-links/noexiste.md')).catch((err) => {
  expect(err).toBe('invalid path')
  }) 
})
