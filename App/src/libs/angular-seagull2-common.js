(function (window, angular) {
    'use strict';

    var $configureProvider = [function () {

        var innnerConfig = {
            common: {
            }
        },
            extend = function (to, from, isDeep) {
                for (var key in from) {
                    if (!from.hasOwnProperty(key)) {
                        continue;
                    }
                    if (!isDeep || !(angular.isArray(from[key]) || angular.isObject(from[key]))) {
                        to[key] = from[key];
                        continue;
                    }
                    if (!to[key] && angular.isArray(from[key])) {
                        to[key] = [];
                    }
                    if (!to[key] && angular.isObject(from[key])) {
                        to[key] = {};
                    }
                    extend(to[key], from[key], isDeep);
                }
                return to;
            },
            deepExtend = function (dst) {
                for (var i = 0; i < arguments.length; i++) {
                    if (i === 0)
                        continue;

                    var src = arguments[i];
                    if (src) {
                        extend(dst, src, true);
                    }
                }
                return dst;
            };

        this.configure = function (config) {
            if (angular.isString(config)) {
                config = angular.fromJson(config);
            }
            deepExtend(innnerConfig, config);
        };

        this.$get = [function () {
            var service = {};
            service.getConfig = function () {
                if (arguments.length === 0) {
                    return innnerConfig;
                }

                var dst;
                var name;

                if (arguments.length == 1) {
                    dst = {};
                    name = arguments[0];
                } else {
                    dst = arguments[0];
                    name = arguments[1];
                }

                deepExtend(dst, innnerConfig.common);
                return deepExtend(dst, innnerConfig[name]);
            };
            service.deepExtend = deepExtend;

            return service;
        }];
    }],
        angularModule = angular.module('angular-seagull2-common.configure', []);
    angularModule.provider('configure', $configureProvider);
})(window, window.angular);

angular.module('angular-seagull2-common.templates', ['src/template/bad-request-dialog-template.html', 'src/template/complex-input-select-modal-template-th.html', 'src/template/complex-input-select-modal-template-tr.html', 'src/template/complex-input-select-modal-template.html', 'src/template/complex-input-tag-template.html', 'src/template/complex-input-template.html', 'src/template/error-dialog-template.html', 'src/template/error-page-template.html', 'src/template/not-found-template.html', 'src/template/selector-modal-template.html', 'src/template/selector-tree-node-template.html', 'src/template/tags-input-template.html', 'src/template/time-template.html', 'src/template/tree-template.html']);

angular.module("src/template/bad-request-dialog-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/bad-request-dialog-template.html",
    "<div class=\"error\">\n" +
    "    <div class=\"error-body font-white\" style=\"word-break: break-all; word-wrap: break-word;\">{{message}}</div>\n" +
    "    <div class=\"error-body font-white\" style=\"word-break: break-all; word-wrap: break-word;\">{{exceptionMessage}}</div>\n" +
    "\n" +
    "</div>\n" +
    "<div id=\"information\" class=\"modal-body\" ng-if=\"innerList.length\">\n" +
    "    <!--<div class=\"information-header clearfix\">\n" +
    "        <div class=\"information-title pull-left\">\n" +
    "            <div class=\"error-message\">\n" +
    "                明细\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>-->\n" +
    "    <div id=\"content\" class=\"information-body\">\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th>类别</th>\n" +
    "                    <th>消息</th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"m in innerList\">\n" +
    "                    <td>{{m.key}}</td>\n" +
    "                    <td>\n" +
    "                        <div ng-repeat=\"m in m.messages track by $index\">\n" +
    "                            <span>{{m}}</span>\n" +
    "                        </div>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"confirm(true)\">关闭</button>\n" +
    "</div>");
}]);

angular.module("src/template/complex-input-select-modal-template-th.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/complex-input-select-modal-template-th.html",
    "<div style=\"display: inline-block;padding: 5px;float: left;width: 50%;cursor: pointer;\">\n" +
    "    名称</div>\n" +
    "<div style=\"display: inline-block;padding: 5px;float: left;width: 50%;cursor: pointer;\">\n" +
    "    说明</div>");
}]);

angular.module("src/template/complex-input-select-modal-template-tr.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/complex-input-select-modal-template-tr.html",
    "<div style=\"display: inline-block;padding: 5px;float: left;width: 50%;cursor: pointer;\">\n" +
    "    <span>{{item.displayName}}</span>\n" +
    "</div>\n" +
    "<div style=\"display: inline-block;padding: 5px;float: left;width: 50%;cursor: pointer;\">\n" +
    "    <span>{{item.comment}}</span>\n" +
    "</div>");
}]);

angular.module("src/template/complex-input-select-modal-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/complex-input-select-modal-template.html",
    "<div class=\"modal-body\">\n" +
    "    <div class=\"table-responsive\">\n" +
    "        <div class=\"table table-hover table-striped\">          \n" +
    "                <div class=\"clearfix\" style=\"font-weight: bold;width:100%;border-bottom: 1px solid #ddd\" ng-include=\"opts.tableHeadTemplateUrl\"></div>\n" +
    "            \n" +
    "                <div style=\"border-bottom: 1px solid #ddd;width:100%\" class=\"pitch-on-td clearfix table-striped-div\"  ng-include=\"opts.tableRowTemplateUrl\"  ng-click=\"rowItemClick(this)\" ng-repeat=\"item in candidates\" ng-class=\"{ 'info' : item === selected }\">\n" +
    "             \n" +
    "                </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"cancel()\">取消</button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"confirm(selected)\">确定</button>\n" +
    "</div>");
}]);

angular.module("src/template/complex-input-tag-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/complex-input-tag-template.html",
    "<span>{{item.displayName || data.displayName}}</span>");
}]);

angular.module("src/template/complex-input-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/complex-input-template.html",
    "<div class=\"seagull2-users clearfix\">\n" +
    "    <div sog-tags-input=\"data\" input-text=\"inputText\" sog-tags-inputText=\"inputText\" sog-tags-input-opts=\"tagsOpts\">\n" +
    "    </div>\n" +
    "    <div class=\"floatLeft\">\n" +
    "        <ol class=\"ol-ico\">\n" +
    "            <!--<li style=\"cursor: pointer;\"><a class=\"glyphicon glyphicon-copy\" title=\"复制\"></a></li>-->\n" +
    "            <li ng-show=\"checking\">\n" +
    "                <a class=\"seagull2-tags-input-loading\"></a>\n" +
    "            </li>\n" +
    "            <li style=\"cursor: pointer;\" ng-show=\"!checking\">                \n" +
    "                <a class=\"glyphicon glyphicon-check\" ng-click=\"checkInput()\" title=\"检查\" ng-if=\"opts.multiple||(!opts.multiple&&!dataHasValue)\"></a>\n" +
    "            </li>\n" +
    "            <li ng-if=opts.showSelector style=\"cursor: pointer;\">\n" +
    "                <a sog-selector=\"_selectorModel\" opts=\"selectorOpts\"></a>\n" +
    "            </li>\n" +
    "        </ol>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/template/error-dialog-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/error-dialog-template.html",
    "<div style=\"padding: 11px 15px;\" class=\"modal-body error-box-abc\">\n" +
    "    <!--<div class=\"error-dialog-fzf\">\n" +
    "        <div class=\"error-img-box-pc\">\n" +
    "            <img src=\"../../images/error-dialog.png\" alt=\"404\" class=\"error-img-dialog\">\n" +
    "        </div>\n" +
    "        <div class=\"error-img-box\">\n" +
    "            <img src=\"../../images/dialog-error1.gif\" alt=\"404\" class=\"error-img-dialog-a\">\n" +
    "        </div>\n" +
    "    </div>-->\n" +
    "    <div class=\"error-box-background\">\n" +
    "        <div class=\"error-header-pc\">\n" +
    "            <div style=\"font-size: 17px;padding-bottom: 4px;\" class=\"error-title error-title-div text-left\">\n" +
    "                抱歉，您访问的页面暂时无法打开\n" +
    "            </div>\n" +
    "            <p style=\"line-height: 26px;\" class=\"error-title error-title-p text-left\">\n" +
    "                您可以：\n" +
    "            </p>\n" +
    "            <ul style=\"line-height: 22px;\" class=\"error-title error-title-ul text-left\">\n" +
    "                <li>关闭并尝试重新打开页面，通常可以解决<span style=\"color: Orange\">电脑本身引起的问题</span></li>\n" +
    "                <li>稍后再尝试重新打开页面，通常可以解决<span style=\"color: Orange\">网络原因引起的问题</span></li>\n" +
    "                <li>通过下方按钮联系客服人员为您解决，通常可以解决<span style=\"color: Orange\">全部问题</span></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"error-header\">\n" +
    "            <div style=\"font-size: 17px;padding-bottom: 4px;\" class=\"error-title error-title-div text-left\">\n" +
    "                抱歉，您访问的页面暂时无法打开\n" +
    "            </div>\n" +
    "            <p style=\"line-height: 26px;\" class=\"error-title error-title-p text-left\">\n" +
    "                您可以：\n" +
    "            </p>\n" +
    "            <ul style=\"line-height: 22px;\" class=\"error-title error-title-ul text-left\">\n" +
    "                <li>关闭并尝试重新打开页面</li>\n" +
    "                <li>稍后再尝试重新打开页面</li>\n" +
    "                <li>通过下方按钮联系客服人员为您解决</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"error-body font-white\">\n" +
    "            <span class=\"label label-danger error-message-box error-message-dialog\" ng-if=\"message\">{{message}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"custom-service clearfix\">\n" +
    "        <div class=\"custom-email text-center\">\n" +
    "            <a class=\"custom-email-a custom-email-dialog\" ng-href=\"mailto:{{customer.customerMail}}?subject={{customer.subject}}&body={{mailBody}}\">\n" +
    "                <span class=\"glyphicon glyphicon-envelope mail-font\"></span>\n" +
    "                <span>邮件客服</span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <p class=\"font-prompt text-right font-prompt-font\">\n" +
    "        温馨提示：点击复制错误信息,然后发送给客服人员！\n" +
    "    </p>\n" +
    "    <div id=\"information\" class=\"information\">\n" +
    "        <div class=\"information-header clearfix\">\n" +
    "            <input type=\"text\" readonly style=\"width: 7px; height: 7px; border: 0; color: white;position: absolute;left: -200px;\" id=\"copyErrorMessageInput\"\n" +
    "                class=\"copyErrorMessageInputClass\" value=\"{{copiedContent}}\" />\n" +
    "            <div class=\"information-footer\" ng-show=\"stackTrace || innerList.length || exceptionMessage\">\n" +
    "                <a style=\"font-size: 12px;\" class=\"information-footer-a-box\">点击详细信息</a>\n" +
    "            </div>\n" +
    "            <a ng-click=\"copyMessage()\" class=\"pull-right copy-message\">点击复制信息</a>\n" +
    "        </div>\n" +
    "        <pre id=\"content\" class=\"information-body\" ng-show=\"showInformation\">\n" +
    "            <div ng-if=\"exceptionMessage\" class=\"error-message-box-tow\">{{exceptionMessage}}</div>\n" +
    "            <div ng-if=\"innerList.length\">\n" +
    "                <table class=\"table table-hover\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th>类别</th>\n" +
    "                            <th>消息</th>\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                        <tr ng-repeat=\"m in innerList\">\n" +
    "                            <td>{{m.key}}</td>\n" +
    "                            <td>\n" +
    "                                <div ng-repeat=\"m in m.messages track by $index\">\n" +
    "                                    <span>{{m}}</span>\n" +
    "                                </div>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "            <div ng-if=\"stackTrace\">{{stackTrace}}</div>\n" +
    "        </pre>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"confirm(true)\">关闭</button>\n" +
    "</div>");
}]);

