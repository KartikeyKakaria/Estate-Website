import chalk from "chalk";
export default class Login {
  static info(args) {
    console.log(
      chalk.blue.bold(`${new Date(Date.now())}`),
      typeof args == "string" ? chalk.blue(args) : args
    );
  }
  static warn(args) {
    console.log(
      chalk.yellow.bold(`${new Date(Date.now())}`),
      typeof args == "string" ? chalk.yellow(args) : args
    );
  }
  static error(args) {
    console.log(
      chalk.red.bold(`${new Date(Date.now())}`),
      typeof args == "string" ? chalk.red(args) : args
    );
  }
  static success(args) {
    console.log(
      chalk.green.bold(`${new Date(Date.now())}`),
      typeof args == "string" ? chalk.green(args) : args
    );
  }
}
