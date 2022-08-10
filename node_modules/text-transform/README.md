# text-transform

Tiny library to transform text with CSS-like properties. Great for transforming text in environments whre the full CSS spec might not be available to you, such as Node.js or React Native.

## Get Started

```
npm i text-transform
```

```js
import { textTransform } from 'text-transform';
```

Or if you're not using ES6 imports, you can require like so:

```js
const { textTransform } = require('text-transform');
```

## Usage

```js
// textTransform(text: string, type: string);
let a = textTransform('My String', 'uppercase');
// MY STRING
```

## Available Types

- `uppercase` - Converts all to uppercase
- `lowercase` - Converts all to lowercase
- `title` - Capitalizes first letter of each word in string
- `capitalize` - Capitalizes first letter of string
- `initial` - Returns original string