angular.module("src/template/error-page-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/error-page-template.html",
    "<div class=\"error-box-abc\">\n" +
    "    <div class=\"error-error-fzf\">\n" +
    "            <img src=\"../../images/errorPC.png\" alt=\"404\" class=\"error-img-pc\">\n" +
    "            <img src=\"../../images/error.gif\" alt=\"404\" class=\"error-img-move\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"error\">\n" +
    "        <div class=\"error-header-pc\">\n" +
    "            <div class=\"error-title error-title-div text-left\">\n" +
    "                抱歉，您访问的页面暂时无法打开\n" +
    "            </div>\n" +
    "            <p style=\"padding: 8px 0 4px 0;\" class=\"error-title error-title-p text-left\">\n" +
    "                您可以：\n" +
    "            </p>\n" +
    "            <ul class=\"error-title error-title-ul text-left\">\n" +
    "                <li>关闭并尝试重新打开页面，通常可以解决<span style=\"color: Orange\">电脑本身引起的问题</span></li>\n" +
    "                <li>稍后再尝试重新打开页面，通常可以解决<span style=\"color: Orange\">网络原因引起的问题</span></li>\n" +
    "                <li>通过下方按钮联系客服人员为您解决，通常可以解决<span style=\"color: Orange\">全部问题</span></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div class=\"error-header\">\n" +
    "            <div class=\"error-title error-title-div text-left\">\n" +
    "                出错了\n" +
    "            </div>\n" +
    "            <p style=\"padding: 8px 0 4px 0;\" class=\"error-title error-title-p text-left\">\n" +
    "                您可以：\n" +
    "            </p>\n" +
    "            <ul class=\"error-title error-title-ul text-left\">\n" +
    "                <li>关闭并尝试重新打开页面</li>\n" +
    "                <li>稍后再尝试重新打开页面</li>\n" +
    "                <li>通过下方按钮联系客服人员为您解决</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div class=\"error-body font-white\">\n" +
    "            <span class=\"label label-danger error-message-box\" ng-if=\"exception.message\">{{exception.message}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"custom-service clearfix\">\n" +
    "        <div class=\"custom-email text-center\">\n" +
    "            <a class=\"custom-email-a\" ng-href=\"mailto:{{customer.customerMail}}?subject={{customer.subject}}&body={{mailBody}}\">\n" +
    "                <span class=\"glyphicon glyphicon-envelope mail-font\"></span>\n" +
    "                <span>邮件客服</span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <p class=\"font-prompt text-right text-box-btn font-prompt-font\">\n" +
    "        温馨提示：点击复制错误信息,然后发送给客服人员！\n" +
    "    </p>\n" +
    "\n" +
    "    <div id=\"information\" class=\"information text-box-btn\">\n" +
    "        <div class=\"information-header clearfix\">\n" +
    "            <input type=\"text\" readonly style=\"width: 7px; height: 7px; border: 0; color: white;position: absolute;left: -200px;\" id=\"copyErrorMessageInput\"\n" +
    "                class=\"copyErrorMessageInputClass\" value=\"{{copiedContent}}\" />\n" +
    "            <div class=\"information-footer\" ng-show=\"exception.stackTrace || exception.innerList.length || exception.exceptionMessage\">\n" +
    "                <a style=\"font-size: 12px;\" class=\"information-footer-a-box\">点击详细信息</a>\n" +
    "            </div>\n" +
    "            <a ng-click=\"copyMessage()\" class=\"pull-right copy-message\">点击复制信息</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"information-footer-none clearfix\" ng-show=\"exception.stackTrace || exception.innerList.length || exception.exceptionMessage\">\n" +
    "        <div style=\"text-align: right;\">\n" +
    "            <a style=\"font-size: 12px;\" class=\"information-footer-a-box\">详细信息?</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <pre id=\"content\" class=\"information-body\" ng-show=\"showInformation\">\n" +
    "        <div ng-if=\"exception.exceptionMessage\" class=\"error-message-box-tow\">{{exception.exceptionMessage}}</div>\n" +
    "        <div ng-if=\"exception.innerList.length\">\n" +
    "            <table class=\"table table-hover\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th>类别</th>\n" +
    "                        <th>消息</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"m in exception.innerList\">\n" +
    "                        <td>{{m.key}}</td>\n" +
    "                        <td>\n" +
    "                            <div ng-repeat=\"m in m.messages track by $index\">\n" +
    "                                <span>{{m}}</span>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "        <div>{{exception.stackTrace}}</div>\n" +
    "    </pre>\n" +
    "</div>");
}]);

angular.module("src/template/not-found-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/not-found-template.html",
    "<div class=\"error-box-cba\">\n" +
    "    <div class=\"error-fzf\">\n" +
    "        <div>\n" +
    "            <img src=\"../../images/404.gif\" alt=\"404\" class=\"img-move\">\n" +
    "            <img src=\"../../images/404PC.png\" alt=\"404\" class=\"img-pc\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"error-message-box\">\n" +
    "        <div class=\"error-font-size\">抱歉，找不到文件或目录...</div>\n" +
    "        <div style=\"padding: 8px 0 4px 0;\">可能原因：</div>\n" +
    "        <ul style=\"list-style-type: none; padding-left: 15px;\">\n" +
    "            <li style=\"list-style-type: disc;\">您要查找的资源可能已被删除，已更改名称或者暂时不可用。</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--<div class=\"error-box-to\">\n" +
    "        <div class=\"error-btn-box\">返回首页</div>\n" +
    "    </div>-->\n" +
    "</div>");
}]);

angular.module("src/template/selector-modal-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/selector-modal-template.html",
    "<div class=\"modal-body\">\n" +
    "    <span wf-tree tree-opts='treeOpts' tree-model=\"selectorModel\"></span>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"cancel()\">取消</button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"confirm(getSelcted())\">确定</button>\n" +
    "</div>");
}]);

angular.module("src/template/selector-tree-node-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/selector-tree-node-template.html",
    "<span title=\"{{node.displayName}}\">\n" +
    "    {{node.displayName}}\n" +
    "</span>");
}]);

angular.module("src/template/tags-input-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/tags-input-template.html",
    "<label class=\"seagull2-tags-input floatInput invalid-failed-element\">    \n" +
    "    <div class=\"seagull2-tags-input-list\">\n" +
    "        <ul style=\"padding-left: 0\" class=\"list-inline\" ng-if=\"opts.multiple\">\n" +
    "            <li ng-repeat=\"item in data track by $index\" class=\"bg-info\" ng-class=\"{ 'bg-danger': selectIndex ===  $index }\">            \n" +
    "                <span sog-tags-input-template=\"tagTemplate\" sog-tags-input-template-model=\"item\" template-url=\"opts.tagItemTemplateUrl\"></span>              \n" +
    "                <span class=\"close\" ng-click=\"remove(item)\" ng-show=\"!readOnly\">&times;</span>\n" +
    "             </li>\n" +
    "        </ul>\n" +
    "        <ul style=\"padding-left: 0\" class=\"list-inline\" ng-if=\"!opts.multiple\">\n" +
    "            <li class=\"bg-info\" ng-show=\"!readOnly&&dataHasValue\">\n" +
    "                <span sog-tags-input-template=\"tagTemplate\" sog-tags-input-template-model=\"data\" template-url=\"opts.tagItemTemplateUrl\"></span>\n" +
    "                <span class=\"close\" ng-click=\"remove(data)\" ng-show=\"!readOnly\">&times;</span>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <input type=\"text\" ng-keydown=\"keydown($event)\" ng-model=\"inputText\" class=\"form-control user-selector-a\" ng-show=\"!readOnly&&(opts.multiple||!dataHasValue)\" />\n" +
    "</label>");
}]);

angular.module("src/template/time-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/time-template.html",
    "<div class=\"clearfix time-control\">\n" +
    "    <div class=\"modal-body\">\n" +
    "        <ul>\n" +
    "            <!--<li style=\"cursor: pointer;\"><a class=\"glyphicon glyphicon-copy\" title=\"复制\"></a></li>-->\n" +
    "            <li ng-repeat=\"item in timesource\"><div ng-click=\"select(item)\"> {{item| date:'HH:mm'}}</div></li>           \n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"closeThisDialog()\">关闭</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"clear()\">清除</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("src/template/tree-template.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("src/template/tree-template.html",
    "<div class=\"tree-box\">\n" +
    "    <script type=\"text/ng-template\" id=\"tree_node_content.html\">\n" +
    "        <span>\n" +
    "            {{node.displayName}}\n" +
    "        </span>\n" +
    "    </script>\n" +
    "\n" +
    "    <script type=\"text/ng-template\" id=\"nodes_renderer.html\">\n" +
    "        <div>\n" +
    "            <a ng-if=\"!node.isTopNode\" class=\"dotted-line\"></a>\n" +
    "            <!--展开关闭加减号 -->\n" +
    "            <a class=\"toggle-container-line\" ng-if=\"!((node.children && node.children.length>0) || node.hasChildren)\">\n" +
    "            </a>\n" +
    "            <a class=\"toggle-container\" ng-if=\"((node.children && node.children.length>0) || node.hasChildren)\" ng-click=\"toggleNode(this)\">\n" +
    "                <span class=\"glyphicon\"\n" +
    "                      ng-class=\"{\n" +
    "                    'glyphicon glyphicon-plus': collapsed,\n" +
    "                    'glyphicon glyphicon-minus': !collapsed\n" +
    "                }\">\n" +
    "                </span>\n" +
    "                <!--展开关闭文件夹-->\n" +
    "                <span ng-class=\"{\n" +
    "                    'glyphicon folder glyphicon-folder-close': collapsed,\n" +
    "                    'glyphicon folder glyphicon-folder-open': !collapsed\n" +
    "                }\">\n" +
    "                </span>\n" +
    "            </a>\n" +
    "            <label ng-class=\"{'node-selected':(node.selected&&opts.showCheckboxes),'node-single-selected':(node.selected&&!opts.showCheckboxes)}\">\n" +
    "                <input ng-if=\"opts.showCheckboxes && node.checkedable\" type=\"checkbox\" ng-model=\"node.checked\" ng-change=\"_checkedChanged(this)\"/>\n" +
    "                <span style=\"cursor:pointer\" ng-click=\"_nodeClick(this)\"\n" +
    "                      title=\"{{node.title}}\"\n" +
    "                      ng-include=\"opts.nodeContentTemplateId\">\n" +
    "                </span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div ui-tree-nodes ng-model=\"node.children\" ng-class=\"{hidden: collapsed}\">\n" +
    "            <div ng-repeat=\"node in node.children\" ui-tree-node data-collapsed=\"!node.expanded\" ng-include=\"'nodes_renderer.html'\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!--加载中图标-->\n" +
    "        <div ng-if=\"node.loadingSub\" class=\"waiting\">\n" +
    "            <span class=\"upload-personnel-box\"></span>\n" +
    "            <span>加载中...</span>\n" +
    "        </div>\n" +
    "\n" +
    "    </script>\n" +
    "\n" +
    "\n" +
    "    <!--加载根目录时候的等待图标-->\n" +
    "    <div ng-if=\"loadingRoot\" class=\"waiting\">\n" +
    "        <span class=\"upload-personnel-box\"></span>\n" +
    "        <span>加载中...</span>\n" +
    "    </div>\n" +
    "    <div ui-tree ng-show=\"!loadingRoot\">\n" +
    "        <div ui-tree-nodes ng-model=\"data\">\n" +
    "            <div ng-repeat=\"node in data\" ui-tree-node data-collapsed=\"!node.expanded\" ng-include=\"'nodes_renderer.html'\"></li>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--<textarea style=\"width: 100%; height: 100px\">{{data}}</textarea>-->\n" +
    "</div>");
}]);


