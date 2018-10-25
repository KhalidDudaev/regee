
# **RegEE** 
>Regular Expression Extends




## Description
This module allows the use of named groups in a regular expression.


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
|method|meaning|
|-|-|
| **ematch** | matching string |


## Syntax
```javascript
String.ematch( pattern[, flags] )
```

## Patterns

| Character | Meaning |
|--|--|
|**(?\<somename\>\w+)**|Named group|

**example:**
```javascript
let str         = 'My name is John Smith. I am 25 year old';
let result      = str.ematch('My\\s+name\\s+is\\s+(?<FirstName>\\b\\w+\\b)');
```

## Back reference
| Character | Meaning |
|--|--|
|**\k\<somename\>**|Back reference for named group|
**example:**
```javascript
let str         = 'To be or not to be';
let isHamlet    = str.ematch('(?<tb>To\\s+be)\\s+or\\s+not\\s+\\k<tb>', 'i');
```

## Flag ***```x```***
| Character | Meaning |
|--|--|
|**x**| ignore whitespace |

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
require('regee');

let str = 'My name is John Smith. I am 25 year old. My name is Howard. I am 32 year old.';

//You can using method 'ematch' for String objects
let result = str.ematch(`My\\s+name\\s+is
	\\s+(?<FirstName>\\w+)
	\\s+(?<LastName>\\w+)\\.\\s+I\\s+am
	\\s+(?<Age>\\d+)\\s+year\\s+old`,
'gx');

console.log(result[0].name.FirstName);  // --> John
console.log(result[0].pos[1]);          // --> John
console.log(result[1].name.FirstName);  // --> Howard

console.log(result); // see down...
```


>This action returns an array containing objects, the total elements of the array are equal to the number of matches. Object contines 3 keys: ***source***, ***name*** and ***pos***.


## Return values
**output:**
``` javascript
[
    {
        source: 'My name is John Smith. I am 25 year old',
        name: {
            FirstName: 'John',
            LastName: 'Smith',
            Age: '25'
        },
        pos: ['My name is John Smith. I am 25 year old',
            'John',
            'Smith',
            '25'
        ]
    },
    {
        source: 'My name is Howard. I am 32 year old',
        name: {
            FirstName: 'Howard',
            LastName: undefined,
            Age: '32'
        },
        pos: ['My name is Howard. I am 32 year old',
            'Howard',
            undefined,
            '32'
        ]
    }
]
```



## Author
#### Khalid Dudaev

## License 
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

