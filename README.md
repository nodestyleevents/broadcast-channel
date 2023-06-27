<div align="center">

# @nsev/broadcast-channel

[![documentation](https://img.shields.io/badge/-documentation-brightgreen.svg)](https://nsev.expo.moe/broadcast-channel/) [![npm](https://img.shields.io/badge/-npm-red.svg)](https://npm.im/@nsev/broadcast-channel) [![github](https://img.shields.io/badge/-github-blue.svg)](https://github.com/nodestyleevents/broadcast-channel/tree/master)<br/>
[![mit license](https://img.shields.io/badge/license-mit-orange.svg)](https://nsev.expo.moe/broadcast-channel/LICENSE.txt) [![mom made pizza](https://img.shields.io/badge/type-safe-blue.svg)](https://typescriptlang.org/) [![mom made pizza](https://img.shields.io/badge/mom%20made-pizza-white.svg)](https://www.youtube.com/watch?v=IO9XlQrEt2Y)

</div>

## About

A Wrapper around [BroadcastChannel](https://github.com/pubkey/broadcast-channel) that uses [@3xpo/events](https://npm.im/@3xpo/events) for node-style events in the browser.

## Installation

```bash
pnpm i @nsev/broadcast-channel
```

## Usage

### Basics

###### Tab 1

```ts
import { BroadcastChannel } from '@nsev/broadcast-channel';
const channel = new BroadcastChannel('foobar');
channel.send('I am not alone');
```

###### Tab 2

```ts
import { BroadcastChannel } from '@nsev/broadcast-channel';
const channel = new BroadcastChannel('foobar');
channel.on('message', (message) => {
  console.log(message); // I am not alone
});
```

### Typesafety

Just like in the original, just pass the type as a generic.

```ts
import { BroadcastChannel } from '@nsev/broadcast-channel';
type Message = {
  foo: 'bar';
  bar: 'hi';
} | {
  foo: 'baz';
  baz: string;
};
const channel = new BroadcastChannel<Message>('foobar');

channel.on('message',e=>{
  // e is of type Message
})

// ok
channel.send({
  foo: 'bar',
  bar: 'hi',
});

// ok
channel.send({
  foo: 'baz',
  baz: 'hi',
});

// ok
channel.send({
  foo: 'baz',
  baz: 'hello there',
});

// not ok
channel.send({
  foo: 'bar',
  baz: 'hi',
});

// not ok
channel.send({
  foo: 'baz',
  bar: 'hi',
});

// not ok
channel.send({
  foo: 'bar',
  bar: 'hi',
  baz: 'hello there',
});
```
