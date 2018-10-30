"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegEE {
    constructor(pattern, flags) {
        this.res = [];
        this[Symbol.match] = this.__match;
        if (pattern instanceof RegExp) {
            flags = flags || pattern.flags || '';
            pattern = pattern.source;
        }
        // this.pattern        = pattern
        this.flags = flags || '';
        this.rand = Math.floor(Math.random() * Math.pow(10, 7));
        this.pattern = this.patternPrepare(pattern, this.flags);
    }
    ematch(source, pattern, flag) {
        console.log(source, pattern, flag);
    }
    __match(source) {
        var arr;
        var captures;
        var matches = source.match(new RegExp(this.pattern, this.flags));
        if (matches == null || matches == undefined)
            return matches;
        matches.map((item, index) => {
            if (item == undefined)
                return matches;
            captures = item.match(new RegExp(this.pattern));
            arr = [];
            if (captures !== null) {
                captures.forEach((element, index) => {
                    if (this.nameIndex[index] != undefined)
                        arr[this.nameIndex[index]] = element;
                    arr.push(element);
                });
                this.res.push(arr);
            }
        });
        return this.res;
    }
    [Symbol.replace](source, replace) {
        var res = this.__match(source);
    }
    patternPrepare(pattern, flags) {
        if (flags !== undefined && flags.match(/x/)) {
            this.flags = flags.replace(/x/, '');
            pattern = pattern.replace(/\s+/g, '');
        }
        this.nameIndex = this.getIndexOfName(pattern);
        pattern = this.backReference(pattern);
        return pattern;
    }
    getIndexOfName(pattern) {
        var nameIndex = [];
        var names = pattern
            .replace(/\\/g, '{{' + this.rand + '}}')
            .replace(new RegExp('\\{\\{' + this.rand + '\\}\\}\\(', 'g'), "")
            .match(/\((?:\?\<(\w+)\>|(?!\?[^\<]))/g);
        if (names)
            names.map((item, index) => {
                if (item.match(/\(\?\<(\w+)\>/)) {
                    item = item.replace(/\(\?\<(\w+)\>/, "$1");
                    nameIndex[index + 1] = item;
                }
            });
        return nameIndex;
    }
    backReference(pattern) {
        var num = 0;
        pattern = pattern
            .replace(/\(\?\<\w+\>/g, "(")
            .replace(/\\k\<(\w+)\>/g, (m, gref) => {
            num = 0;
            this.nameIndex.forEach((gname, index) => {
                if (gref === gname)
                    num = index;
            });
            return '\\' + num;
        });
        return pattern;
    }
}
exports.RegEE = RegEE;
