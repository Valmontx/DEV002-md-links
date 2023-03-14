
const  { existsPath, verifyPath}  = require('../api.js')


describe('existsPath', () => {

  it('should be a function', () => {
    expect(typeof existsPath ).toBe('function');
  });
it('should return the validate path', () =>{
   expect(existsPath('./prueba/documentos/ex.md')).toBe('./prueba/documentos/ex.md')
  
})
});

describe('existsPath', () => { 
  it('should be a function' ,() => {
}); 
  expect(typeof existsPath).toBe('function');
});
it('should return an invalid path',() =>{
  it(verifyPath('./valeria/md-links/noexiste.md')).catch((err) => {
  expect('./prueba/documentos/ex.md').toBe(console.log(err))
  }) 
})
