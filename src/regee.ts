
export class RegEE {
    
    private nameIndex   :any
    private res         :any    = []
    private rand        :number
    private pattern     :string
    private flags       :string

    public constructor (pattern: string | RegExp, flags?: string) {

        if( pattern instanceof RegExp ) {
            flags           = flags || pattern.flags || ''
            pattern         = pattern.source
        }
        
        // this.pattern        = pattern
        this.flags          = flags || ''
        this.rand           = Math.floor(Math.random() * 10**7)
        this.pattern        = this.patternPrepare(pattern, this.flags)
    }

    public ematch (source :string, pattern :string, flag :string){
        console.log(source, pattern, flag);   
    }

    private __match(source :string) {

        var arr :string[]
        var captures
        var matches         = source.match(new RegExp(this.pattern, this.flags))
        
        if(matches == null || matches == undefined ) return matches

        matches.map((item, index) => {
            if(item == undefined ) return matches
            captures        = item.match(new RegExp(this.pattern))
            arr             = []
            
            if(captures !== null) {
                captures.forEach( (element, index) => {
                    if(this.nameIndex[index] != undefined) arr[this.nameIndex[index]] = element
                    arr.push(element)
                });
                this.res.push(arr)
            }
        })

        return this.res
    }

    public [Symbol.match]   = this.__match

    public [Symbol.replace] (source :string, replace: string | Function){
        var res             = this.__match(source)
        
    }

    private patternPrepare(pattern :string, flags :string) {
        if(flags !== undefined && flags.match(/x/)){
            this.flags      = flags.replace(/x/,'')
            pattern         = pattern.replace(/\s+/g,'')
        }

        this.nameIndex      = this.getIndexOfName(pattern)
        pattern             = this.backReference(pattern)

        return pattern
    }

    private getIndexOfName(pattern :string){
        var nameIndex :any  = []
        var names           = pattern
            .replace(/\\/g, '{{' + this.rand + '}}')
            .replace(new RegExp('\\{\\{' + this.rand + '\\}\\}\\(','g'),"")
            .match(/\((?:\?\<(\w+)\>|(?!\?[^\<]))/g)
        
        if(names) names.map((item :string, index: number) => {
            if(item.match(/\(\?\<(\w+)\>/)){
                item        = item.replace(/\(\?\<(\w+)\>/,"$1")
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
                this.nameIndex.forEach((gname :string, index :number) => {
                    if(gref === gname) num = index
                })
                return '\\' + num
            })

        return pattern
    }

}

