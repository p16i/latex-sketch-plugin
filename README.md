# Latex Sketch Plugin

This plugin brings LaTeX functionalities to Sketch. This allows us to directly write mathematical formulas in Sketch itself.
It is based on `MathJax`'s API.

![](https://i.imgur.com/7szobaj.png)

This plugin was developed  during [Sketch Plugin Hackathon](https://designtoolsberlin.com/), Berlin, 27 + 28 October 2017.

## CLI Commands

``` bash
# build with hot reload
npm run watch

# build for production
npm run build
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
