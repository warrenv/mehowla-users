export default serviceLookup => {
  const { logger } = serviceLookup()

  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      err.expose = true
      ctx.status = err.status || 500
      ctx.body = err.message

      logger.error(JSON.stringify({ service: err.service || 'unknown', response: err.message }))
    }
  }
}
