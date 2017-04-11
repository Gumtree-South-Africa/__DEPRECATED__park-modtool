define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["addWord.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form class=\"form-inline col-sm-8 \" role=\"form\">\r\n  <div class=\"form-group col-sm-12\" style=\"line-height:28px;\">\r\n    <label class=\"col-sm-3 control-label\">\r\n      Write a new word\r\n    </label>\r\n    <div class=\"col-sm-4\">\r\n      <input type=\"text\"\r\n        class=\"form-control\"\r\n        id=\"addWord\"\r\n        name=\"addWord\"\r\n        placeholder=\"\">\r\n    </div>\r\n    <button class=\"js-addWord col-sm-3 btn btn-success\">Add Word</button>\r\n  </div>\r\n</form>";
  });

this["JST"]["blacklist.layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"searchRegion\" class=\"filters full-height\">\r\n  <!-- SEARCH SECTION -->\r\n</div>\r\n<div id=\"resultsRegion\" class=\"results full-height\">\r\n  <!-- RESULTS SECTION -->\r\n</div>\r\n<div id=\"addWordRegion\" class=\"pagination\">\r\n  <!-- PAGINATION SECTION -->\r\n</div>\r\n";
  });

this["JST"]["blacklist.item.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td class=\"first\">";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.word) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.word); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n\n<td class=\"actions\">\n  <div class=\"btn-group\">\n    <button class=\"js-removeItem tooltiped btn btn-default\"\n            data-toggle=\"tooltip\"\n            data-placement=\"top\"\n            title=\"Remove\">\n      <span class=\"glyphicon glyphicon-remove\"></span>\n    </button>\n  </div>\n</td>";
  return buffer;
  });

this["JST"]["blacklist.list.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<thead>\n  <tr>\n    <th class=\"first\">#</th>\n    <th>Word</th>\n    <th>Actions</th>\n  </tr>\n</thead>\n<tbody id=\"resultsBodyRegion\">\n\n</tbody>";
  });

this["JST"]["noresults.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<span class=\"glyphicon glyphicon-info-sign\"></span>\n<span>No matches found...</span>";
  });

this["JST"]["search.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"panel panel-default clear-fix\">\r\n  <div class=\"form-inline\" role=\"form\">\r\n    <div class=\"form-group\">\r\n      <div class=\"col-sm-6\">\r\n        <input type=\"text\"\r\n          class=\"form-control\"\r\n          id=\"searchWord\"\r\n          name=\"searchWord\"\r\n          placeholder=\"Search...\">\r\n      </div>\r\n      <label for=\"inputEmail3\" class=\"col-sm-6 control-label\">\r\n        Start writing to filter the list\r\n      </label>\r\n    </div>\r\n  </div>\r\n</div>";
  });

this["JST"]["colManager.view.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"managerMenu\" class=\"col-manager-menu\">\n     <div class=\"manager-header\">\n         <h4>\n             Customize the Grid\n         </h4>\n         <p class=\"sub-title\">\n             Select columns to be display and the order in which they should appear\n         </p>\n     </div>\n     <div class=\"manager\">\n         <div  class=\"column-list\">\n             <p class=\"col-list-title\">\n                 Visible columns and order\n             </p>\n             <div id=\"visibleColumns\"  class=\"container columns-container\" multiple=\"multiple\">\n             </div>\n         </div>\n         <div class=\"buttons\">\n             <div class=\"btns-group\">\n                 <button id=\"btnShow\" type=\"button\" class=\"btns btn-show-hide-size\" disabled=\"disabled\"></button>\n                 <button id=\"btnHide\" type=\"button\" class=\"btns btn-show-hide-size\" disabled=\"disabled\"></button>\n             </div>\n             <div class=\"btns-group\">\n                 <button id=\"btnUp\" type=\"button\" class=\"btns btn-up-down-size\" disabled=\"disabled\"></button>\n                 <button id=\"btnDown\" type=\"button\" class=\"btns btn-up-down-size\" disabled=\"disabled\"></button>\n             </div>\n         </div>\n         <div  class=\"column-list\">\n             <p class=\"col-list-title\">\n                 Hidden columns\n             </p>\n             <div id=\"hiddenColumns\"  class=\"container columns-container\" multiple=\"multiple\">\n             </div>\n         </div>\n     </div>\n     <div class=\"manager-footer\">\n         <button id=\"btnCancel\" type=\"button\" class=\"btn btn-cancel\">Cancel</button>\n         <button id=\"btnUpdateGrid\" type=\"button\" class=\"btn btn-update\" disabled=\"disabled\">Update Grid</button>\n     </div>\n</div>\n";
  });

