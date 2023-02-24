const sessionMaxAge30Days = 30 * 24 * 60 * 60 * 1000;

const sessionExpiresIn30Days = Date.now() + sessionMaxAge30Days;

export default { sessionExpiresIn30Days, sessionMaxAge30Days };