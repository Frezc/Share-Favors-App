var env = process.env.NODE_ENV || 'development';

module.exports = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(env)
  },
  'NODE_ENV'     : env,
  '__DEV__'      : env === 'development',
  '__PROD__'     : env === 'production',
  '__TEST__'     : env === 'test'
}
