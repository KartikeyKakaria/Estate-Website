import chalk from "chalk";
export default class Login {
  static info(args) {
    console.log(
      chalk.blue(`${new Date(Date.now())}`),
      typeof args == "string" ? chalk.blueBright(args) : args
    );
  }
  static warn(args) {
    console.log(
      chalk.yellow(`${new Date(Date.now())}`),
      typeof args == "string" ? chalk.yellowBright(args) : args
    );
  }
  static error(args) {
    console.log(
      chalk.red(`${new Date(Date.now())}`),
      typeof args == "string" ? chalk.redBright(args) : args
    );
  }
}
