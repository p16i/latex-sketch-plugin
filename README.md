# Latex Sketch Plugin

This plugin brings LaTeX functionalities to Sketch. It allows us to write mathematical formulas directly inside Sketch.
The implementation is based on `MathJax`'s API.

![](https://i.imgur.com/yPD2n7m.gif)

This plugin was developed  during [Sketch Plugin Hackathon](https://designtoolsberlin.com/), Berlin, 27 + 28 October 2017.

## Installation
The pluging can be downloaded from the [Release page](https://github.com/heytitle/latex-sketch-plugin/releases). 

### For Sketch version below 63.3

The latest version that supports Sketch version below 63.3 is [v0.5.2](https://github.com/heytitle/latex-sketch-plugin/releases/tag/v5.2.0).

## CLI Commands

``` bash
# build with hot reload
npm run watch

# build for production
npm run build

# for publishing
skpm publish minor
```


## Debugging

To view the output of your `console.log`, you have a few different options:
* Open `Console.app` and look for the sketch logs
* Use Safari's web inspector to debug your plugin's javascript context
* Look at the `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` file

Skpm provides a convenient way to do the latter:

```bash
skpm log
```

The `-f` option causes `skpm log` to not stop when the end of logs is reached, but rather to wait for additional data to be appended to the input


## Contributor
- Andrew Nicolaou

## Acknoledgements
- Pieter Omvlee and Mathieu Dutour for supports during the hackathon.
- Roy van Rooijen, Sergi Miral, IXDS Berlin and all people behind `Design Tools Berlin` for organizing this hackathon.

## License

[MIT](https://tldrlegal.com/license/mit-license)