this["JST"]["filter.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n      <div class=\"form-group\">\r\n        <select class=\"form-control js-changeStatus\" name=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.displayName)),stack1 == null || stack1 === false ? stack1 : stack1.filter3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n          ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.statusArr), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n        </select>\r\n      </div>\r\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n            <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"> "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " </option>\r\n          ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n      <div class=\"form-group\">\r\n        <select class=\"form-control js-changeStatus\" name=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.displayName)),stack1 == null || stack1 === false ? stack1 : stack1.filter4)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n          ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.verifiedArr), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n        </select>\r\n      </div>\r\n     ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\r\n      <div class=\"form-group\">\r\n        <select class=\"form-control js-changeStatus\" name=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.displayName)),stack1 == null || stack1 === false ? stack1 : stack1.filter3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n          ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.verifiedGroup), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n        </select>\r\n      </div>\r\n     ";
  return buffer;
  }

  buffer += "<div class=\"filteredData\">\r\n  <div class=\"page-header\">\r\n    <h3 class=\"title\">Filtered <small>by:</small></h3>\r\n    <span class=\"tag-list\"></div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"page-header\">\r\n  <h3 class=\"title\">Filter <small>by:</small></h3>\r\n</div>\r\n\r\n<div class=\"panel panel-default clear-fix\">\r\n  <form class=\"form-inline\" role=\"form\">\r\n    <div class=\"form-group\">\r\n      <div class=\"input-group\">\r\n        <input type=\"text\"\r\n               class=\"form-control\"\r\n               id=\"titleFilter\"\r\n               name=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.displayName)),stack1 == null || stack1 === false ? stack1 : stack1.filter1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\r\n               placeholder=\"Enter the "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.displayName)),stack1 == null || stack1 === false ? stack1 : stack1.filter1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n        <button class=\"js-addFilterValue input-group-addon\">\r\n          <span class=\"glyphicon glyphicon-plus\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <div class=\"input-group\">\r\n        <input type=\"text\"\r\n               class=\"form-control\"\r\n               id=\"filterOwner\"\r\n               name=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.displayName)),stack1 == null || stack1 === false ? stack1 : stack1.filter2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"\r\n               placeholder=\"Enter the "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.displayName)),stack1 == null || stack1 === false ? stack1 : stack1.filter2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n        <button class=\"js-addFilterValue input-group-addon\">\r\n          <span class=\"glyphicon glyphicon-plus\"></span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.statusArr), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n    ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.verifiedArr), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n     ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.verifiedGroup), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n  </form>\r\n\r\n  <div class=\"tag-list\">\r\n     <!-- Tags are dynamically added -->\r\n  </div>\r\n\r\n  <div>\r\n    <form class=\"form-inline pull-right\">\r\n      <div class=\"form-group\">\r\n        <button class=\"js-applyFilter btn btn-main\">Apply</button>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <a href=\"javascript:void(0)\" class=\"js-cleanFilter\" >Clean</a>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n\r\n";
  return buffer;
  });

this["JST"]["groups.layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"filtersRegion\" class=\"filters full-height\">\n  <!-- FILTER SECTION -->\n</div>\n<div class=\"page-header\">\n  <h3 class=\"title\">Results<small></small></h3>\n</div>\n<div id=\"resultsRegion\" class=\"results full-height\">\n  <!-- RESULTS SECTION -->\n</div>\n<div id=\"paginationRegion\" class=\"pagination\">\n  <!-- PAGINATION SECTION -->\n</div>\n";
  });

this["JST"]["groups.item.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"group-thumbnail\">\n      <img src=\"";
  if (stack1 = helpers.pictureUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.pictureUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    </div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n    <div class=\"group-thumbnail\">\n      <img src=\"img/groups_placeholder.png\"/>\n    </div>\n  ";
  }

function program5(depth0,data) {
  
  
  return " active ";
  }

function program7(depth0,data) {
  
  
  return " banned ";
  }

function program9(depth0,data) {
  
  
  return " YES ";
  }

function program11(depth0,data) {
  
  
  return " NO ";
  }

  buffer += "<td class=\"first\">";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pictureUrl), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.creatorName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.creatorName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>\n    <span class=\"label ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ownerVerified), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ownerVerified), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ownerVerified), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ownerVerified), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n</td>\n<td class=\"actions\">\n  <div class=\"btn-group\">\n    <button class=\"js-removeItem tooltiped btn btn-default\"\n            data-toggle=\"tooltip\"\n            data-placement=\"top\"\n            title=\"Remove\">\n      <span class=\"glyphicon glyphicon-remove\"></span>\n    </button>\n  </div>\n</td>";
  return buffer;
  });

this["JST"]["groups.list.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<thead>\n  <tr>\n    <th class=\"first\">#</th>\n    <th>Picture</th>\n    <th>Group Name</th>\n    <th>Creator</th>\n    <th>Verified</th>\n    <th>Actions</th>\n  </tr>\n</thead>\n<tbody id=\"resultsBodyRegion\">\n\n</tbody>\n";
  });

this["JST"]["noresults.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<span class=\"glyphicon glyphicon-info-sign\"></span>\n<span>No matches found...</span>";
  });

this["JST"]["header.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a href=\"#\" class=\"name\">\r\n  <img alt=\"1\" class=\"avatar\" src=\"img/logo.png\" width=\"100\">\r\n  <div class=\"pull-right\">\r\n    <button class=\"btn btn-secondary logout\">Logout</button>\r\n  </div>\r\n</a>";
  });

this["JST"]["confirm.modal.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"modal-option\">\r\n          <input type=\"radio\" class=\"modal-option-radio-btn\" id="
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " name=\"delete-options\" value="
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " />\r\n          <label class=\"modal-option-label\" for="
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + ">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</label>\r\n        </div>\r\n      ";
  return buffer;
  }

  buffer += "<div class=\"modal-content\">\r\n  <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <p>";
  if (stack1 = helpers.question) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.question); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    <div>\r\n      <p>";
  if (stack1 = helpers.note) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.note); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    </div>\r\n    <div>\r\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"js-cancel btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n    <button type=\"button\" class=\"js-confirm btn btn-primary\" data-dismiss=\"modal\" disabled=\"disabled\">Confirm</button>\r\n  </div>\r\n</div><!-- /.modal-content -->\r\n";
  return buffer;
  });

this["JST"]["confirmDiscard.modal.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <button type=\"button\" class=\"js-discard btn btn-default\" id=\"firstBtn\" data-dismiss=\"modal\">";
  if (stack1 = helpers.discardButton) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.discardButton); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</button>\r\n    ";
  return buffer;
  }

  buffer += "<div class=\"modal-content\">\r\n  <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <p>";
  if (stack1 = helpers.question) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.question); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    <div>\r\n      <p>";
  if (stack1 = helpers.note) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.note); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"js-cancel btn btn-default\" data-dismiss=\"modal\">Cancel</button>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.discardButton), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <button type=\"button\" class=\"js-confirm btn btn-primary\" id=\"secondBtn\" data-dismiss=\"modal\">";
  if (stack1 = helpers.confirmButton) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.confirmButton); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</button>\r\n  </div>\r\n</div><!-- /.modal-content -->\r\n";
  return buffer;
  });

