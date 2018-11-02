
# RegEE
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![GitHub](https://img.shields.io/github/release/KhalidDudaev/nodejs.regee.svg?style=flat-square)](https://github.com/KhalidDudaev/nodejs.regee/releases) [![Devid](https://david-dm.org/KhalidDudaev/nodejs.regee.svg?style=flat-square)](https://david-dm.org/KhalidDudaev/nodejs.regee?type=dev) [![David](https://img.shields.io/david/dev/KhalidDudaev/nodejs.regee.svg?style=flat-square)](https://david-dm.org/KhalidDudaev/nodejs.regee?type=dev)

## Description
>Regular Expression Extends. RegEE JavaScript module. This module allows the use of named groups in a regular expression.

## Installing module

```javascript
C:\npm install regee
```

## Usage in code

```javascript
require('regee');
//or
import 'regee';
```

## Methods
|#| name | meaning |
|--|--|--|
|1| **ematch** | matching string |


## Syntax
```javascript
String.ematch( pattern[, flags] )
```

## Patterns

|#| character | meaning |
|--|--|--|
|1|**(?\<somename\>\w+)**|Named group|

**example:**
```javascript
let str         = 'My name is John Smith. I am 25 year old';
let result      = str.ematch('My\\s+name\\s+is\\s+(?<FirstName>\\b\\w+\\b)');
```

## Back reference
|#| character | meaning |
|--|--|--|
|1|**\k\<somename\>**|Back reference for named group|

**example:**
```javascript
let str         = 'to be or not to be';
let isHamlet    = str.ematch('(?<tb>to\\s+be)\\s+or\\s+not\\s+\\k<tb>', 'i');
```

## Flag ***x***
|#| character | meaning |
|--|--|--|
|1|**x**| ignore whitespace |

**example:**
```javascript

let str         = 'My name is John Smith. I am 25 year old';
let result      = str.ematch(`
    My\\s+name\\s+is
    \\s+(?<FirstName>\\b\\w+\\b)
`, 'x');
```

## Examples

**example:**
``` javascript
let str = 'My name is John Smith. I am 25 year old. My name is Howard. I am 32 year old.';

//You can using method 'ematch' for String objects
let result = str.ematch(`My\\s+name\\s+is
	\\s+(?<FirstName>\\w+)
	\\s+(?<LastName>\\w+)\\.\\s+I\\s+am
	\\s+(?<Age>\\d+)\\s+year\\s+old`,
'gx');

console.log(result[0].FirstName);  // --> John
console.log(result[0][1]);         // --> John
console.log(result[1].FirstName);  // --> Howard

console.log(result); // see down...
```

This action returns arrays, the number of arrays is equal to the number of matches. The first element of each array contains a string that matches the pattern. 


## Return values
**output:**
``` javascript
[
    [
        'My name is John Smith. I am 25 year old',
        'John',
        'Smith',
        '25',
        FirstName: 'John',
        LastName: 'Smith',
        Age: '25'
    ],
    [
        'My name is Howard. I am 32 year old',
        'Howard',
        undefined,
        '32',
        FirstName: 'Howard',
        LastName: undefined,
        Age: '32'
    ]
]
```



## Author
#### Khalid Dudaev

## License 
[MIT License](https://opensource.org/licenses/MIT)

