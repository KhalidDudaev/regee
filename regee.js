
function ematch(pattern, flag){
    
    let arr             = [];
    let captures        = [];
    let res             = [];
    let source          = this.toString();
    let newPattern
    let matches         = []
    let nameIndex       = [];

    if(flag !== undefined && flag.match(/x/)){
        flag                = flag.replace(/x/,'');
        pattern             = pattern.replace(/\s+/g,'');
    }
    
    nameIndex           = getIndexOfName(pattern);
    newPattern          = backReference(pattern, nameIndex);
    matches             = source.match(new RegExp(newPattern, flag));
    
    if(matches == null || matches == undefined ) return matches;
    
    matches.map((item, index) => {
        if(item == undefined ) return matches;
        captures        = item.match(new RegExp(newPattern));
        
        if(captures !== null) {
            arr             = [];
            captures.forEach( (element, index) => {
                if(nameIndex[index] != undefined) arr[nameIndex[index]] = element;
                arr.push(element);
            });
            res.push(arr);
        }
    });
    
    return res;
}

function getIndexOfName(pattern){

    const rand          = Math.floor(Math.random()*10**7);
    let nameIndex       = [];
    let names           = pattern
    .replace(/\\/g, '{{' + rand + '}}')
    .replace(new RegExp('\\{\\{' + rand + '\\}\\}\\(','g'),"")
    .match(/\((?:\?\<(\w+)\>|(?!\?[^\<]))/g);

    if(names) names.map((item, index) => {
        if(item.match(/\(\?\<(\w+)\>/)){
            item            = item.replace(/\(\?\<(\w+)\>/,"$1")
            nameIndex[index + 1] = item
        }
    });

    return nameIndex;
}

function backReference(pattern, nameIndex){

    let num             = 0;
    pattern             = pattern
        .replace(/\(\?\<\w+\>/g, "(")
        .replace(/\\k\<(\w+)\>/g, (m, gref) => {
            num                     = 0;
            nameIndex.forEach((gname, index) => {
                if(gref === gname) num = index;
            });
            return '\\' + num;
        });

    return pattern;
}

RegExp.prototype.ematch         = ematch;