this["JST"]["info.modal.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-content\">\r\n  <div class=\"modal-header\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n      <span class=\"sr-only\">Close</span>\r\n    </button>\r\n    <h4 class=\"modal-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <p>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.message); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"js-ok btn btn-primary\" data-dismiss=\"modal\">Ok</button>\r\n  </div>\r\n</div><!-- /.modal-content -->";
  return buffer;
  });

this["JST"]["preview.modal.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-content preview\">\r\n  <div class=\"modal-body\">\r\n    <section>\r\n      <div class=\"product-thumbnail large\" id=\"imageContent\">\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div><!-- /.modal-content -->";
  });

this["JST"]["filters.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectable), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <option value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n                        ";
  return buffer;
  }

  buffer += "<div class=\"mod-mode-filters\">\n    <div class=\"horizontal-flex flex-grow-1\">\n        <div class=\"filters-vertical-flex \">\n            <div class=\"filters-horizontal-flex\">\n                <div class=\"filters-label basis-1\">\n                    Username\n                </div>\n                <input id=\"userName\" type=\"text\" name=\"username\" placeholder=\"Any\" value=\"\" class=\"form-control filter-input\">\n            </div>\n            <div class=\"filters-horizontal-flex\">\n                <div class=\"filters-label padding-category\">\n                    Category\n                </div>\n                <select id=\"categoryId\" class=\"form-control filter-input filter-placeholder\">\n                    <option value=\"default\" selected=\"selected\">All categories</option>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.categories), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </select>\n            </div>\n        </div>\n        <div class=\"filters-vertical-flex\">\n            <div class=\"filters-horizontal-flex\">\n                <div class=\"filters-label padding-title\">\n                    Title\n                </div>\n                <input id=\"name\" type=\"text\" name=\"title\" placeholder=\"Any\" value=\"\" class=\"form-control filter-input\">\n            </div>\n            <div class=\"filters-horizontal-flex\">\n                <div class=\"filters-label\">\n                    Date\n                </div>\n                <div class=\"horizontal-flex\">\n                    <input id=\"itemLastUpdatedFrom\" type=\"text\" class=\"date-account jsDatePickerFrom form-control filter-input filter-from\" placeholder=\"From\" value=\"\">\n                    <input id=\"itemLastUpdatedTo\" type=\"text\" class=\"date-account jsDatePickerTo form-control filter-input filter-to\" placeholder=\"To\" value=\"\" disabled=\"disabled\">\n                </div>\n            </div>\n        </div>\n        <div class=\"filters-vertical-flex filters-vertical-last\">\n            <div class=\"filters-horizontal-flex\">\n                Description\n                <input id=\"description\" type=\"text\" name=\"description\" placeholder=\"Any\" value=\"\" class=\"form-control filter-input\">\n            </div>\n            <div class=\"filters-horizontal-flex\">\n                State\n                <select id=\"stateFilter\" value=\"\" class=\"form-control filter-input filter-placeholder\">\n                    <option value=\"default\" selected=\"selected\">All states</option>\n                    <option value=\"AL\">Alabama</option>\n                    <option value=\"AK\">Alaska</option>\n                    <option value=\"AZ\">Arizona</option>\n                    <option value=\"AR\">Arkansas</option>\n                    <option value=\"CA\">California</option>\n                    <option value=\"CO\">Colorado</option>\n                    <option value=\"CT\">Connecticut</option>\n                    <option value=\"DE\">Delaware</option>\n                    <option value=\"FL\">Florida</option>\n                    <option value=\"GA\">Georgia</option>\n                    <option value=\"HI\">Hawaii</option>\n                    <option value=\"ID\">Idaho</option>\n                    <option value=\"IL\">Illinois</option>\n                    <option value=\"IN\">Indiana</option>\n                    <option value=\"IA\">Iowa</option>\n                    <option value=\"KS\">Kansas</option>\n                    <option value=\"KY\">Kentucky</option>\n                    <option value=\"LA\">Louisiana</option>\n                    <option value=\"ME\">Maine</option>\n                    <option value=\"MD\">Maryland</option>\n                    <option value=\"MA\">Massachusetts</option>\n                    <option value=\"MI\">Michigan</option>\n                    <option value=\"MN\">Minnesota</option>\n                    <option value=\"MS\">Mississippi</option>\n                    <option value=\"MO\">Missouri</option>\n                    <option value=\"MT\">Montana</option>\n                    <option value=\"NE\">Nebraska</option>\n                    <option value=\"NV\">Nevada</option>\n                    <option value=\"NH\">New Hampshire</option>\n                    <option value=\"NJ\">New Jersey</option>\n                    <option value=\"NM\">New Mexico</option>\n                    <option value=\"NY\">New York</option>\n                    <option value=\"NC\">North Carolina</option>\n                    <option value=\"ND\">North Dakota</option>\n                    <option value=\"OH\">Ohio</option>\n                    <option value=\"OK\">Oklahoma</option>\n                    <option value=\"OR\">Oregon</option>\n                    <option value=\"PA\">Pennsylvania</option>\n                    <option value=\"RI\">Rhode Island</option>\n                    <option value=\"SC\">South Carolina</option>\n                    <option value=\"SD\">South Dakota</option>\n                    <option value=\"TN\">Tennessee</option>\n                    <option value=\"TX\">Texas</option>\n                    <option value=\"UT\">Utah</option>\n                    <option value=\"VT\">Vermont</option>\n                    <option value=\"VA\">Virginia</option>\n                    <option value=\"WA\">Washington</option>\n                    <option value=\"WV\">West Virginia</option>\n                    <option value=\"WI\">Wisconsin</option>\n                    <option value=\"WY\">Wyoming</option>'\n                </select>\n                City\n                <select id=\"cityFilter\" value=\"\" class=\"form-control filter-input filter-placeholder\" disabled=\"disabled\">\n                    <option value=\"default\" selected=\"selected\">All cities</option>\n                </select>\n            </div>\n        </div>\n    </div>\n    <div class=\"horizontal-flex filters-buttons\">\n        <a id=\"clearLink\">Clear</a>\n        <button\n            type=\"submit\"\n            id=\"applyFilters\"\n            class=\"btn btn-default btn-lg\">\n            Apply\n        </button>\n    </div>\n</div>\n";
  return buffer;
  });

