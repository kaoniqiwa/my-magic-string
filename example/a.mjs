import MagicString from '../dist/magic-string.es.mjs';

const magicString = new MagicString('problems = 99;');

magicString.prepend('greet = hello;');
magicString.append('age = 100;');

console.log(magicString.toString());
