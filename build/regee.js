"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 *
 * @export
 * @class RegEE
 */
class RegEE {
    /**
     *Creates an instance of RegEE.
     * @param {(string | RegExp)} pattern
     * @param {string} [flags]
     * @memberof RegEE
     */
    constructor(pattern, flags) {
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
    [Symbol.match](string) {
        this.string = string;
        var arr;
        var captures;
        var matches = string.match(new RegExp(this.source, this.flags));
        if (matches == null || matches == undefined)
            return matches;
        matches.map((item, index) => {
            if (item == undefined)
                return matches;
            captures = item.match(new RegExp(this.source));
            arr = [];
            if (captures !== null) {
                captures.forEach((element, index) => {
                    // if(this.nameIndex[index] != undefined) arr[this.nameIndex[index]] = element
                    if (this.group[index] != undefined)
                        arr[this.group[index]] = element;
                    arr.push(element);
                });
                this.res.push(arr);
            }
        });
        return this.res;
    }
    /**
     *
     *
     * @param {string} str
     * @param {(string | Function)} repl
     * @returns {string}
     * @memberof RegEE
     */
    [Symbol.replace](str, repl) {
        this.string = str;
        var num = 0;
        var replacement;
        if (typeof repl == 'string') {
            replacement = repl.replace(/\$\+?\{(\w+)\}/g, (str, match) => {
                if (this.group[match] !== null)
                    num = this.group[match];
                return '$' + num;
            });
        }
        else {
            this.res = this[Symbol.match](str);
            replacement = (str) => repl(str, this.res[num++]);
        }
        return this.string.replace(new RegExp(this.source, this.flags), replacement);
    }
    //################################## helpers ###################################################
    patternPrepare(pattern, flags) {
        if (flags !== undefined && flags.match(/x/)) {
            this.flags = flags.replace(/x/, '');
            pattern = pattern.replace(/\s+/g, '');
        }
        this.group = this.getIndexOfName(pattern);
        pattern = this.backReference(pattern);
        return pattern;
    }
    getIndexOfName(pattern) {
        var rand = Math.floor(Math.random() * Math.pow(10, 7));
        var nameIndex = {};
        var names = pattern
            .replace(/\\/g, '{{' + rand + '}}')
            .replace(new RegExp('\\{\\{' + rand + '\\}\\}\\(', 'g'), "")
            .match(/\((?:\?\<(\w+)\>|(?!\?[^\<]))/g);
        if (names)
            names.map((item, index) => {
                if (item.match(/\(\?\<(\w+)\>/)) {
                    item = item.replace(/\(\?\<(\w+)\>/, "$1");
                    nameIndex[item] = index + 1;
                    nameIndex[index + 1] = item;
                }
            });
        return nameIndex;
    }
    backReference(pattern) {
        var num = 0;
        pattern = pattern
            .replace(/\(\?\<\w+\>/g, "(")
            .replace(/\\[kg]\<(\w+)\>/g, (m, gref) => {
            num = 0;
            if (this.group[gref] !== null)
                num = this.group[gref];
            return '\\' + num;
        });
        return pattern;
    }
}
exports.RegEE = RegEE;
String.prototype.ematch = function (pattern, flags) {
    let regee = new RegEE(pattern, flags);
    return regee[Symbol.match](this);
};
String.prototype.ereplace = function (pattern, replace, flags) {
    let regee = new RegEE(pattern, flags);
    return regee[Symbol.replace](this, replace);
};