this["JST"]["layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"moderation-mode\">\n    <div id=\"modModeFiltersRegion\" class=\"mod-mode-filters-region white-background\">\n    </div>\n    <div id=\"modModeResultsRegion\" class=\"mod-mode-results-region\">\n    </div>\n</div>\n";
  });

this["JST"]["results.item.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <img id=\"bigPic\"  class=\"big-pic\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                            <img id=\"deleteBigPic\" class=\"bn-del-big-picture\" src=\"../img/moderation_mode/bn_delete_picture.png\" alt=\"\" />\n                        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <div class=\"pic-wrapper\">\n                                <img id=\"pic1\" class=\"small-pic\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                            </div>\n                            <img class=\"bn-del-picture\" src=\"../img/moderation_mode/bn_delete_picture.png\" alt=\"\" />\n                        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <div class=\"pic-wrapper\">\n                                <img id=\"pic2\" class=\"small-pic\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                            </div>\n                          <img class=\"bn-del-picture\" src=\"../img/moderation_mode/bn_delete_picture.png\" alt=\"\" />\n                        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <div class=\"pic-wrapper\">\n                                <img id=\"pic3\" class=\"small-pic\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture3)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                            </div>\n                          <img class=\"bn-del-picture\" src=\"../img/moderation_mode/bn_delete_picture.png\" alt=\"\" />\n                        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <div class=\"pic-wrapper\">\n                                <img id=\"pic4\" class=\"small-pic\" src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture4)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                            </div>\n                          <img class=\"bn-del-picture\" src=\"../img/moderation_mode/bn_delete_picture.png\" alt=\"\" />\n                        ";
  return buffer;
  }

function program11(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectable), {hash:{},inverse:self.noop,fn:self.programWithDepth(12, program12, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program12(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                                <option ";
  options = {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth0 && depth0.ifCond)),stack1 ? stack1.call(depth0, (depth0 && depth0.id), ((stack1 = ((stack1 = (depth2 && depth2.item)),stack1 == null || stack1 === false ? stack1 : stack1.category)),stack1 == null || stack1 === false ? stack1 : stack1.id), options) : helperMissing.call(depth0, "ifCond", (depth0 && depth0.id), ((stack1 = ((stack1 = (depth2 && depth2.item)),stack1 == null || stack1 === false ? stack1 : stack1.category)),stack1 == null || stack1 === false ? stack1 : stack1.id), options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " value=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.id); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.name); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</option>\n                            ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return " selected=\"selected\" ";
  }

  buffer += "<!-- <div  class=\"item-region white-background\"> -->\n    <div id=\"itemHeader\" class=\"item-header horizontal-flex flex-baseline space-between border-bottom\">\n        <h5>User: <b>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.user)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></h5>\n        <h6>Last updated on ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.parseDateWithHour || (depth0 && depth0.parseDateWithHour)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.lastModificationDate), options) : helperMissing.call(depth0, "parseDateWithHour", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.lastModificationDate), options)))
    + "</h6>\n        <h5>Item ID: <b>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></h5>\n    </div>\n    <div id=\"itemBody\" class=\"horizontal-flex\">\n\n        <!-- Item pictures -->\n        <div class=\"box flex-child-50\">\n            <div class=\"item-pictures\">\n                <div class=\"big-picture mod-picture\">\n                    <div class=\"big-pic-div\">\n                        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture1), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    </div>\n                </div>\n                <div id=\"smallPicsDiv\" class=\"small-pictures horizontal-flex\">\n                    <div class=\"small-pic-div mod-picture current-pic\">\n                        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture1), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    </div>\n                    <div class=\"small-pic-div mod-picture\">\n                        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture2), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    </div>\n                    <div class=\"small-pic-div mod-picture\">\n                        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture3), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    </div>\n                    <div class=\"small-pic-div small-pic-div-last mod-picture\">\n                        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.picture4), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Item fields -->\n        <div id=\"item-info\" class=\"vertical-flex flex-child-50 space-between\">\n            <div class=\"\">\n\n                <div class=\"horizontal-flex flex-center space-between\">\n                    <select id=\"categorySelect\" class=\"item-category\" name=\"category\" disabled=\"disabled\">\n                        ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.categories), {hash:{},inverse:self.noop,fn:self.programWithDepth(11, program11, data, depth0),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    </select>\n                    <img id=\"lock\" src=\"../img/moderation_mode/padlock_closed.png\" alt=\"\" />\n                </div>\n\n                <input type=\"text\" id=\"title\" class=\"item-title\" maxlength=\"20\" disabled=\"disabled\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n\n                <textarea id=\"description\" class=\"item-description\" maxlength=\"160\" disabled=\"disabled\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n\n            </div>\n\n            <div class=\"\">\n\n                <div class=\"horizontal-flex flex-start border-bottom padding-top-10\">\n                    <div class=\"img-icon groups-icon\">\n                        <img src=\"../img/moderation_mode/icon_group.png\" alt=\"\" />\n                    </div>\n                    <div class=\"groups-labels\">\n                        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.showGoupsLabels || (depth0 && depth0.showGoupsLabels)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.groups), options) : helperMissing.call(depth0, "showGoupsLabels", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.groups), options)))
    + "\n                    </div>\n                </div>\n\n                <div class=\"horizontal-flex flex-center space-between border-bottom padding-top-10\">\n                    <div class=\"horizontal-flex flex-center\">\n                        <div class=\"img-icon\">\n                            <img src=\"../img/moderation_mode/icon_price.png\" alt=\"\" />\n                        </div>\n                        <div class=\"item-data\"><b>$";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.roundPrice || (depth0 && depth0.roundPrice)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.price), options) : helperMissing.call(depth0, "roundPrice", ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.price), options)))
    + "</b></div>\n                    </div>\n                    <div class=\"horizontal-flex flex-center\">\n                        <div class=\"img-icon\">\n                            <img src=\"../img/moderation_mode/icon_like_big.png\" alt=\"\" />\n                        </div>\n                        <div class=\"item-data\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.totalOfFollowers)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                    </div>\n                </div>\n\n                <div class=\"horizontal-flex flex-center padding-top-10\">\n                    <div class=\"img-icon\">\n                        <img src=\"../img/moderation_mode/icon_location.png\" alt=\"\" />\n                    </div>\n                    <div class=\"item-data\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.locationName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item)),stack1 == null || stack1 === false ? stack1 : stack1.zipCode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n    <div id=\"itemFooter\" class=\"item-footer\">\n\n        <div class=\"no-yes-buttons horizontal-flex\">\n            <button id=\"noButton\" type=\"button\" class=\"item-mod-button no-button\">NO</button>\n            <button id=\"yesButton\" type=\"button\" class=\"item-mod-button yes-button\">YES</button>\n            <button id=\"saveAndNextButton\" type=\"button\" class=\"item-mod-button save-next-button\">SAVE AND GET NEXT</button>\n        </div>\n        <div class=\"flag-link horizontal-flex space-between\">\n            <div class=\"\">\n                <img id=\"flagApproved\" class=\"flags\" src=\"../img/moderation_mode/flag_approved.png\" alt=\"\" />\n                <img id=\"flagRejected\" class=\"flags\" src=\"../img/moderation_mode/flag_rejected.png\" alt=\"\" />\n            </div>\n            <div id=\"rejectionLabel\"></div>\n            <a id=\"skipLink\" class=\"skip-link\">Skip</a>\n            <a id=\"backLink\" class=\"back-link\">Back</a>\n        </div>\n\n    </div>\n";
  return buffer;
  });

