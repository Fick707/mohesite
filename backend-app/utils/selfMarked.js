/**
 * Created by zhouwanli on 18/05/2017.
 */
'use strict';
const marked = require('marked');
marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});
var render = new marked.Renderer();
render.table = function (header, body) {
    return '<div class="table-responsive"><table class="table table-bordered">'  + header + body + '</table></div>';
}

module.exports = {
    marked: marked,
    render: render
};