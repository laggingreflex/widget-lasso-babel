import 'babel-polyfill'; // error

import { delay } from 'bluebird';

module.exports = require('marko-widgets').defineWidget({
  init: function() {
    addEventListener('click', function() {
      this.addText('You clicked it!');
    }.bind(this));
  },

  addText: function(text) {
    this.el.appendChild(document.createTextNode(text));
  },

  asyncOp: function() {
    asyncOp();
  }
});


async function asyncOp() {
  await delay(1000);
}
