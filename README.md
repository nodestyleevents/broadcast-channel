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

```ts
import {BroadcastChannel} from '@3xpo/broadcast-channel'

```

## Note

The EventEmitter is typesafe. If you want a non-typesafe eventemitter, either pass `<any>` or use NodeEventEmitter.

Note that typesafety is not available in pure JS. -->