this["JST"]["results.list.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["JST"]["results.list.item.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n        moderated-border\n    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <img class=\"list-img\" src=\"";
  if (stack1 = helpers.pictureUrl1) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.pictureUrl1); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"\" />\n                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <img class=\"list-img\" src=\"";
  if (stack1 = helpers.pictureUrl2) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.pictureUrl2); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"\" />\n                ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <img class=\"list-img\" src=\"";
  if (stack1 = helpers.pictureUrl3) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.pictureUrl3); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"\" />\n                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <img class=\"list-img\" src=\"";
  if (stack1 = helpers.pictureUrl4) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.pictureUrl4); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"\" />\n                ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n            <a id=\"moderateItem\"><img src=\"../img/moderation_mode/bn_moderation_pending.png\" alt=\"\" /></a>\n        ";
  }

function program13(depth0,data) {
  
  
  return "\n            <img src=\"../img/moderation_mode/bn_moderation_approved.png\" alt=\"\" />\n        ";
  }

  buffer += "<div class=\"user-items-element vertical-flex space-between\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.pendingModeration), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <div class=\"\">\n        <div class=\"list-images\">\n            <div id=\"zoom-out-btn\">\n                <img src=\"../img/moderation_mode/back_btn.png\" alt=\"\" />\n            </div>\n            <div class=\"list-image mod-picture\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pictureUrl1), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            <div class=\"list-image mod-picture\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pictureUrl2), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            <div class=\"list-image mod-picture\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pictureUrl3), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            <div class=\"list-image mod-picture\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pictureUrl4), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n        <div class=\"price-likes-list-item horizontal-flex flex-center space-between border-bottom\">\n            <div class=\"item-list-data\"><b>$";
  if (stack1 = helpers.price) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.price); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</b></div>\n            <div class=\"horizontal-flex flex-center\">\n                <div class=\"img-small-icon\">\n                    <img src=\"../img/moderation_mode/icon_like_small.png\" alt=\"\" />\n                </div>\n                <div class=\"item-list-data\">";
  if (stack1 = helpers.totalOfFollowers) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.totalOfFollowers); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n            </div>\n        </div>\n        <div class=\"item-list-title\">\n            <b>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</b>\n        </div>\n    </div>\n    <div class=\"list-buttons horizontal-flex space-between\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.pendingModeration), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <a href=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.url); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\"><img src=\"../img/moderation_mode/bn_link_default.png\" alt=\"\" /></a>\n        <a id=\"deleteItem\"><img src=\"../img/moderation_mode/bn_trash_default.png\" alt=\"\" /></a>\n    </div>\n</div>\n";
  return buffer;
  });

this["JST"]["results.noresults.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"no-results-list\">\n    <p>This user has no other items published</p>\n</div>\n";
  });

