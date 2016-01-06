//Template

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['lectures'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.embed_url : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.watched : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <li class=\"green\">\n            <div class=\"lec-a\" embed_url=\""
    + alias4(((helper = (helper = helpers.embed_url || (depth0 != null ? depth0.embed_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"embed_url","hash":{},"data":data}) : helper)))
    + "\">\n              <div>"
    + alias4(((helper = (helper = helpers.object_index || (depth0 != null ? depth0.object_index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"object_index","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n              <div><p><small>"
    + alias4(((helper = (helper = helpers.content_summary || (depth0 != null ? depth0.content_summary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content_summary","hash":{},"data":data}) : helper)))
    + "</small></p></div>\n            </div>\n          </li> \n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <li class=\"orange\">\n            <div class=\"lec-a\" embed_url=\""
    + alias4(((helper = (helper = helpers.embed_url || (depth0 != null ? depth0.embed_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"embed_url","hash":{},"data":data}) : helper)))
    + "\">\n              <div>"
    + alias4(((helper = (helper = helpers.object_index || (depth0 != null ? depth0.object_index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"object_index","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n              <div><p><small>"
    + alias4(((helper = (helper = helpers.content_summary || (depth0 != null ? depth0.content_summary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content_summary","hash":{},"data":data}) : helper)))
    + "</small></p></div>\n            </div>\n          </li> \n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"comments\">\n  <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.lectures : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>\n\n";
},"useData":true});
})();

var init;

init = function() {
    var results = document.getElementById("lectures");
    var newLectures = [];
    var jsonLectures = JSON.parse(lectures).results;
    for (var i = 0; i < jsonLectures.length;i++) {
        if  (jsonLectures[i].embed_url){
            var watched = watched_lectures.indexOf(jsonLectures[i].id) !== -1;
            newLectures.push({ 
                'title': jsonLectures[i].title,
                'embed_url': jsonLectures[i].embed_url,
                'object_index': jsonLectures[i].object_index,
                'content_summary': jsonLectures[i].content_summary,
                'watched': watched
            });
        }
    }
    results.innerHTML = Handlebars.templates.lectures({'lectures':newLectures}, {});
};

$(function() {
  init();
  $('.button.close').on('click', function() {
      return chrome.app.window.current().close();
    });
    chrome.app.window.get('player').onClosed.addListener(function() {
      return chrome.app.window.current().close();
    });
    $('.lec-a').click(function(e){ 
        var embed_url = e.currentTarget.attributes[1].nodeValue;
        chrome.runtime.sendMessage({url: embed_url}, function() {
            console.log('sent')
        });
        return false; 
    });
    return;
});

