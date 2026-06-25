const logger = {
  info: (msg, ...args) => {
    console.log(`%c[INFO] ${msg}`, 'color: #3B82F6; font-weight: bold;', ...args);
  },
  success: (msg, ...args) => {
    console.log(`%c[GOOD] ${msg}`, 'color: #10B981; font-weight: bold;', ...args);
  },
  warn: (msg, ...args) => {
    console.warn(`%c[WARN] ${msg}`, 'color: #F59E0B; font-weight: bold;', ...args);
  },
  error: (msg, ...args) => {
    console.error(`%c[ALERT] ${msg}`, 'color: #EF4444; font-weight: bold;', ...args);
  }
};

window.logger = logger;