(function (window, angular) {
    'use strict';

    $tagsInputDirective.$inject = [];

    function $tagsInputDirective() {

        // keycodes
        var $keycodes = {
            enter: 13,
            esc: 27,
            backspace: 8,
            leftArrow: 37,
            rightArrow: 39
        };

        var $updater = function ($scope, splitChar) {

            var result;

            if (!$scope.inputText) return undefined;
            if ($scope.opts.multiple) {//多选的情况
                result = $scope.inputText.split(splitChar);
                $scope.inputText = '';

                if (result) {
                    for (var i = 0; i < result.length; i++) {
                        var addItem = result[i].replace(/(^\s*)|(\s*$)/g, "");

                        if (addItem) $scope.data.push(addItem);
                    }
                }
            } else {//单选的情况
                result = $scope.inputText.replace(/(^\s*)|(\s*$)/g, "");
                $scope.inputText = '';

                if (result) {

                    if ($scope.opts.name) { $scope.data[$scope.opts.name] = result; }
                    else {
                        $scope.data = result;//单选时默认用data存储}
                    }
                    $scope.dataHasValue = true;
                }
            }
            return undefined;
        };
 
        var $defaultOpts = {
            multiple: true,
            splitChar: ';',
            updater: $updater,
            tagItemTemplateUrl: null
        };

        return {
            restrict: 'A',
            scope: {
                data: '=sogTagsInput',
                inputText: '='
            },
            transclude: true,
            templateUrl: 'src/template/tags-input-template.html',
            replace: true,
            link: {
                pre: function ($scope, $element, $attrs, $ctrl, $transclude) {
                    $scope.scopeType = 'sogTagsInput';

                    if ($attrs.sogTagsInputOpts) {
                        $scope.opts = $scope.$parent.$eval($attrs.sogTagsInputOpts);
                    }

                    var $opts = angular.copy($defaultOpts);
                    $scope.opts = $opts = angular.extend($opts, $scope.opts);
                    $scope.data = $scope.data || ($opts.multiple ? [] : null);

                    var dataHasValue = function (scope) {
                        return !!(scope.opts.multiple ?
                            (scope.data && scope.data.length) :
                            (scope.data && !angular.isArray(scope.data)));
                    };
                    $scope.dataHasValue = dataHasValue($scope);
                    $scope.$watch("data", function (newVal, oldValue) {
                        $scope.dataHasValue = dataHasValue($scope);
                    });
                    $scope.$watchCollection("data", function (newVal, oldValue) {
                        $scope.dataHasValue = dataHasValue($scope);
                    });

                    $scope.add = function () {
                        $opts.updater($scope, $opts.splitChar);
                    };

                    $scope.keydown = function (event) {

                        switch (event.keyCode) {
                            case $keycodes.enter:
                                $scope.add();
                                if (!$opts.multiple && $scope.dataHasValue)
                                    event.srcElement.blur();
                                break;
                            case $keycodes.backspace:
                                if (!$scope.inputText && $opts.multiple) { //多选的时候才需要删除

                                    if ($scope.selectIndex >= 0) {

                                        $scope.data.splice($scope.selectIndex, 1);
                                        delete $scope.selectIndex;
                                    } else {
                                        $scope.selectIndex = $scope.data.length - 1;
                                        //event.srcElement.blur();
                                    }
                                }
                                break;
                            default:
                                delete $scope.selectIndex;
                        }
                    };

                    $scope.remove = function (item) {
                        if ($scope.opts.multiple) //多选的情况
                        {
                            var $index = $scope.data.indexOf(item);
                            if ($index >= 0) $scope.data.splice($index, 1);
                        } else {
                            $scope.data = null;
                            $scope.dataHasValue = false;
                        }
                    };
                }
            }
        };
    }

    $tagsInputTemplateDirective.$inject = ['$compile', '$templateCache'];

    function $tagsInputTemplateDirective($compile, $templateCache) {
        return {
            scope: {
                item: '=sogTagsInputTemplateModel',
                templateUrl: '='
            },
            restrict: 'A',
            compile: function compile($tElement, $tAttrs, $transclude) {
                return {
                    pre: function preLink($scope, $element) {
                        $transclude($scope, function (clone) {
                            if ($scope.templateUrl) {
                                var template = $templateCache.get($scope.templateUrl);
                                var tagTemplate = angular.element(template);
                                $compile(tagTemplate)($scope);
                                $element.replaceWith(tagTemplate);
                            }
                            else {
                                $element.replaceWith(clone);
                            }
                        });
                    }
                };
            }
        };
    }

    var module = angular.module('angular-seagull2-common.tags', ['angular-seagull2-common.templates']);
    module.directive('sogTagsInput', $tagsInputDirective);
    module.directive('sogTagsInputTemplate', $tagsInputTemplateDirective);

})(window, window.angular);