this["JST"]["results.layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"modModeEmpty\" class=\"mod-mode-empty\">\n    <h3>Specify records to moderate</h3>\n    <br>\n    <p>\n        Enter a filter above to target specific records or leave all fields empty to moderate items from all available records, then hit <b>Apply</b>. Unmoderated records will appear in queue.\n    </p>\n</div>\n<div class=\"horizontal-flex flex-stretch stretch\">\n    <div id=\"itemRegion\" class=\"item-region white-background\"></div>\n    <div id=\"userItemsList\" class=\"item-list-region white-background\">\n        <div class=\"item-header border-bottom\">\n            <h5><b id=\"totalOfItems\"></b> additional publications from this user</h5>\n        </div>\n        <div id=\"itemListRegion\">\n\n        </div>\n    </div>\n</div>\n";
  });

this["JST"]["notification.center.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4><strong>Target audience</strong></h4>\n<div class=\"form-inline\">\n  <div class=\"form-group\">\n    <p class=\"form-control-static\" for=\"platform\">Send notification to </p>\n  </div>\n  <div class=\"form-group\">\n    <select class=\"form-control\" id=\"platform\">\n      <option value=\"default\" selected disabled><i>Select...</i></option>\n      <option value=\"other\">All users</option>\n      <option value=\"android\">Android users</option>\n      <option value=\"ios\">iOS users</option>\n    </select>\n  </div>\n  <div class=\"session-form\">\n    <p class=\"form-control-static\" for=\"sessionStatus\">Session status </p>\n    <select class=\"form-control\" id=\"sessionStatus\" disabled=\"disabled\">\n      <option value=\"default\" selected disabled><i>Select...</i></option>\n      <option value=\"active_session\">Logged in</option>\n      <option value=\"inactive_session\">Logged out</option>\n      <option value=\"with_session\">Logged in & logged out</option>\n      <option value=\"no_session\">Device id only</option>\n    </select>\n  </div>\n</div>\n<div id=\"filter\" class=\"filter\">\n  <p id=\"addFilterText\"><img id=\"filterImg\" src=\"../img/icon_add_filter_disabled.png\" /> Add filter</p>\n</div>\n<div id=\"filterUser\" class=\"filter-user\">\n  <p>Filter users by:</p>\n  <ul id=\"listCondition\" class=\"list-condicion\">\n  </ul>\n  <p id=\"addCondition\" class=\"add-condition\"><img src=\"../img/icon_add_filter_default.png\" /> Add condition</p>\n</div>\n";
  });

this["JST"]["notification.layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"page-header\">\n    <h3 class=\"title\">Send Notifications</h3>\n</div>\n<div id=\"resultsRegion\" class=\"full-height\">\n	<div class=\"row  notification\">\n        <div class=\"blackout-80\"></div>\n		<div id=\"leftRegion\" class=\"col-md-4\">\n		</div>\n\n	    <div id=\"centerRegion\" class=\"col-md-4 center-region control-group\">\n	    </div>\n\n	    <div id=\"rightRegion\" class=\"col-md-4\">\n	    </div>\n	</div>\n</div>\n";
  });

this["JST"]["notification.left.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4><strong>Message</strong></h4>\n<div class=\"form-group\">\n	<p class=\"text-left\">Content</p>\n	<textarea class=\"form-control\" id=\"notificationMessage\" placeholder=\"Enter push notification message\"></textarea>\n	<div id=\"textarea_feedback\" class=\"chars-left\">100</div>\n	<div class=\"checkbox\">\n		<input id=\"onlyPush\" type=\"checkbox\" />\n    	<label for=\"onlyPush\">Send also as Feed Notification</label>\n	  </div>\n</div>\n";
  });

this["JST"]["notification.right.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4><strong>Schedule</strong></h4>\n<div id=\"optionSchedule\">\n	<div class=\"radio\">\n		<input type=\"radio\" id=\"radioNow\" name=\"optionsRadios\" value=\"option1\" />\n		<label for=\"radioNow\">Send notification immediately</label>\n	</div>\n	<div class=\"radio\" style=\"display:none\">\n		<input type=\"radio\" name=\"optionsRadios\" value=\"option2\" />\n		<label for=\"\">Set specific day and time...</label>\n	</div>\n</div>\n<div class=\"push-status\">\n	<section id=\"receiversSection\" class=\"message-text\">\n	    <p id=\"titleReceivers\" class=\"title-push\">Send push notification to</p>\n	    <p id=\"loading\" class=\"title-push loading\">\n            <img src=\"../img/ajax-loader.gif\" />\n            loading...\n        </p>\n	    <p id=\"infoUsersSend\">\n            <span id=\"numberUsers\" class=\"number-users\"></span>\n            <span id=\"toUsers\"></span>\n        </p>\n	</section>\n	<section id=\"whenSection\" class=\"message-text\">\n        <p class=\"title-push\">When</p>\n        <p id=\"scheduleText\" class=\"schedule-text\">Schedule</p>\n	</section>\n    <section id=\"infoSection\" class=\"message-text\">\n        <p id=\"fieldsToComplete\" class=\"fields-to-complete title-push\"></p>\n    </section>\n    <section id=\"errorSection\" class=\"center-align message-text\">\n        <img src=\"../img/icon_exclamation_point.png\" />\n        <span id=\"errorMessage\" class=\"title-push\"></span>\n    </section>\n	<section id=\"sendButtonsSection\" class=\"message-text\">\n		<p id=\"sending\" class=\"title-push loading\">\n            <img src=\"../img/ajax-loader.gif\" />\n            sending...\n        </p>\n        <!-- TODO  toggle con la clase 'save' para cambiar el estilo del boton al de save-->\n        <div class=\"button-center\">\n            <button\n                type=\"submit\"\n                id=\"sendDataButton\"\n                class=\"btn btn-default btn-lg\"\n                disabled=\"disabled\">\n                Confirm & Send\n            </button>\n        </div>\n	</section>\n	<section id=\"successSection\" class=\"message-text success-sent\">\n		<p class=\"done\">\n            <img src=\"../img/icon_green_check.png\" />\n            Done!\n        </p>\n		<p id=\"message1\">Mensaje de exito 1</p>\n		<p id=\"message2\">Mensaje de exito 2</p>\n	</section>\n    <section id=\"newNotificationSection\" class=\"message-text\">\n        <a id=\"newNotification\">Create New Notification</a>\n    </section>\n</div>\n";
  });

