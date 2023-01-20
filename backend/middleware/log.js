const root = require('app-root-path');
const winston = require('winston');
const { createLogger, format, transports } = require('winston');

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
    ),
    transports: [
        new winston.transports.File({
            filename: `${root}/monitor/info.log`,
            level: 'info',
        }),
        new winston.transports.File({
            filename: `${root}/monitor/error.log`,
            level: 'error',
        })
    ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
        logger.error(message);
    },
};

module.exports = logger;