(function (window, angular) {
    'use strict';

    $modalProvider.$inject = [];

    function $modalProvider() {

        var exceptionTemplate = {
            statusCode: 0,
            message: '抱歉，出错了',
            exceptionMessage: undefined,
            exceptionType: undefined,
            stackTrace: undefined,
            modelState: {},
            innerList: []
        };

        var informationTemplate = {
            statusCode: 0,
            message: '校验失败',
            modelState: {},
            innerList: []
        };
        //客服信息
        var customerConfig = {
            "subject": undefined,
            "customerMail": undefined
        };
        this.$get = ['$compile', '$document', '$timeout', '$controller', '$rootScope', '$templateCache', '$q', 'configure', function ($compile, $document, $timeout, $controller, $rootScope, $templateCache, $q, configure) {
            var modalProvider = {};

            modalProvider.initInformation = function (srcInfo) {
                var data = angular.copy(informationTemplate);
                angular.extend(data, srcInfo);
                for (var key in data.modelState) {
                    if (data.modelState.hasOwnProperty(key)) {
                        data.innerList.push({
                            key: key,
                            messages: data.modelState[key]
                        });
                    }
                }
                return data;
            };

            //动态个数参数
            //1. 直接传入response
            //2. 传入status, data
            modalProvider.openMessageDialog = function () {
                var status, data;
                if (arguments.length === 1) {
                    var response = arguments[0];
                    //此处接收$http.post().then(function(){}, function(response){})中的response参数
                    status = response.status;
                    data = angular.isString(response.data) ? { exceptionMessage: response } : response.data;
                    //如果data里什么也没有就把整个response放入堆栈方便排查
                    if (!data) {
                        data = {                            
                            stackTrace: angular.isString(response) ? response : angular.toJson(response)
                        };
                    }
                } else {
                    status = arguments[0];
                    data = arguments[1];
                }

                if (status === 0) {
                    return modalProvider.openBadRequestDialog({ message: '无法访问服务器' });
                } else if (status === 400) {
                    return modalProvider.openBadRequestDialog(data);
                } else if (401 <= status && status < 600) {
                    return modalProvider.openErrorDialog(data);
                } else {
                    return modalProvider.openAlertDialog('错误', angular.toJson(data));
                }
            };

            modalProvider.openAlertDialog = function (title, content) {

                var contentElement = angular.element('<div class="modal-body modal-min-height"></div>').text(content);

                var dialogBody = contentElement[0].outerHTML +
                    ' <div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" ng-click="confirm()">确定</button>' +
                    '</div>';

                return modalProvider.openDialog(dialogBody, title, undefined, $rootScope);
            };

            modalProvider.openBadRequestDialog = function (message) {
                var data = angular.copy(informationTemplate);
                angular.extend(data, message);
                for (var key in data.modelState) {
                    if (data.modelState.hasOwnProperty(key)) {
                        data.innerList.push({
                            key: key,
                            messages: data.modelState[key]
                        });
                    }
                }
                return modalProvider.openDialog($templateCache.get('src/template/bad-request-dialog-template.html'), '消息', undefined, undefined, data);
            };


            modalProvider.openDialogForModelStateDictionary = function (message, modelStateDictionary) {

                return modalProvider.openBadRequestDialog({
                    "message": message,
                    "modelState": modelStateDictionary.get()
                });
            };

            modalProvider.openErrorDialog = function (exception) {
                if (angular.isString(exception)) {
                    exception = { exceptionMessage: exception };
                }
                var data = angular.copy(exceptionTemplate);
                //读取客服信息 
                customerConfig = configure.getConfig(customerConfig, 'errorPageCustomer');
                if (!customerConfig.customerMail) throw ("请配置错误页的客服信息。");
                if (!customerConfig.subject) customerConfig.subject = "无主题";
                data.customer = customerConfig;

                angular.extend(data, exception);

                for (var key in data.modelState) {
                    if (data.modelState.hasOwnProperty(key)) {
                        data.innerList.push({
                            key: key,
                            messages: data.modelState[key]
                        });
                    }
                }

                //复制错误信息
                data.detail = exception.message + '\n' + exception.stackTrace;
                data.copiedContent =
                    '【消息】:' + exception.message + '\n' +
                    ' 【异常消息】:' + exception.exceptionMessage + '\n' +
                    ' 【堆栈】:' + exception.stackTrace;
                data.mailBody = encodeURIComponent(data.copiedContent);
                data.copyMessage = function () {
                    var errorInput = document.getElementById("copyErrorMessageInput");
                    errorInput.select();
                    try {
                        document.execCommand("Copy");
                        modalProvider.openAlertDialog("复制成功", "复制成功");
                    } catch (e) {
                        modalProvider.openAlertDialog("友情提示", "复制失败, 请选中错误信息使用手动复制。");
                    }
                };
                return modalProvider.openDialog($templateCache.get('src/template/error-dialog-template.html'), '错误', undefined, undefined, data);
            };

            /*错误提示*/
            modalProvider.openErrorNotice = function (exception) {
                var template = '<div class="hidden-print show"  style="position: fixed;right: 0;bottom: 0;z-index: 99999999;overflow: hidden;-webkit-overflow-scrolling: touch;outline: 0;">' +
                    // '<div class="modal-backdrop hidden-print"></div>' +
                    '<div class="modal-dialog" style="width: 300px;margin: 0 10px 40px 10px;" ng-style="containerStyle">' +
                    '<div class="modal-content" style="width: 100%;">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" ng-click="cancel()">' +
                    '<span>&times;</span>' +
                    '</button>' +
                    '<h4 class="modal-title"><i class="glyphicon glyphicon-info-sign text-info"></i> ' + '发生错误' + '</h4>' +
                    '</div>' +
                    '<div class="modal-body" style="color:red">' +
                    '{{exception.message}}' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<a style="margin-right: 20px;" ng-click="cancel(false)">忽略</a>' +
                    '<a ng-click="confirm(exception)">查看</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                var data = { exception: exception };
                modalProvider.openLayer(template, null, null, data).then(function (exception) {
                    modalProvider.openErrorDialog(exception);
                });
                //没有返回值, 因为不是模态的, 切先后调用了notice和errorDialog页面, 无法立刻返回errorDialog的promise
            };


            modalProvider.openConfirmDialog = function (title, content) {

                var contentElement = angular.element('<div class="modal-body"></div>').text(content);

                var dialogBody = contentElement[0].outerHTML +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" ng-click="closeThisDialog(false)">取消</button>' +
                    '<button type="button" class="btn btn-primary" ng-click="confirm(true)">确定</button>' +
                    '</div>';

                return modalProvider.openDialog(dialogBody, title, undefined, $rootScope);
            };

            /*
            onConfirmFn和onCancelFn的参数为(data, defer), 需要调用defer.resolve()才代表处理完毕关闭窗口;
            如果是关闭后才执行的事情请使用方法返回的promise对象
            */
            modalProvider.openDialog = function (template, title, controller, parentScope, data, onConfirmFn, onCancelFn) {
                if (!title) {
                    title = '弹出窗口';
                }
                var dialogTemplate = '<div class="modal hidden-print show">' +
                    '<div class="modal-backdrop hidden-print"></div>' +
                    '<div class="modal-dialog" ng-style="containerStyle">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" ng-click="closeThisDialog()">' +
                    '<span>&times;</span>' +
                    '</button>' +
                    '<h4 class="modal-title"><i class="glyphicon glyphicon-info-sign text-info"></i> ' + title + '</h4>' +
                    '</div>' +
                    template +
                    '</div>' +
                    '</div>' +
                    '</div>';
                return modalProvider.openLayer(dialogTemplate, controller, parentScope, data, onConfirmFn, onCancelFn);
            };

            /*
            onConfirmFn和onCancelFn的参数为(data, defer), 需要调用defer.resolve()才代表处理完毕关闭窗口;
            如果是关闭后才执行的事情请使用方法返回的promise对象
            */
            modalProvider.openLayer = function (template, controller, parentScope, data, onConfirmFn, onCancelFn) {
                var deferred = $q.defer();

                parentScope = parentScope || $rootScope;
                var childScope = parentScope.$new();
                if (data) {
                    angular.extend(childScope, data);
                }

                var $dialog = angular.element(template);

                var closeCurrent = function () {
                    childScope.$destroy();
                    $dialog.remove();
                };

                var getOnConfirmFn = function () {
                    var result = null;
                    if (onConfirmFn) {
                        if (angular.isString(onConfirmFn)) {
                            if (parentScope) {
                                if (angular.isFunction(parentScope[onConfirmFn])) {
                                    result = parentScope[onConfirmFn];
                                } else if (parentScope.$parent && angular.isFunction(parentScope.$parent[onConfirmFn])) {
                                    result = parentScope.$parent[onConfirmFn];
                                } else if ($rootScope && angular.isFunction($rootScope[onConfirmFn])) {
                                    result = $rootScope[onConfirmFn];
                                }
                            }
                        } else if (angular.isFunction(onConfirmFn)) {
                            result = onConfirmFn;
                        }
                    }
                    return result;
                };

                var getOnCancelFn = function () {
                    var result = null;
                    if (onCancelFn) {
                        if (angular.isString(onCancelFn)) {
                            if (parentScope) {
                                if (angular.isFunction(parentScope[onCancelFn])) {
                                    result = parentScope[onCancelFn];
                                } else if (parentScope.$parent && angular.isFunction(parentScope.$parent[onCancelFn])) {
                                    result = parentScope.$parent[onCancelFn];
                                } else if ($rootScope && angular.isFunction($rootScope[onCancelFn])) {
                                    result = $rootScope[onCancelFn];
                                }
                            }
                        } else if (angular.isFunction(onCancelFn)) {
                            result = onCancelFn;
                        }
                    }
                    return result;
                };

                childScope.confirm = function (val) {
                    var beforeConfirmFn = getOnConfirmFn();
                    if (beforeConfirmFn) {
                        var confirmDeferred = $q.defer();
                        confirmDeferred.promise.then(function (newVal) {
                            closeCurrent();
                            deferred.resolve(newVal);
                        });
                        beforeConfirmFn.call(childScope, val, confirmDeferred);
                    } else {
                        closeCurrent();
                        deferred.resolve(val);
                    }
                };

                childScope.cancel = childScope.closeThisDialog = function (val) {
                    var beforeCancelFn = getOnCancelFn();
                    if (beforeCancelFn) {
                        var confirmDeferred = $q.defer();
                        confirmDeferred.promise.then(function (newVal) {
                            closeCurrent();
                            deferred.reject(newVal);
                        });
                        beforeCancelFn.call(childScope, val, confirmDeferred);
                    } else {
                        closeCurrent();
                        deferred.reject(val);
                    }
                };

                if (controller && (angular.isString(controller) || angular.isFunction(controller) || angular.isArray(controller))) {
                    $controller(controller, { $scope: childScope, $element: $dialog });
                }

                $timeout(function () {
                    angular.element($document).find('body').append($dialog);
                    $compile($dialog)(childScope);
                });

                return deferred.promise;
            };

            return modalProvider;
        }];
    }

    //定义了弹出窗口的模板
    $sogModalDirective.$inject = ['$rootScope', 'sogModal'];

    function $sogModalDirective($rootScope, sogModal) {

        return {
            restrict: 'A',
            transclude: 'element',
            $$tlb: true,
            terminal: true,
            link: function ($scope, $element, $attr, ctrl, $transclude) {

                $rootScope.$on('angular-seagull2-common.modal.open.' + $attr.sogModalTemplate, function (event, val, callbackFn) {

                    $transclude(function (clone, scope) {
                        sogModal.openDialog(clone.html(), $attr.sogModalTitle, $attr.sogModalController, scope, val, callbackFn);
                    });
                });
            }
        };
    }

    //打开弹出窗口（根据模板创建实例），并且可以带参数传入
    $sogModalOpenDirective.$inject = ['$rootScope'];
    function $sogModalOpenDirective($rootScope) {

        function parseModalRef(ref) {
            var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
            if (!parsed || parsed.length !== 4) throw new Error("Invalid modal ref '" + ref + "'");
            return { modalTemplate: parsed[1], paramExpr: parsed[3] || null };
        }

        return {
            restrict: 'A',
            scope: { callbackFn: '&sogModalCallback' },
            link: function (scope, element, attrs) {

                if (!attrs.sogModalOpen) throw new Error("必须指定要开的的弹出框模板");

                element.bind("click", function () {
                    var params;
                    var ref = parseModalRef(attrs.sogModalOpen);

                    if (ref.paramExpr && scope.$parent) {
                        params = angular.copy(scope.$parent.$eval(ref.paramExpr));
                    }
                    $rootScope.$broadcast('angular-seagull2-common.modal.open.' + ref.modalTemplate, params, attrs.sogModalCallback);
                });
            }
        };
    }

    var module = angular.module('angular-seagull2-common.modal', [
        'angular-seagull2-common.templates',
        'angular-seagull2-common.configure'
    ]);

    module.directive('sogModalTemplate', $sogModalDirective);
    module.directive('sogModalOpen', $sogModalOpenDirective);

    module.provider('sogModal', $modalProvider);

})(window, window.angular);

(function (window, angular) {
    'use strict';

    $wfTree.$inject = ['$templateCache', '$http', '$compile', 'sogModal'];

    function $wfTree($templateCache, $http, $compile, sogModal) {
        var httpErrorMsg = function (e, status) {
            var msg;
            if (status === 0) {
                msg = '无法访问互联网，请检查网络是否畅通';
            } else {
                msg = '';
                if (e.message)
                    msg += e.message;
                if (e.exceptionMessage)
                    msg += '\n' + e.exceptionMessage;
                if (e.exceptionMessage)
                    msg += '\n' + e.exceptionType;
                if (e.exceptionMessage)
                    msg += '\n' + e.stackTrace;
            }
            return msg;
        };

        var unSelectNodes = function (nodes) {
            function unSelect(node) {
                node.selected = false;
                if (node.children && node.children.length) {
                    angular.forEach(node.children, function (item) {
                        unSelect(item);
                    });
                }
            }
            for (var i = 0; i < nodes.length; i++) {
                unSelect(nodes[i]);
            }
        };

        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            template: $templateCache.get('src/template/tree-template.html'),
            //templateUrl: "http://localhost:29034/src/uploader-template.html",
            scope: {
                initData: '=treeModel',
                selectedNode: '=',
                checkedNodes: '='
            },
            link: {
                pre: function ($scope, $element, $attrs) {

                    var defaultOpts = {
                        'rootName': null,
                        'root': null,
                        'nodeContentTemplateId': 'tree_node_content.html',
                        'queryKey': 'parentId',
                        'queryValueField': 'id',
                        'beforeQuery': null,
                        'showCheckboxes': true,
                        'autoLoadRoot': false,
                        'beforeAddChildren': null,
                        'nodeClick': null
                    };

                    if ($attrs.treeOpts)
                        $scope.opts = $scope.$parent.$eval($attrs.treeOpts);
                    var defaultOptsClone = angular.copy(defaultOpts);
                    angular.extend(defaultOptsClone, $scope.opts || {});
                    $scope.opts = defaultOptsClone;
                    if (!$scope.opts.rootServiceUrl)
                        $scope.opts.rootServiceUrl = $scope.opts.serviceUrl;

                    var rootName = $scope.opts.rootName;
                    $scope.rootNodes = $scope.initData || [];
                    if (rootName) {
                        $scope.data = [
                            {
                                id: null,
                                displayName: rootName,
                                title: rootName,
                                children: $scope.rootNodes,
                                isTopNode: true,
                                expanded: true //自定根节点的要默认展开
                            }
                        ];
                    } else {
                        $scope.data = $scope.rootNodes;
                    }

                    var loadRoot = function () {
                        $scope.loadingRoot = true;

                        var e = {
                            node: null,
                            queryParam: {
                                root: $scope.opts.root,
                                context: {}
                            },
                            opts: $scope.opts
                        };
                        if ($scope.opts.beforeQuery) {
                            //赋值params.context的机会
                            $scope.opts.beforeQuery(e);
                            if (e.queryParam.context && !angular.isString(e.queryParam.context)) {
                                e.queryParam.context = angular.toJson(e.queryParam.context);
                            }
                        }
                        $http.get($scope.opts.rootServiceUrl, { 'params': e.queryParam }).success(function (response, status) {
                            var data = response.data;
                            var e = {
                                parent: null,
                                children: data,
                                opts: $scope.opts
                            };
                            if ($scope.opts.beforeAddChildren)
                                $scope.opts.beforeAddChildren(e);

                            $scope.rootNodes.length = 0;
                            angular.forEach(data, function (item) {
                                if (!rootName)//手动指定的顶级就不能
                                    item.isTopNode = true;
                                $scope.rootNodes.push(item);
                            });

                            $scope.loadingRoot = false;
                        }).error(function (data, status, headers, config) {
                            sogModal.openMessageDialog(status, data);
                            //sogModal.openAlertDialog('出错了:加载第一级失败', httpErrorMsg(data, status));
                        });
                    };

                    $scope.loadRoot = loadRoot;
                    if ($scope.opts.autoLoadRoot && $scope.opts.serviceUrl) {
                        loadRoot();
                    }

                    $scope.toggleNode = function (scope) {
                        var nodeData = scope.$modelValue;
                        if (scope.collapsed) {
                            //声明了有孩子且没有去加载过
                            if (nodeData.hasChildren && !nodeData.hasLoaded) {
                                nodeData.loadingSub = true;

                                var e = {
                                    node: nodeData,
                                    queryParam: {
                                        root: $scope.opts.root,
                                        context: {}
                                    },
                                    opts: $scope.opts
                                };
                                e.queryParam[$scope.opts.queryKey] = nodeData[$scope.opts.queryValueField];

                                if ($scope.opts.beforeQuery) {
                                    //赋值params.context的机会
                                    $scope.opts.beforeQuery(e);
                                    if (e.queryParam.context && !angular.isString(e.queryParam.context)) {
                                        e.queryParam.context = angular.toJson(e.queryParam.context);
                                    }
                                }

                                $http.get($scope.opts.serviceUrl, { 'params': e.queryParam }).success(function (response, status) {
                                    var data = response.data;
                                    var e = {
                                        parent: nodeData,
                                        children: data,
                                        opts: $scope.opts
                                    };
                                    if ($scope.opts.beforeAddChildren)
                                        $scope.opts.beforeAddChildren(e);

                                    nodeData.children = nodeData.children || [];
                                    nodeData.children.length = 0;
                                    angular.forEach(e.children, function (item) {
                                        nodeData.children.push(item);
                                    });
                                    nodeData.hasLoaded = true;
                                    nodeData.loadingSub = false;

                                    if (e.children && e.children.length === 0)
                                        nodeData.hasChildren = false;

                                    nodeData.expanded = true;
                                }).error(function (e, status, headers, config) {
                                    sogModal.openAlertDialog('加载【' + nodeData.displayName + '】子节点失败', httpErrorMsg(e, status));
                                    nodeData.loadingSub = false;
                                });
                            } else {
                                nodeData.expanded = true;
                            }
                        } else {
                            nodeData.expanded = false;
                        }
                    };

                    $scope._innerNodeClick = function (scope) {
                        var nodeData = scope.$modelValue;
                        var e = {
                            treeModel: $scope.data,
                            nodeData: nodeData,
                            cancel: !nodeData.checkedable
                        };
                        if ($scope.opts.nodeClick)
                            $scope.opts.nodeClick(e);

                        return e;
                    };

                    $scope._nodeClick = function (scope) {
                        var nodeData = scope.$modelValue;
                        var e = $scope._innerNodeClick(scope);

                        if (!e.cancel) {
                            var nodes = $scope.data;
                            unSelectNodes(nodes);
                            nodeData.selected = true;
                        }
                    };
                    $scope._checkedChanged = function (scope) {
                        var nodeData = scope.$modelValue;
                        var e = $scope._innerNodeClick(scope);

                        if (e.cancel) {
                            nodeData.checked = !nodeData.checked;
                        }
                    };
                    $scope.computeExpandStatus = function (scope, opts) {
                        scope.collapsed = !scope.$modelValue.expanded;
                    };
                }
            }
        };
    }

    var module = angular.module('angular-seagull2-common.tree',
        ['angular-seagull2-common.templates',
            'ui.tree',
            'angular-seagull2-common.modal']);
    module.directive('wfTree', $wfTree);

    module.config(function (treeConfig) {
        treeConfig.defaultCollapsed = true;
    });

})(window, window.angular);