this["JST"]["pagination.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\r\n    <button type=\"button\" class=\"js-changePage btn btn-default ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth1 && depth1.ifCond)),stack1 ? stack1.call(depth0, (depth1 && depth1.selectPage), depth0, options) : helperMissing.call(depth0, "ifCond", (depth1 && depth1.selectPage), depth0, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\" data-page=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</button>\r\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

  buffer += "<div class=\"pull-left counter\">\r\n  Showing\r\n  <span class=\"label label-warning\">";
  if (stack1 = helpers.viewElements) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.viewElements); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> of\r\n  <span class=\"label label-warning\">";
  if (stack1 = helpers.totalRecords) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.totalRecords); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n  items found\r\n</div>\r\n<div class=\"btn-group\">\r\n  <button type=\"button\" class=\"js-showFirstPage btn btn-default\">First</button>\r\n  <button type=\"button\" class=\"js-previewPage btn btn-default\">Preview</button>\r\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.arrPages), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  <button type=\"button\" class=\"js-nextPage btn btn-default\">Next</button>\r\n  <button type=\"button\" class=\"js-showLastPage btn btn-default\">Last</button>\r\n</div>";
  return buffer;
  });

this["JST"]["product.layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"filtersRegion\" class=\"filters full-height\">\n  <!-- FILTER SECTION -->\n</div>\n<div class=\"page-header\">\n  <h3 class=\"title\">Results<small></small></h3>\n</div>\n<div id=\"resultsRegion\" class=\"results full-height\">\n  <!-- RESULTS SECTION -->\n</div>\n<div id=\"paginationRegion\" class=\"pagination\">\n  <!-- PAGINATION SECTION -->\n</div>\n";
  });

this["JST"]["noresults.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<span class=\"glyphicon glyphicon-info-sign\"></span>\n<span>No matches found...</span>";
  });

this["JST"]["product.item.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"product-thumbnail show js-showImagePreview\">\r\n          <img src=\"";
  if (stack1 = helpers.picture1Url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.picture1Url); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n        </div>\r\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n        <div class=\"product-thumbnail show\">\r\n          <img src=\"img/img_placeholder.png\"/>\r\n        </div>\r\n      ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"product-thumbnail show js-showImagePreview\">\r\n          <img src=\"";
  if (stack1 = helpers.picture2Url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.picture2Url); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n        </div>\r\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"product-thumbnail show js-showImagePreview\">\r\n          <img src=\"";
  if (stack1 = helpers.picture3Url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.picture3Url); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n        </div>\r\n      ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <div class=\"product-thumbnail show js-showImagePreview\">\r\n          <img src=\"";
  if (stack1 = helpers.picture4Url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.picture4Url); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n        </div>\r\n      ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\r\n      <button class=\"js-approveItem tooltiped btn btn-default\"\r\n              data-toggle=\"tooltip\"\r\n              data-placement=\"top\"\r\n              title=\"Approve\">\r\n        <span class=\"glyphicon glyphicon-ok\"></span>\r\n      </button>\r\n    ";
  }

  buffer += "<td class=\"first\">";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (stack1 = helpers.publishedBy) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.publishedBy); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>\r\n  <div class=\"product-images-grid\">\r\n    <div class=\"row\">\r\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture1Url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture2Url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <div class=\"row\">\r\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture3Url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture4Url), {hash:{},inverse:self.program(3, program3, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n  </div>\r\n</td>\r\n\r\n<td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n\r\n<td>\r\n  <p class=\"description\">\r\n    ";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.description); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n  </p>\r\n</td>\r\n\r\n<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.parseDate || (depth0 && depth0.parseDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.publishDate), options) : helperMissing.call(depth0, "parseDate", (depth0 && depth0.publishDate), options)))
    + "</td>\r\n<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.parseDate || (depth0 && depth0.parseDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.lastModificationDate), options) : helperMissing.call(depth0, "parseDate", (depth0 && depth0.lastModificationDate), options)))
    + "</td>\r\n<td>\r\n    <span class=\"label ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toLowerCase || (depth0 && depth0.toLowerCase)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), options) : helperMissing.call(depth0, "toLowerCase", (depth0 && depth0.status), options)))
    + "\">";
  if (stack2 = helpers.status) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.status); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\r\n</td>\r\n\r\n<td>";
  if (stack2 = helpers.countOfReports) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.countOfReports); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\r\n<td class=\"actions\">\r\n  <div class=\"btn-group\">\r\n    <button class=\"js-removeItem tooltiped btn btn-default\"\r\n            data-toggle=\"tooltip\"\r\n            data-placement=\"top\"\r\n            title=\"Remove\">\r\n      <span class=\"glyphicon glyphicon-remove\"></span>\r\n    </button>\r\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth0 && depth0.ifCond)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), "PENDING", options) : helperMissing.call(depth0, "ifCond", (depth0 && depth0.status), "PENDING", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n    <a class=\"tooltiped btn btn-default\"\r\n       title=\"See item page\" href=\"";
  if (stack2 = helpers.url) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.url); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" target=\"_blank\">\r\n      <span class=\"glyphicon glyphicon-move\"></span>\r\n    </a>\r\n    <a class=\"tooltiped btn btn-default\"\r\n       title=\"Send email\" href=\"mailTo:";
  if (stack2 = helpers.email) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.email); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\r\n      <span class=\"glyphicon glyphicon-envelope\"></span>\r\n    </a>\r\n  </div>\r\n</td>\r\n";
  return buffer;
  });

