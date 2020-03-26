import * as sapper from "@sapper/app";

sapper.start({
  target: document.querySelector("#app")
});

window.goto = sapper.goto;