(function (window, angular) {
    'use strict';

    $sogSelectorDirective.$inject = ['sogModal', '$templateCache'];

    function $sogSelectorDirective(sogModal, $templateCache) {

        return {
            restrict: 'A',
            scope: {
                selectorModel: '=sogSelector'
            },
            template: '<span ng-class="opts.className" ng-if="opts.accessbility"><i ng-class="opts.iconClassName" ng-if="opts.showIcon"></i> {{opts.title}}</span>',
            replace: false,
            link: {
                pre: function ($scope, $element, $attrs) {
                    $scope.scopeType = 'sogSelector';

                    var defaultOpts = {
                        iconClassName: 'glyphicon glyphicon-folder-open',
                        showIcon: true,
                        accessbility: true,
                        multiple: true,
                        nodeClick: null,

                        rootName: null,
                        root: null,

                        nodeContentTemplateId: 'src/template/selector-tree-node-template.html',

                        beforeQuery: null,
                        beforeAddChildren: null,
                        selectChanged: null,

                        serviceUrl: null
                    };

                    if ($attrs.selectChanged) {
                        $scope.selectChanged = $scope.$parent.$eval($attrs.selectChanged);
                    }

                    if ($attrs.opts) {
                        $scope.opts = $scope.$parent.$eval($attrs.opts);
                    }
                    var defaultOptsClone = angular.copy(defaultOpts);
                    angular.extend(defaultOptsClone, $scope.opts || {});
                    $scope.opts = defaultOptsClone;

                    $scope.treeNodes = [];

                    if ($scope.opts.rootNodes) {
                        angular.forEach($scope.opts.rootNodes, function (node) {
                            var cloneRootNode = angular.copy(node);
                            //cloneRootNode['objectClass'] = 'ORGANIZATIONS';
                            cloneRootNode.hasChildren = true;
                            cloneRootNode.hasLoaded = false;
                            cloneRootNode.checkedable = false;
                            $scope.treeNodes.push(cloneRootNode);
                        });
                    }

                    $element.bind("click", function () {
                        //$scope.maxHeight = 300;//document.body.clientHeight - 50;
                        var serviceUrl = $scope.opts.serviceUrl;
                        sogModal.openDialog($templateCache.get('src/template/selector-modal-template.html'), '请选择', undefined, $scope, {
                            treeOpts: {
                                'rootName': $scope.opts.rootName,
                                'root': $scope.opts.root,

                                'nodeContentTemplateId': $scope.opts.nodeContentTemplateId,
                                'serviceUrl': serviceUrl,
                                // 'queryKey': 'parentPath',
                                // 'queryValueField': 'fullPath',
                                'showCheckboxes': $scope.opts.multiple,
                                'autoLoadRoot': !$scope.opts.rootNodes,
                                'beforeQuery': function (e) {
                                    //拦截, 换下selector自己的opts
                                    //node, params, opts                                  
                                    if ($scope.opts.beforeQuery) {
                                        e.opts = $scope.opts;
                                        $scope.opts.beforeQuery(e);
                                    }
                                },
                                'beforeAddChildren': function (e) {
                                    //拦截, 换下selector自己的opts
                                    var newArgs = {
                                        parent: e.parent,
                                        children: e.children,
                                        opts: $scope.opts
                                    };
                                    if ($scope.opts.beforeAddChildren) {
                                        $scope.opts.beforeAddChildren(newArgs);
                                    }
                                },
                                'nodeClick': function (e) {
                                    /*拦截, 添上换下自己的scope
                                     var e = {
                                        treeModel: $scope.data,
                                        nodeData: nodeData,
                                        cancel: !nodeData.checkedable
                                    };
                                    */
                                    e.selectorScope = $scope.selectorModel;
                                    e.opts = $scope.opts;
                                    if ($scope.opts.nodeClick) {
                                        $scope.opts.nodeClick(e);
                                    }
                                }
                            },
                            selectorModel: $scope.treeNodes
                        });
                    });

                    $scope.getSelcted = function () {
                        var getSelected = function (node, selectedList) {
                            if ((node.checked && $scope.opts.multiple) ||
                                (node.selected && !$scope.opts.multiple)) {
                                selectedList.push(node);
                            }
                            if (node.children && node.children.length) {
                                angular.forEach(node.children, function (subNode) {
                                    getSelected(subNode, selectedList);
                                });
                            }
                        };

                        var selected = [];
                        angular.forEach($scope.treeNodes, function (node) {
                            getSelected(node, selected);
                        });

                        if ($scope.selectorModel) {
                            $scope.selectorModel.length = 0;
                            angular.forEach(selected, function (item) {
                                $scope.selectorModel.push(item);
                            });
                        }
                        if ($scope.opts.selectChanged)
                            $scope.opts.selectChanged(selected, $scope);
                    };
                }
            }
        };
    }

    var module = angular.module('angular-seagull2-common.selector', [
        'angular-seagull2-common.modal',
        'angular-seagull2-common.tree',
        'angular-seagull2-common.templates'
    ]);
    module.directive('sogSelector', $sogSelectorDirective);
})(window, window.angular);

