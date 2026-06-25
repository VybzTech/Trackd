export const logger = {
  info: (msg: string, ...args: any[]) => {
    console.log(`%c[INFO] ${msg}`, 'color: #3B82F6; font-weight: bold;', ...args);
  },
  success: (msg: string, ...args: any[]) => {
    console.log(`%c[GOOD] ${msg}`, 'color: #10B981; font-weight: bold;', ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    console.warn(`%c[WARN] ${msg}`, 'color: #F59E0B; font-weight: bold;', ...args);
  },
  error: (msg: string, ...args: any[]) => {
    console.error(`%c[ALERT] ${msg}`, 'color: #EF4444; font-weight: bold;', ...args);
  }
};
