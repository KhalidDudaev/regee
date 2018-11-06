/**
 *
 *
 * @export
 * @class RegEE
 */
export declare class RegEE {
    private res;
    private string;
    private source;
    private flags;
    private group;
    /**
     *Creates an instance of RegEE.
     * @param {(string | RegExp)} pattern
     * @param {string} [flags]
     * @memberof RegEE
     */
    constructor(pattern: string | RegExp, flags?: string);
    /**
     *
     *
     * @param {string} string
     * @returns {Array}
     * @memberof RegEE
     */
    [Symbol.match](string: string): any;
    /**
     *
     *
     * @param {string} str
     * @param {(string | Function)} repl
     * @returns {string}
     * @memberof RegEE
     */
    [Symbol.replace](str: string, repl: string | Function): string;
    private patternPrepare;
    private getIndexOfName;
    private backReference;
}
//# sourceMappingURL=regee.d.ts.map