(function (window, angular) {
    'use strict';

    var queryService = {};
    queryService.CheckInputItem = function ($http, checkUrl, params) {

        var uriParams = {};
        angular.extend(uriParams, params);

        var searchArray = uriParams.searchStrings;
        delete uriParams.searchStrings;

        if (uriParams.context && !angular.isString(uriParams)) {
            uriParams.context = angular.toJson(uriParams.context);
        }

        //return $http.get(checkUrl, { params: params });
        return $http.post(checkUrl, searchArray, { params: uriParams });
    };

    queryService.CheckInputArraryItem = function (searchArray, $scope, queryParam, argsContainer) {
        var $http = argsContainer.$http;
        var splitChar = argsContainer.splitChar;
        var sogModal = argsContainer.sogModal;
        var $templateCache = argsContainer.$templateCache;

        if (searchArray.length === 0) {
            $scope.inputText = '';
            $scope.checking = false;
            return;
        }

        $scope.checking = true;

        var existEntity = function (array, item) {
            var exsits = false;
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == item.id) {
                    exsits = true;
                    break;
                }
            }
            return exsits;
        };

        queryService.CheckInputItem($http, $scope.opts.searchUrl, queryParam)
            .error(function (data, status) {
                $scope.checking = false;
                sogModal.openMessageDialog(status, data);
            })
            .success(function (response) {
                var dataDic = response.data;

                if (dataDic.length === 0) {
                    $scope.inputText = '';
                    $scope.checking = false;
                    return;
                }

                var itemConfirmed = function (item) {
                    if (!item) return;
                    if ($scope.opts.multiple) {
                        var e = {
                            item: item,
                            data: $scope.data,
                            cancel: false
                        };
                        if ($scope.opts.beforeAddTagItem) {
                            $scope.opts.beforeAddTagItem(e);
                        }
                        if (!e.cancel) {
                            $scope.data.push(item);
                        }
                    }
                    else {
                        $scope.data = item;
                    }
                };

                var rejectSearchKeys = [];

                var completeSelect = function () {
                    $scope.inputText = rejectSearchKeys.join($scope.opts.splitChar);
                    $scope.checking = false;
                };

                var confirmNext = function (currentIndex, abort) {
                    var isLast = (currentIndex === searchArray.length - 1);
                    if (isLast) {
                        completeSelect();
                    } else {
                        confirmCandidate(currentIndex + 1, abort);
                    }
                };
                var confirmCandidate = function (index, abort) {

                    var key = searchArray[index];

                    if (!abort) {
                        var data = dataDic[key];
                        if (!data) {
                            sogModal.openAlertDialog('所选人员不在范围内', '【' + key + '】不在范围内')
                                .then(function () {
                                    rejectSearchKeys.push(key);
                                    var abort = true;
                                    confirmNext(index, abort);
                                });
                        } else if (data.length === 0) {
                            sogModal.openAlertDialog('未找到', '【' + key + '】未找到')
                                .then(function () {
                                    rejectSearchKeys.push(key);
                                    var abort = true;
                                    confirmNext(index, abort);
                                });
                        } else if (data.length === 1) {
                            var item = data[0];
                            itemConfirmed(item);

                            confirmNext(index);
                        } else {
                            sogModal.openDialog($templateCache.get('src/template/complex-input-select-modal-template.html'), '请选择',
                                ['$scope', function (modalScope) {
                                    modalScope.rowItemClick = function (ss) {
                                        modalScope.selected = ss.$parent.item;
                                    };
                                }], $scope,
                                {
                                    candidates: data,
                                    opts: $scope.opts
                                })
                                .then(function (item) {
                                    itemConfirmed(item);
                                    confirmNext(index);
                                }, function (item) {
                                    rejectSearchKeys.push(key);
                                    var abort = true;
                                    confirmNext(index, abort);
                                });
                        }
                    } else {
                        rejectSearchKeys.push(key);
                        confirmNext(index, abort);
                    }
                };

                confirmCandidate(0);
            });
    };

    $complexInputDirective.$inject = ['$http', '$compile', '$templateCache', 'sogModal'];

    function $complexInputDirective($http, $compile, $templateCache, sogModal) {

        var $defaultOpts = {
            multiple: true,
            splitChar: ';',
            root: null,
            rootName: null,
            searchUrl: null,
            selectorUrl: null,
            nodeClick: null,
            beforeQuery: null,
            showSelector: true,
            beforeAddChildren: null,
            tagItemTemplateUrl: 'src/template/complex-input-tag-template.html',
            nodeContentTemplateId: null,
            tableHeadTemplateUrl: 'src/template/complex-input-select-modal-template-th.html',
            tableRowTemplateUrl: 'src/template/complex-input-select-modal-template-tr.html'
        };

        var confirmDataContainer = function (scope) {
            if (!scope.data && scope.opts.multiple)
                scope.data = [];
        };

        return {
            restrict: 'A',
            scope: {
                data: '=sogComplexInput'
            },
            templateUrl: 'src/template/complex-input-template.html',
            replace: true,
            link: {
                pre: function ($scope, $element, $attrs) {
                    $scope.scopeType = 'sogComplexInput';

                    var checkInputUpdate = function () {
                        var splitChar = $scope.opts.splitChar;
                        confirmDataContainer($scope);

                        var sourceText = $scope.inputText;
                        if (!sourceText)
                            return;
                        if ($scope.checking) {
                            return;
                        }

                        $scope.checking = true;

                        var tempArray = $scope.opts.multiple ? sourceText.trim().split(splitChar) : [sourceText];
                        var searchArray = [];
                        for (var i = 0; i < tempArray.length; i++) {
                            var key = tempArray[i].trim();
                            if (key)
                                searchArray.push(key);
                        }
                        var argsContainer = {
                            $http: $http,
                            $templateCache: $templateCache,
                            sogModal: sogModal,
                            splitChar: splitChar
                        };

                        var queryParam = {
                            searchStrings: searchArray,
                            context: {
                                root: $scope.opts.root
                            }
                        };

                        var e = {
                            queryParam: queryParam,
                            opts: $scope.opts,
                            isSearch: true
                        };

                        if ($scope.opts.beforeQuery) {
                            $scope.opts.beforeQuery(e);
                        }
                        queryService.CheckInputArraryItem(searchArray, $scope, e.queryParam, argsContainer);
                    };
                    //输入选择框相关
                    var $tagUpdater = checkInputUpdate;

                    if ($attrs.opts) {
                        $scope.opts = $scope.$parent.$eval($attrs.opts);
                    }
                    var $opts = angular.copy($defaultOpts);
                    $scope.opts = $opts = angular.extend($opts, $scope.opts);
                    //if (!$scope.data) $scope.data = []; 没有动作的时候不改变初初始数值

                    var dataHasValue = function (scope) {
                        return !!(scope.data &&
                            (
                                (angular.isArray(scope.data) && scope.data.length) || //是数组且长度大于零
                                (!angular.isArray(scope.data)) //不是数组且有对象
                            ));
                    };
                    $scope.dataHasValue = dataHasValue($scope);
                    $scope.$watchCollection("data", function (newVal, oldValue) {
                        $scope.dataHasValue = dataHasValue($scope);
                    });

                    $scope.tagsOpts = {
                        multiple: $opts.multiple,
                        updater: $tagUpdater,
                        splitChar: $opts.splitChar,
                        tagItemTemplateUrl: $opts.tagItemTemplateUrl
                    };

                    $scope.checkInput = function () {
                        checkInputUpdate();
                    };

                    $scope._selectorModel = [];
                    //去除数组里的重复项
                    function isInArray(array, item) {
                        for (var i = 0; i < array.length; i++) {
                            if (item.id == array[i].id) {
                                return true;
                            }
                        }
                        return false;
                    }
                    $scope.selectorOpts = {

                        multiple: $opts.multiple,
                        serviceUrl: $opts.selectorUrl,
                        rootName: $opts.rootName,
                        root: $opts.root,
                        'beforeQuery': function (e) {
                            //拦截, 换下input自己的opts
                            //node, params, opts
                            if ($scope.opts.beforeQuery) {
                                e.opts = $scope.opts;
                                e.isSearch = false;
                                $scope.opts.beforeQuery(e);
                            }
                        },
                        'beforeAddChildren': function (e) {
                            //拦截, 换下input自己的opts
                            var newArgs = {
                                parent: e.parent,
                                children: e.children,
                                opts: $scope.opts
                            };
                            if ($scope.opts.beforeAddChildren) {
                                $scope.opts.beforeAddChildren(newArgs);
                            }
                        },
                        'nodeClick': function (e) {
                            confirmDataContainer($scope);
                            /*拦截, 添上换下自己的scope
                                    var e = {
                                       selectorModel: xx
                                       treeModel: $scope.data,
                                       nodeData: nodeData,
                                       cancel: !nodeData.checkedable
                                   };
                                   */
                            e.complexScope = $scope.data;
                            e.opts = $scope.opts;
                            if ($scope.opts.nodeClick) {
                                $scope.opts.nodeClick(e);
                            }
                        },
                        'selectChanged': function (selected) {
                            confirmDataContainer($scope);
                            if ($opts.multiple) {
                                for (var i = 0; i < selected.length; i++) {
                                    var item = selected[i];
                                    if (!isInArray($scope.data, item)) {
                                        $scope.data.push(item);
                                    }
                                }
                            } else {
                                if (selected.length > 0)
                                    $scope.data = selected[0];
                            }
                            if ($scope.opts.selectChanged) {
                                $scope.opts.selectChanged(selected, $scope);
                            }
                        }
                    };
                    //var newElement = angular.element($templateCache.get($templateUrl));
                    //$compile(newElement)($scope);
                    //angular.element($element).replaceWith(newElement);

                    if ($opts.nodeContentTemplateId) {
                        $scope.selectorOpts.nodeContentTemplateId = $opts.nodeContentTemplateId;
                    }
                }
            }
        };
    }

    var module = angular.module('angular-seagull2-common.complex-input', [
        'angular-seagull2-common.modal',
        'angular-seagull2-common.selector',
        'angular-seagull2-common.tags',
        'angular-seagull2-common.templates']);
    module.directive('sogComplexInput', $complexInputDirective);

} (window, window.angular));

(function (window, angular) {
    'use strict';

    $notFoundConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function $notFoundConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/not-found');

        $stateProvider.state('not-found', {
            url: '/not-found',
            templateUrl: 'src/template/not-found-template.html'
        });

        //通过state.go来, 不设置新state的url, 目的保留原始url
        $stateProvider.state('not-found-page', {
            templateUrl: 'src/template/not-found-template.html'
        });
    }

    var $filterRun = ['$rootScope', '$state', function ($rootScope, $state) {

        $rootScope.$on('$stateNotFound', function (event, redirect, state, params) {

            if (redirect && redirect.to === 'not-found-page') return undefined;

            $state.go('not-found-page');
            event.preventDefault();
        });
    }];

    var angularModule = angular.module('angular-seagull2-common.not-found', ['ui.router', 'src/template/not-found-template.html']);
    angularModule.config($notFoundConfig);
    angularModule.run($filterRun);

})(window, window.angular);

(function (angular) {
    'use strict';

    var stateParams,
        $errorPageController,
        $pageErrorConfig,
        $exceptionProvider,
        $extendExceptionHandler,
        $exceptionConfig,
        angularModule;

    stateParams = {
        exception: undefined,
        opts: undefined,
        currentUrl: undefined
    };
    //客服信息
    var customerConfig = {
        "subject": undefined,
        "customerMail": undefined
    };

    /*
    * 异常显示页面
    */
    $errorPageController = ['$scope', '$window', '$location', '$timeout', 'exception', 'currentUrl', 'configure', 'sogModal',
        function ($scope, $window, $location, $timeout, exception, currentUrl, configure, sogModal) {
            if (!exception) {
                //$location.url(currentUrl);
                $window.open(currentUrl, '_self');
            } else {
                var clonedException = sogModal.initInformation(exception);
                $scope.exception = clonedException;
                $scope.currentUrl = currentUrl;
                //读取客服信息
                customerConfig = configure.getConfig(customerConfig, 'errorPageCustomer');
                if (!customerConfig.customerMail) throw ("请配置错误页的客服信息。");
                if (!customerConfig.subject) customerConfig.subject = "无主题";
                $scope.customer = customerConfig;
                //复制错误信息
                $scope.detail = exception.message + '\n' + exception.stackTrace;
                //转换exception.innerList中的错误信息
                var innerListToString = "";
                if ($scope.exception.innerList && $scope.exception.innerList.length > 0) {
                    innerListToString = '【详细】: ' + JSON.stringify($scope.exception.innerList) + '\n';
                }
                $scope.copiedContent =
                    '【消息】:' + exception.message + '\n' +
                    ' 【地址】:' + $scope.currentUrl + '\n' +
                    ' ' + innerListToString +
                    ' 【异常消息】:' + exception.exceptionMessage + '\n' +
                    ' 【堆栈】:' + exception.stackTrace;
                $scope.mailBody = encodeURIComponent($scope.copiedContent);
                $scope.copyMessage = function () {
                    var errorInput = document.getElementById("copyErrorMessageInput");
                    errorInput.select();
                    try {
                        document.execCommand("Copy");
                        sogModal.openAlertDialog("复制成功", "复制成功");
                    } catch (e) {
                        sogModal.openAlertDialog("友情提示", "复制失败, 请选中错误信息使用手动复制。");
                    }
                };

            }
        }];
    $pageErrorConfig = ['$stateProvider', '$urlRouterProvider', function ($stateProvider) {

        $stateProvider.state('error-page', {
            //保留地址不变, 方便刷新 url: '/error-page/:currentUrl',
            params: stateParams,
            resolve: {
                exception: function ($stateParams) {
                    return $stateParams.exception;
                },
                pageOpts: function ($stateParams) {
                    return $stateParams.opts;
                },
                currentUrl: function ($stateParams) {
                    return $stateParams.currentUrl;
                }
            },
            controller: $errorPageController,
            templateUrl: 'src/template/error-page-template.html',
            requiredLogin: false
        });
    }];
    /*
    * 异常服务
    */
    $exceptionProvider = [function () {

        var exceptionTemplate,
            innerConfig;

        exceptionTemplate = {
            statusCode: 0,
            message: '很抱歉，出错了~',
            exceptionMessage: undefined,
            exceptionType: undefined,
            stackTrace: undefined
        };

        innerConfig = {
            enable: true
        };

        this.$get = ['$location', '$state', 'configure', function ($location, $state, configure) {

            configure.getConfig(innerConfig, 'exception');

            var result = {};

            result.throwException = function (statusCode, srcException, opts) {
                var dstException,
                    dstStateParams;

                dstException = angular.copy(exceptionTemplate);
                angular.extend(dstException, srcException);
                dstException.statusCode = statusCode;

                dstStateParams = angular.copy(stateParams);
                dstStateParams.exception = dstException;
                dstStateParams.currentUrl = $location.absUrl(); //可能还是status.go之前的地址
                dstStateParams.opts = opts;

                $state.go("error-page", dstStateParams);
            };

            result.throwHttpException = function (response) {
                //此处接收$http.post().then(function(){}, function(response){})中的response参数
            };

            return result;
        }];
    }];

    /*
    * 捕获异常
    */
    $extendExceptionHandler = ['$delegate', '$injector', 'configure', function ($delegate, $injector, configure) {
        var innerConfig = {
            "mode": "notice",
            "mode_options": "ignore/page/dialog/notice"
        };
        configure.getConfig(innerConfig, 'exception');

        return function (exception, cause) {
            // 调用默认行为
            $delegate(exception, cause);

            if (innerConfig.mode !== 'ignore') {
                var errorData = {
                    message: exception.message,
                    stackTrace: exception.stack
                };
                /**
                 * 在这里自定义错误处理，如：
                 */
                var sogModalService = $injector.get("sogModal");
                if (innerConfig.mode === 'page') {
                    var exceptionService = $injector.get("exception");
                    exceptionService.throwException(0, errorData);
                } else if (innerConfig.mode === 'dialog') {
                    sogModalService.openErrorDialog(errorData);
                } else if (innerConfig.mode === 'notice') {
                    sogModalService.openErrorNotice(errorData);
                }
            }
        };
    }];

    $exceptionConfig = ['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', $extendExceptionHandler);
    }];

    angularModule = angular.module('angular-seagull2-common.error-page', [
        'ui.router',
        'src/template/error-page-template.html',
        'angular-seagull2-common.configure',
        'angular-seagull2-common.modal']);
    angularModule.config($exceptionConfig);
    angularModule.config($pageErrorConfig);
    angularModule.provider('exception', $exceptionProvider);

} (window.angular));

