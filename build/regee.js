"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 *
 * @export
 * @class RegEE
 */
var RegEE = /** @class */ (function () {
    /**
     *Creates an instance of RegEE.
     * @param {(string | RegExp)} pattern
     * @param {string} [flags]
     * @memberof RegEE
     */
    function RegEE(pattern, flags) {
        // this.rand           = Math.floor(Math.random() * 10**7)
        // private nameIndex   :any
        this.res = [];
        // private rand        :number
        this.string = '';
        this.group = {};
        if (pattern instanceof RegExp) {
            flags = flags || pattern.flags || '';
            pattern = pattern.source;
        }
        // this.pattern        = pattern
        this.flags = flags || '';
        this.source = this.patternPrepare(pattern, this.flags);
    }
    //################################## methods ###################################################
    /**
     *
     *
     * @param {string} string
     * @returns {Array}
     * @memberof RegEE
     */
    RegEE.prototype[Symbol.match] = function (string) {
        var _this = this;
        this.string = string;
        var arr;
        var captures;
        var matches = string.match(new RegExp(this.source, this.flags));
        if (matches == null || matches == undefined)
            return matches;
        matches.map(function (item, index) {
            if (item == undefined)
                return matches;
            captures = item.match(new RegExp(_this.source));
            arr = [];
            if (captures !== null) {
                captures.forEach(function (element, index) {
                    // if(this.nameIndex[index] != undefined) arr[this.nameIndex[index]] = element
                    if (_this.group[index] != undefined)
                        arr[_this.group[index]] = element;
                    arr.push(element);
                });
                _this.res.push(arr);
            }
        });
        return this.res;
    };
    /**
     *
     *
     * @param {string} str
     * @param {(string | Function)} repl
     * @returns {string}
     * @memberof RegEE
     */
    RegEE.prototype[Symbol.replace] = function (str, repl) {
        var _this = this;
        this.string = str;
        var num = 0;
        var replacement;
        if (typeof repl == 'string') {
            replacement = repl.replace(/\$\+?\{(\w+)\}/g, function (str, match) {
                if (_this.group[match] !== null)
                    num = _this.group[match];
                return '$' + num;
            });
        }
        else {
            this.res = this[Symbol.match](str);
            replacement = function (str) { return repl(str, _this.res[num++]); };
        }
        return this.string.replace(new RegExp(this.source, this.flags), replacement);
    };
    //################################## helpers ###################################################
    RegEE.prototype.patternPrepare = function (pattern, flags) {
        if (flags !== undefined && flags.match(/x/)) {
            this.flags = flags.replace(/x/, '');
            pattern = pattern.replace(/\s+/g, '');
        }
        this.group = this.getIndexOfName(pattern);
        pattern = this.backReference(pattern);
        return pattern;
    };
    RegEE.prototype.getIndexOfName = function (pattern) {
        var rand = Math.floor(Math.random() * Math.pow(10, 7));
        var nameIndex = {};
        var names = pattern
            .replace(/\\/g, '{{' + rand + '}}')
            .replace(new RegExp('\\{\\{' + rand + '\\}\\}\\(', 'g'), "")
            .match(/\((?:\?\<(\w+)\>|(?!\?[^\<]))/g);
        if (names)
            names.map(function (item, index) {
                if (item.match(/\(\?\<(\w+)\>/)) {
                    item = item.replace(/\(\?\<(\w+)\>/, "$1");
                    nameIndex[item] = index + 1;
                    nameIndex[index + 1] = item;
                }
            });
        return nameIndex;
    };
    RegEE.prototype.backReference = function (pattern) {
        var _this = this;
        var num = 0;
        pattern = pattern
            .replace(/\(\?\<\w+\>/g, "(")
            .replace(/\\[kg]\<(\w+)\>/g, function (m, gref) {
            num = 0;
            if (_this.group[gref] !== null)
                num = _this.group[gref];
            return '\\' + num;
        });
        return pattern;
    };
    return RegEE;
}());
exports.RegEE = RegEE;
String.prototype.ematch = function (pattern, flags) {
    var regee = new RegEE(pattern, flags);
    return regee[Symbol.match](this);
};
String.prototype.ereplace = function (pattern, replace, flags) {
    var regee = new RegEE(pattern, flags);
    return regee[Symbol.replace](this, replace);
};
//# sourceMappingURL=regee.js.map