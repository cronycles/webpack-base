
export default class Clown {
  constructor() {
    this.initializeClown();
  }

  initializeClown () {
    let $button = $(".jclown");
    $button.off("click").on("click", () => this.msg())
  }

  async msg () {
    const msg = await this.scaryClown();
    console.log('Message:', msg);
  }

  async scaryClown () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('🤡');
      }, 2000);
    });
  }
}