(function (window, angular) {
    'use strict';

    $urlProvider.$inject = [];
    function $urlProvider() {


        var config = {
            platformUrlBase: undefined, //"http://localhost:10086/Capital"
            apiUrlBase: undefined //'http://localhost:10086',       
        };

        this.$get = ['configure', function (configure) {
            config = configure.getConfig(config, 'seagull2Url');

            var service = {};
            service.getPlatformUrlBase = function () {
                if (!config.platformUrlBase) {
                    throw new Error('`platformUrlBase` properties.');
                }
                return config.apiUrlBase + config.platformUrlBase;
            };

            service.getPlatformUrl = function (url) {
                return service.getPlatformUrlBase() + url;
            };

            service.combine = function (base, path) {

                // Absolute URL
                if (path.match(/^[a-z]*:\/\//)) {
                    return path;
                }
                // Protocol relative URL
                if (path.indexOf("//") === 0) {
                    return base.replace(/\/\/.*/, path);
                }
                // Upper directory
                if (path.indexOf("../") === 0) {
                    return resolveRelative(path.slice(3), base.replace(/\/[^\/]*$/, ''));
                }
                // Relative to the root
                if (path.indexOf('/') === 0) {
                    var match = base.match(/(\w*:\/\/)?[^\/]*\//) || [base];
                    return match[0] + path.slice(1);
                }
                //relative to the current directory
                return base.replace(/\/[^\/]*$/, "") + '/' + path.replace(/^\.\//, '');
            };

            return service;
        }];
    }

    var module = angular.module('angular-seagull2-common.url', [
        'angular-seagull2-common.configure'
    ]);

    module.provider('seagull2Url', $urlProvider);

})(window, window.angular);

(function (window, angular) {
    'use strict';

    $filterRun.$inject = ['$rootScope'];

    function $filterRun($rootScope) {

        $rootScope.$on('$stateChangeStart', function (event, nextState, nextParams, currentState, currentParams, options) {

            if ($rootScope.$broadcast('$authorizationFilterOnAuthorization', nextState, nextParams, currentState, currentParams, options).defaultPrevented) {
                event.preventDefault();
                return undefined;
            }

            if ($rootScope.$broadcast('$actionFilterOnActionExecuting', nextState, nextParams, currentState, currentParams, options).defaultPrevented) {
                event.preventDefault();
                return undefined;
            }

            return undefined;
        });
    }

    var module = angular.module('angular-seagull2-common.filter', []);
    module.run($filterRun);

})(window, window.angular);

(function (angular) {
    'use strict';

    var ModelStateDictionary,
        ValidateHelper,
        RequiredValidator,
        RangeValidator,
        RegularExpressionValidator,
        angularModule;

    /*
    * ModelStateDictionary
    */
    ModelStateDictionary = (function () {

        return function () {

            var dictionary = {},
                count = 0;

            this.count = function () {
                return count;
            };

            this.isValid = function () {
                return count === 0;
            };

            this.addModelError = function (key, errorMessage) {

                if (dictionary[key]) {
                    dictionary[key].push(errorMessage);
                } else {
                    count += 1;
                    dictionary[key] = [errorMessage];
                }
            };

            this.merge = function (other) {
                if (!other)
                    return this;

                if (other instanceof ModelStateDictionary) {
                    other = other.get();
                }

                for (var key in other) {
                    var values = other[key];
                    for (var i = 0; i < values.length; i++) {
                        this.addModelError(key, values[i]);
                    }
                }
                return this;
            };

            this.clear = function () {
                dictionary = {};
                count = 0;
            };

            this.get = function () {

                return dictionary;
            };
        };
    } ());

    /*
    * 验证器
    */
    ValidateHelper = (function () {

        var self = {},
            validators = {};

        self.addValidator = function (name, validator) {
            validators[name] = validator;
        };

        self.getValidator = function (name) {
            return validators[name];
        };

        self.updateValidationContext = function (validationContext, name, message) {

            if (validationContext && validationContext.modelState) {
                validationContext.modelState.addModelError(name, message);
            }
        };

        var obj = {
            a: {
                b: {
                    c: {
                        d: 123
                    }
                }
            },
            f: function () {
                return i * 2;
            },
            list: ['x', 'y', 'z'],
            aa: 123
        };

        var getChainedValue = function (obj, fullPath) {

            if (!obj) {
                return null;
            }
            if (!fullPath) {
                return obj;
            }

            var paths = fullPath.split('.');
            var result = obj;
            for (var i = 0; i < paths.length; i++) {
                var path = paths[i];
                if (result) {
                    result = result[paths[i]];
                } else {
                    result = undefined;
                    break;
                }
            }
            return result;
        };

        getChainedValue(obj, 'a.b.c.d');



        self.validateData = function (source, options) {

            var result = new ModelStateDictionary(),
                validationContext = { source: source, modelState: result },
                i,
                validateOption,
                key,
                validator,
                item,
                vi;


            for (i = 0; i < options.length; i = i + 1) {

                validateOption = options[i];
                item = getChainedValue(source, validateOption.attributeName);

                key = validateOption.key || validateOption.attributeName || 'undefined';
                validator = validateOption.validator;

                if (angular.isArray(validator)) {

                    for (vi = 0; vi < validator.length; vi = vi + 1) {

                        validator[vi].validateData(item, key, validationContext);
                    }
                } else {
                    validator.validateData(item, key, validationContext);
                }
            }

            return result;
        };

        return self;
    } ());



    /*
    * 非空验证器
    */
    RequiredValidator = (function () {

        return function (message) {

            this.validateData = function (value, key, validationContext) {

                if (value === undefined || value === null || value === '') {

                    ValidateHelper.updateValidationContext(validationContext, key, message);
                    return false;
                }

                return true;
            };
        };
    } ());

    /*
    * 指定数据字段值的数值范围约束
    */
    RangeValidator = (function () {

        return function (minimum, maximum, message) {

            this.validateData = function (value, key, validationContext) {

                var numberValue = Number(value);

                if (value === null || isNaN(numberValue) || (minimum && numberValue < minimum) || (maximum && numberValue > maximum)) {

                    ValidateHelper.updateValidationContext(validationContext, key, message);
                    return false;
                }

                return true;
            };
        };
    } ());

    RegularExpressionValidator = (function () {
        return function (pattern, message) {
            this.validateData = function (value, key, validationContext) {
                if (!pattern.test(value)) {
                    ValidateHelper.updateValidationContext(validationContext, key, message);
                    return false;
                }
                return true;
            };
        };
    } ());

    /*
    * 注册验证器
    */
    ValidateHelper.addValidator('Required', RequiredValidator);//非空
    ValidateHelper.addValidator('Range', RangeValidator);//数值取值范围
    //Compare 提供比较两个属性的属性。 Compare(otherProperty, message)
    //EmailAddress 电子邮件地址 EmailAddress(message)
    //MaxLength 允许的数组或字符串数据的最大长度 MaxLength(maxLength,message)
    //MinLength 允许的数组或字符串数据的最小长度 MinLength(minLength,message)
    //Phone 使用电话号码的正则表达式，指定数据字段值是一个格式正确的电话号码 Phone(message)
    ValidateHelper.addValidator('RegularExpression', RegularExpressionValidator);
    //DataType 数据类型验证 Number、string, Array 等 DataType(dataType, message) 定义个数据类型的枚举

    $sogValideStatus.$inject = ['$rootScope'];
    function $sogValideStatus($rootScope) {
        return {
            restrict: 'A',
            link: {
                post: function ($scope, $element, $attr) {
                    var key = $attr.sogValideStatus;
                    var replacedTitle = false;
                    var originalTitle = '';

                    var errorClass = $attr.sogValideStatusClass || 'invalid-failed';
                    var className = $attr.hasOwnProperty('sogValideStatusInside') ? 'invalid-failed-container' : errorClass;
                    $rootScope.$on('validator:validated', function (e, modalState) {
                        if (modalState.hasOwnProperty(key)) {
                            var container = angular.element($element);
                            container.addClass(className);
                            if (container.length) {
                                originalTitle = container[0].title;
                                container[0].title = modalState[key].join('\n');
                                replacedTitle = true;
                            }
                        }
                    });
                    $rootScope.$on('validator:clear', function () {
                        var container = angular.element($element);
                        container.removeClass(className);
                        if (container.length && replacedTitle) {
                            container[0].title = originalTitle;
                        }
                    });
                }
            }
        };
    }

    $sogValidatorService.$inject = ['$rootScope'];
    function $sogValidatorService($rootScope) {
        this.broadcastResult = function (modalState) {
            $rootScope.$broadcast('validator:validated', modalState);
        };
        this.clear = function () {
            $rootScope.$broadcast('validator:clear');
        };
    }


    angularModule = angular.module('angular-seagull2-common.validator', []);
    angularModule.constant('ValidateHelper', ValidateHelper);
    angularModule.constant('ModelStateDictionary', ModelStateDictionary);
    angularModule.directive('sogValideStatus', $sogValideStatus);
    angularModule.service('sogValidator', $sogValidatorService);


} (window.angular));

angular.module('pagination', []).directive('tmPagination', [function () {
    return {
        restrict: 'EA',
        template: '<div class="page-list clearfix">' +
        '<ul class="pagination paginationPc" ng-show="conf.totalItems > 0">' +
        '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li>' +
        '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
        'ng-click="changeCurrentPage(item)">' +
        '<span  ng-class="{backNum: item == \'...\'}">{{ item }}</span>' +
        '</li>' +
        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li>' +
        '</ul>' +
        //小屏幕
        '<ul class="pagination paginationMobile" ng-show="conf.totalItems > 0">' +
        '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li>' +
        '<li ng-repeat="item in mobilePageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
        'ng-click="changeCurrentPage(item)">' +
        '<span  ng-class="{backNum: item == \'...\'}">{{ item }}</span>' +
        '</li>' +
        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li>' +
        '</ul>' +
        //结束
        '<div class="page-total" ng-show="conf.totalItems > 0">' +
        '第&nbsp;<input type="text" ng-model="jumpPageNum"  class="paging"/>&nbsp;页&nbsp;<input type="button" class="btn btn-info" value="跳转" ng-click="jumpToPage($event)" >' +
        '&nbsp;每页 &nbsp;<span>{{conf.itemsPerPage}}</span>' +
        '&nbsp;/共&nbsp;<span>{{ conf.totalItems }}</span>&nbsp;条' +
        '</div>' +
        '<div class="no-items" ng-show="conf.totalItems <= 0"></div>' +
        '</div>',
        replace: true,
        scope: {
            conf: '=tmPagination'
        },
        link: function (scope, element, attrs) {
            //   scope.conf.randomNum 以实现每次点击都可执行getPagination()方法，[即解决点击当前页码刷新的第一步]，此写法主要针对$watch)
            // scope.conf.randomNum=0;
            // 变更当前页
            scope.changeCurrentPage = function (item) {
                if (item == '...') {
                    return;
                } else {
                    scope.conf.currentPage = item;
                    scope.conf.randomNum = Math.random();
                }
            };

            // 定义分页的长度必须为奇数 (default:9)
            scope.conf.pagesLength = parseInt(scope.conf.pagesLength) ? parseInt(scope.conf.pagesLength) : 7;
            if (scope.conf.pagesLength % 2 === 0) {
                // 如果不是奇数的时候处理一下
                scope.conf.pagesLength = scope.conf.pagesLength - 1;
            }

            // conf.erPageOptions
            if (!scope.conf.perPageOptions) {
                scope.conf.perPageOptions = [];
            }

            // pageList数组
            function getPagination() {
                // conf.currentPage
                scope.conf.currentPage = parseInt(scope.conf.currentPage) < 1 ? 1 : parseInt(scope.conf.currentPage);
                // conf.totalItems
                scope.conf.totalItems = parseInt(scope.conf.totalItems);

                // numberOfPages
                scope.conf.numberOfPages = Math.ceil(scope.conf.totalItems / scope.conf.itemsPerPage);

                if (scope.conf.currentPage > scope.conf.numberOfPages) {
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }
                // judge currentPage > scope.numberOfPages
                if (scope.conf.currentPage < 1) {
                    scope.conf.currentPage = 1;
                }
                // jumpPageNum
                scope.jumpPageNum = scope.conf.currentPage;

                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                var perPageOptionsLength = scope.conf.perPageOptions.length;
                // 定义状态
                var perPageOptionsStatus;
                for (var i = 0; i < perPageOptionsLength; i++) {
                    if (scope.conf.perPageOptions[i] == scope.conf.itemsPerPage) {
                        perPageOptionsStatus = true;
                    }
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                if (!perPageOptionsStatus) {
                    scope.conf.perPageOptions.push(scope.conf.itemsPerPage);
                }

                // 对选项进行sort
                scope.conf.perPageOptions.sort(function (a, b) { return a - b; });

                scope.pageList = [];
                //小屏幕显示的分页条数
                scope.mobilePageList = [];

                scope.mobilePageList.push(1);
                if (scope.conf.numberOfPages != 1) {
                    if (parseInt(scope.conf.currentPage) > 2) {
                        scope.mobilePageList.push('...');
                    } else if (parseInt(scope.conf.currentPage) == 1 && parseInt(scope.conf.numberOfPages) > 2) {
                        scope.mobilePageList.push('...');
                    }
                    if (scope.conf.numberOfPages != scope.conf.currentPage && scope.conf.currentPage != 1) {
                        scope.mobilePageList.push(scope.conf.currentPage);
                    }
                    if (parseInt(scope.conf.numberOfPages) - parseInt(scope.conf.currentPage) > 1 && parseInt(scope.conf.currentPage) != 1) {
                        scope.mobilePageList.push('...');
                    }
                    scope.mobilePageList.push(scope.conf.numberOfPages);
                }

                if (scope.conf.numberOfPages <= scope.conf.pagesLength) {
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for (i = 1; i <= scope.conf.numberOfPages; i++) {
                        scope.pageList.push(i);
                    }
                } else {
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (scope.conf.pagesLength - 1) / 2;
                    if (scope.conf.currentPage <= offset) {
                        // 左边没有...
                        for (i = 1; i <= offset + 1; i++) {
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(scope.conf.numberOfPages);
                    } else if (scope.conf.currentPage > scope.conf.numberOfPages - offset) {
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for (i = offset + 1; i >= 1; i--) {
                            scope.pageList.push(scope.conf.numberOfPages - i);
                        }
                        scope.pageList.push(scope.conf.numberOfPages);
                    } else {
                        // 最后一种情况，两边都有...
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        //20160408注释  实现当前页纸显示前后一页
                        if ((scope.conf.currentPage - 1) != 2) {
                            scope.pageList.push(scope.conf.currentPage - 1);
                        }
                        // for (i = Math.ceil(offset / 2) ; i >= 1; i--) {
                        //避免出现  1 … 2 3 4 。。修改好后：  1 … 3 4
                        //if ((scope.conf.currentPage - i) != 2) {
                        //    scope.pageList.push(scope.conf.currentPage - i);
                        //} 
                        //  }
                        scope.pageList.push(scope.conf.currentPage);
                        //20160408注释  实现当前页纸显示前后一页
                        scope.pageList.push(scope.conf.currentPage + 1);
                        // for (i = 1; i <= offset / 2; i++) {
                        // scope.pageList.push(scope.conf.currentPage + i);
                        // }


                        scope.pageList.push('...');
                        scope.pageList.push(scope.conf.numberOfPages);
                    }
                }

                if (scope.conf.onChange) {
                    scope.conf.onChange();
                }

                scope.$parent.conf = scope.conf;
            }

            // 上一页
            scope.prevPage = function () {
                if (scope.conf.currentPage > 1) {
                    scope.conf.currentPage -= 1;
                }
            };
            // 下一页
            scope.nextPage = function () {
                if (scope.conf.currentPage < scope.conf.numberOfPages) {
                    scope.conf.currentPage += 1;
                }
            };

            // 跳转页
            scope.jumpToPage = function () {
                //如果跳转页大于最大页数，则设置为最大页数
                if (parseInt(scope.conf.numberOfPages) < parseInt(scope.jumpPageNum)) {
                    scope.jumpPageNum = scope.conf.numberOfPages;
                }
                if (angular.isNumber(scope.jumpPageNum)) {
                    scope.jumpPageNum = scope.jumpPageNum.toString();
                } else {
                    scope.jumpPageNum = scope.jumpPageNum.replace(/[^0-9]/g, '');
                }
                scope.conf.randomNum = Math.random();
                //   } 
                if (parseInt(scope.jumpPageNum) < 1) {
                    scope.jumpPageNum = 1;
                }
                if (scope.jumpPageNum !== '') {
                    scope.conf.currentPage = scope.jumpPageNum;
                }

            };

            // 修改每页显示的条数
            scope.changeItemsPerPage = function () {
                // 清除本地存储的值方便重新设置
                if (scope.conf.rememberPerPage) {
                    localStorage.removeItem(scope.conf.rememberPerPage);
                }
            };

            scope.$watch(function () {
                var newValue = scope.conf.currentPage + ' ' + scope.conf.totalItems + ' ' + scope.conf.randomNum + ' ';
                // 如果直接watch perPage变化的时候，因为记住功能的原因，所以一开始可能调用两次。
                //所以用了如下方式处理 
                if (scope.conf.rememberPerPage) {
                    // 由于记住的时候需要特别处理一下，不然可能造成反复请求
                    // 之所以不监控localStorage[scope.conf.rememberPerPage]是因为在删除的时候会undefind
                    // 然后又一次请求
                    if (localStorage[scope.conf.rememberPerPage]) {
                        newValue += localStorage[scope.conf.rememberPerPage];
                    } else {
                        newValue += scope.conf.itemsPerPage;
                    }
                } else {
                    newValue += scope.conf.itemsPerPage;
                }
                return newValue;

            }, getPagination);

        }
    };
}]);


(function (window, angular) {
    'use strict';

    $timeDirective.$inject = ['$compile', '$templateCache', 'sogModal', '$filter'];

    function $timeDirective($compile, $templateCache, sogModal, $filter) {
        return {
            restrict: 'A',
            scope: {
                data: '=sogTime'
            },
            link: {
                pre: function ($scope, element, attrs) {
                    element.type = 'text';
                    element.readOnly = true;
                    element.id = element.id || 'P' + Math.abs(~~(Math.random() * new Date()));
                    var $element = angular.element(element);
                    $element.addClass("picker__input");
                    $element.on('click', showselector);
                    var afterElement = angular.element('<a class=\"glyphicon glyphicon-calendar icon-open\"></a>');
                    afterElement.on('click', showselector);
                    $element.after(afterElement);


                    $scope.set = function (value) {
                        $element.val(value);
                    };
                    if ($scope.data)
                        $scope.set($filter('date')($scope.data, 'HH:mm'));

                    var modalController = function (modalScope) {
                        modalScope.select = function (data) {
                            $scope.data = data;
                            if ($scope.data)
                                $scope.set($filter('date')($scope.data, 'HH:mm'));
                            modalScope.closeThisDialog();
                        };
                        modalScope.clear = function () {
                            $scope.data = null;
                            $scope.set('');// $filter('date')($scope.data, 'HH:mm');
                            modalScope.closeThisDialog();
                        };
                    };
                    var getTimeSource = function () {
                        var result = [];
                        for (var i = 0; i < 24; i++) {
                            for (var j = 0; j < 2; j++) {
                                var currentDay = new Date();
                                currentDay.setSeconds(0);
                                currentDay.setMinutes(j * 30);
                                currentDay.setHours(i);

                                result.push(currentDay);
                            }
                        }
                        return result;
                    };
                    function showselector(event) {
                        sogModal.openDialog($templateCache.get('src/template/time-template.html'), '请选择', ['$scope', modalController], undefined, { timesource: getTimeSource() }, undefined, undefined);
                    }

                }
            }

        };
    }

    var module = angular.module('angular-seagull2-common.time', [
        'angular-seagull2-common.modal',
        'angular-seagull2-common.templates']);
    module.directive('sogTime', $timeDirective);

} (window, window.angular));

(function (angular) {
    'use strict';

    angular.module('angular-seagull2-common', [
        'angular-seagull2-common.filter',
        'angular-seagull2-common.configure',
        'angular-seagull2-common.templates',
        'angular-seagull2-common.filter',
        'angular-seagull2-common.not-found',
        'angular-seagull2-common.error-page',
        'angular-seagull2-common.url',
        'angular-seagull2-common.tags',
        'angular-seagull2-common.modal',
        'angular-seagull2-common.tree',
        'angular-seagull2-common.selector',
        'angular-seagull2-common.complex-input',
        'angular-seagull2-common.validator',
        'angular-seagull2-common.time',
        'pagination'
    ]);

}(window.angular));