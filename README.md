# mincer-example
Example of mincer

## Development Environment

1.安装nodejs
http://nodejs.org/

2.install node dependencies
```shell
npm install
```

## development
```shell
node index.js
```

## production
precompile static assets
```shell
NODE_ENV=production node manifest.js
```

```shell
NODE_ENV=production pm2 start index.js
```

## Verify js standard

Verify your JavaScript width jscs.

[JavaScript Code Style](https://github.com/felixyale/jscs-rules/blob/master/jscs-rules.md)

## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install
```

Test and verify javascript
```shell
grunt
```


[grunt]: http://gruntjs.com/
[Getting Started]: http://gruntjs.com/getting-started
