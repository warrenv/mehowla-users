export const logger = serviceLookup => {
  return Object.freeze({
    name: 'logger',
    raw: payload => console.log(payload),
    error: payload => console.log(payload),
    warning: payload => console.log(payload),
    info: payload => console.log(payload),
    debug: payload => console.log(payload),
    trace: payload => console.log(payload),
  })
}

/*
import ConfigurationManager from './configurationManager'

export const levels = {
  raw: 9999,
  error: 50,
  warning: 40,
  info: 30,
  debug: 20,
  trace: 10,
}

export const transport = stream => level => {
  return configuredLogLevel => msg => {
    if (levels[level] >= levels[configuredLogLevel]) {
      const label = level === 'raw' ? '' : `${level}: `
      stream.write(`${new Date()} ${label}${msg}\n`)
    }
  }
}

const stdoutLogger = transport(process.stdout)
const stderrLogger = transport(process.stderr)

const withCurrentLogLevel = fn => fn(ConfigurationManager.lookup('LOGLEVEL'))

export const logger = {
  name: 'loggingService',
  on: fn => fn,
  raw: withCurrentLogLevel(stdoutLogger('raw')),
  error: withCurrentLogLevel(stderrLogger('error')),
  warning: withCurrentLogLevel(stdoutLogger('warning')),
  info: withCurrentLogLevel(stdoutLogger('info')),
  debug: withCurrentLogLevel(stdoutLogger('debug')),
  trace: withCurrentLogLevel(stdoutLogger('trace')),
}

export default Object.freeze(logger)
*/