this["JST"]["product.list.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<thead>\n  <tr>\n    <th class=\"first\">#</th>\n    <th>Owner</th>\n    <th>Image</th>\n    <th>Item Name</th>\n    <th>Description</th>\n    <th>Published</th>\n    <th>Last modification Date</th>\n    <th>Status</th>\n    <th>Flags</th>\n    <th>Actions</th>\n  </tr>\n</thead>\n<tbody id=\"resultsBodyRegion\">\n\n</tbody>";
  });

this["JST"]["user.layout.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"page-header\">\n  <h3 class=\"title\">Users<small></small></h3>\n</div>\n<div id=\"filtersRegion\" class=\"filters full-height\">\n  <!-- FILTER SECTION -->\n</div>\n<div id=\"resultsRegion\" class=\"results full-height\">\n  <!-- RESULTS SECTION -->\n</div>\n<div id=\"paginationRegion\" class=\"pagination\">\n  <!-- PAGINATION SECTION -->\n</div>\n";
  });

this["JST"]["noresults.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<span class=\"glyphicon glyphicon-info-sign\"></span>\n<span>No matches found...</span>";
  });

this["JST"]["user.item.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <img src=\"";
  if (stack1 = helpers.picture) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.picture); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n        <img src=\"img/picPlaceholder.png\"/>\r\n      ";
  }

function program5(depth0,data) {
  
  
  return " active ";
  }

function program7(depth0,data) {
  
  
  return " banned ";
  }

function program9(depth0,data) {
  
  
  return " YES ";
  }

function program11(depth0,data) {
  
  
  return " NO ";
  }

function program13(depth0,data) {
  
  
  return "\r\n      <button class=\"js-banUser tooltiped btn btn-default\"\r\n              data-toggle=\"tooltip\"\r\n              data-placement=\"top\"\r\n              title=\"Ban\">\r\n        <span class=\"glyphicon glyphicon-remove\"></span>\r\n      </button>\r\n    ";
  }

function program15(depth0,data) {
  
  
  return "\r\n      <button class=\"js-activateUser tooltiped btn btn-default\"\r\n              data-toggle=\"tooltip\"\r\n              data-placement=\"top\"\r\n              title=\"Activate\">\r\n        <span class=\"glyphicon glyphicon-ok\"></span>\r\n      </button>\r\n    ";
  }

function program17(depth0,data) {
  
  
  return "\r\n      <button class=\"js-resetPassword tooltiped btn btn-default\"\r\n              data-toggle=\"tooltip\"\r\n              data-placement=\"top\"\r\n              title=\"Unlock\">\r\n        <span class=\"glyphicon glyphicon-ok\"></span>\r\n      </button>\r\n    ";
  }

  buffer += "<td class=\"first\">";
  if (stack1 = helpers.userId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.userId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.username); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n<td>\r\n  <div class=\"user-pic small\">\r\n    <label class=\"edit-pic\">\r\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.picture), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </label>\r\n  </div>\r\n</td>\r\n<td>";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n\r\n<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.parseDate || (depth0 && depth0.parseDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.registrationDate), options) : helperMissing.call(depth0, "parseDate", (depth0 && depth0.registrationDate), options)))
    + "</td>\r\n<td>\r\n    <span class=\"label ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.toLowerCase || (depth0 && depth0.toLowerCase)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), options) : helperMissing.call(depth0, "toLowerCase", (depth0 && depth0.status), options)))
    + "\">";
  if (stack2 = helpers.status) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.status); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\r\n</td>\r\n<td>\r\n    <span class=\"label ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.userVerified), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  stack2 = helpers.unless.call(depth0, (depth0 && depth0.userVerified), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.userVerified), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  stack2 = helpers.unless.call(depth0, (depth0 && depth0.userVerified), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</span>\r\n</td>\r\n<td class=\"actions\">\r\n  <div class=\"btn-group\">\r\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth0 && depth0.ifCond)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), "ACTIVE", options) : helperMissing.call(depth0, "ifCond", (depth0 && depth0.status), "ACTIVE", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth0 && depth0.ifCond)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), "BANNED", options) : helperMissing.call(depth0, "ifCond", (depth0 && depth0.status), "BANNED", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth0 && depth0.ifCond)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), "LOCKED", options) : helperMissing.call(depth0, "ifCond", (depth0 && depth0.status), "LOCKED", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n    <button class=\"js-seeProfile tooltiped btn btn-default\"\r\n            title=\"See user profile\">\r\n      <span class=\"glyphicon glyphicon-move\"></span>\r\n    </button>\r\n    <a class=\"tooltiped btn btn-default\"\r\n       title=\"Send email\" href=\"mailTo:";
  if (stack2 = helpers.email) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.email); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\r\n      <span class=\"glyphicon glyphicon-envelope\"></span>\r\n    </a>\r\n  </div>\r\n</td>\r\n";
  return buffer;
  });

this["JST"]["user.list.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<thead>\n  <tr>\n    <th class=\"first\">#</th>\n    <th>Username</th>\n    <th>Image</th>\n    <th>Email</th>\n    <th>Registration</th>\n    <th>Status</th>\n    <th>Verified</th>\n    <th>Actions</th>\n  </tr>\n</thead>\n<tbody id=\"resultsBodyRegion\">\n\n</tbody>";
  });

return this["JST"];

});