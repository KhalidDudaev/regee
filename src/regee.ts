
/**
 *
 *
 * @export
 * @class RegEE
 */

 export class RegEE {
    
    // private nameIndex   :any
    private res         :any    = []
    // private rand        :number
    private string      :string = ''
    private source      :string
    private flags       :string
    private group       :any    = {}

    /**
     *Creates an instance of RegEE.
     * @param {(string | RegExp)} pattern
     * @param {string} [flags]
     * @memberof RegEE
     */
    public constructor (pattern: string | RegExp, flags?: string) {

        // this.rand           = Math.floor(Math.random() * 10**7)

        if( pattern instanceof RegExp ) {
            flags           = flags || pattern.flags || ''
            pattern         = pattern.source
        }
        
        // this.pattern        = pattern
        this.flags          = flags || ''
        this.source         = this.patternPrepare(pattern, this.flags)
    }

    public ematch (string :string, pattern :string, flag :string){
        console.log(string, pattern, flag);   
    }

    /**
     *
     *
     * @private
     * @memberof RegEE
     */
    private __match(string :string) {

        this.string         = string
        var arr :string[]
        var captures
        var matches         = string.match(new RegExp(this.source, this.flags))
        
        if(matches == null || matches == undefined ) return matches

        matches.map((item, index) => {
            if(item == undefined ) return matches
            captures        = item.match(new RegExp(this.source))
            arr             = []
            
            if(captures !== null) {
                captures.forEach( (element, index) => {
                    // if(this.nameIndex[index] != undefined) arr[this.nameIndex[index]] = element
                    if(this.group[index] != undefined) arr[this.group[index]] = element
                    arr.push(element)
                });
                this.res.push(arr)
            }
        })

        return this.res
    }

    /**
     *
     *
     * @param {string} string
     * @returns {Array}
     * @memberof RegEE
     */
    public [Symbol.match]   = this.__match


    /**
     *
     *
     * @param {string} source
     * @param {(string | Function)} repl
     * @memberof RegEE
     * 
     */

    public [Symbol.replace] (str :string, repl: string | Function){
        this.string         = str
        var num             = 0
        var replacement :any
        
        if( typeof repl == 'string' ) {
            replacement = repl.replace(/\$\+?\{(\w+)\}/g, (str :string, match :string) => {
                if(this.group[match] !== null) num = this.group[match]
                return '$' + num
            })
        } else {
            this.res = this.__match(str)
            replacement = (str :string) => repl(str, this.res[num++])
        }

        return this.string.replace( new RegExp(this.source, this.flags), replacement)
    }


    /**
     *
     *
     * @private
     * @param {string} pattern
     * @param {string} flags
     * @returns
     * @memberof RegEE
     * 
     */

    private patternPrepare(pattern :string, flags :string) {
        if(flags !== undefined && flags.match(/x/)){
            this.flags      = flags.replace(/x/,'')
            pattern         = pattern.replace(/\s+/g,'')
        }

        this.group          = this.getIndexOfName(pattern)
        pattern             = this.backReference(pattern)

        return pattern
    }

    private getIndexOfName(pattern :string){
        var rand :number    = Math.floor(Math.random() * 10**7)
        var nameIndex :any  = {}
        var names           = pattern
            .replace(/\\/g, '{{' + rand + '}}')
            .replace(new RegExp('\\{\\{' + rand + '\\}\\}\\(','g'),"")
            .match(/\((?:\?\<(\w+)\>|(?!\?[^\<]))/g)
        
        if(names) names.map((item :string, index: number) => {
            if(item.match(/\(\?\<(\w+)\>/)){
                item        = item.replace(/\(\?\<(\w+)\>/,"$1")
                nameIndex[item] = index + 1
                nameIndex[index + 1] = item
            }
        })
        
        return nameIndex
    }

    private backReference(pattern :string){
        var num             = 0
        pattern             = pattern
            .replace(/\(\?\<\w+\>/g, "(")
            .replace(/\\k\<(\w+)\>/g, (m :string, gref :string) => {
                num         = 0
                if(this.group[gref] !== null) num = this.group[gref]

                return '\\' + num
            })

        return pattern
    }

}

