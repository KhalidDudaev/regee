
class RegEE {

    constructor(){
        // this.newPattern     = ''
        this.nameIndex      = []
        // this.resArr         = []
        this.res            = []
        this.rand           = Math.floor(Math.random()*10**7)
    }
    
    match(source, pattern, flag){

        let arr             = []
        let captures        = []

        if(flag !== undefined && flag.match(/x/)){
            flag        = flag.replace(/x/,'')
            pattern     = pattern.replace(/\s+/g,'')
        }

        // this.res.push(source)
        
        this.nameIndex      = this.getIndexOfName(pattern)
        let newPattern      = this.backReference(pattern)
        let matches         = source.match(new RegExp(newPattern, flag))
        
        if(matches == null || matches == undefined ) return matches

        // console.log('RES ARR: ', matches);
        
        matches.map((item, index) => {
            if(item == undefined ) return matches
            arr                 = []
            captures            = item.match(new RegExp(newPattern))

            captures.forEach( (element, index) => {
                if(this.nameIndex[index] != undefined) arr[this.nameIndex[index]] = element
                arr.push(element)
            });

            this.res.push(arr)
        })
        return this.res
    }

    getIndexOfName(pattern){
        let nameIndex       = []
        let names           = pattern
        .replace(/\\/g, '{{' + this.rand + '}}')
        .replace(new RegExp('\\{\\{' + this.rand + '\\}\\}\\(','g'),"")
        .match(/\((?:\?\<(\w+)\>|(?!\?[^\<]))/g)

        if(names) names.map((item, index) => {
            if(item.match(/\(\?\<(\w+)\>/)){
                item = item.replace(/\(\?\<(\w+)\>/,"$1")
                nameIndex[index + 1] = item
            }
        })

        return nameIndex
    }

    backReference(pattern){
        let num             = 0
        pattern             = pattern
            .replace(/\(\?\<\w+\>/g, "(")
            .replace(/\\k\<(\w+)\>/g, (m, gref) => {
                num         = 0
                this.nameIndex.forEach((gname, index) => {
                    if(gref === gname) num = index
                })
                return '\\' + num
            })
        return pattern
    }

}

function match(pattern, flag){
    return new RegEE().match(this.toString(), pattern, flag)
}

String.prototype.ematch = match


// export default match;
