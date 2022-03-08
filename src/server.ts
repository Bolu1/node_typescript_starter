// const app = require ('./app')
// import colors from 'colors'
// const logger = require('./utils/logger')
// import config = require('config')
// const swaggerDocs  = require('./utils/swagger')


// const PORT = config.get<number>('port') || 8080

// const server = app

// server.listen(PORT, ()=>{
	
// 	swaggerDocs(app, PORT)
//     console.log(colors.random(`Application Listening at https://localhost:${PORT}`))
// })

// // Handle unhandled promise rejections
// // eslint-disable-next-line no-unused-vars
// process.on('unhandledRejection', (err: any, promise) => {
// 	console.log(`Error: ${err.message}`);
// 	// Close server & exit process
// 	// server.close(() => process.exit(1));
// });