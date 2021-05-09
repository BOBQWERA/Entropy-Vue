module.exports = {
    proxy: {
          '/api': {    
              target: 'http://127.0.0.1:8000/',  
              changeOrigin: true,  //是否跨域
              pathRewrite: {
                  '^/api': ''  
              }              
          }
    }
  }