# twine-parser

`twine-parser` parses a Twine game into a rich JS object containing
information about its passages and their connectivity via links.

It provides methods to parse raw HTML, a Twine game hosted at a given
URL and a shortcut for accessing games from philome.la's hosting.

## Installation and usage

```
npm install --save twine-parser
```

```
const { parseHTML, parseUrl, parsePhilomeLa } = require('twine-parser')
```

## Interface

### parseHTML(html) -> ParsedGame

This method can be passed the raw HTML contents of a Twine game. You might
have read it from a local file or loaded it from the web yourself.

Returns a parsed Twine game, syncronously (see below for the format).

```
const parsedGame = parseHTML(html)
```

### parseURL(url) -> Promise(ParsedGame)

This method will load a Twine game hosted at the given URL and then parse it
as per `parseHTML`. Returns a promise for a parsed game (see below for
format).

```
const parsedGame = await parseUrl
```

### parsePhilomeLa(username, game) -> Promise(ParsedGame)

This method is a convenience for loading a Twine game hosted on
[philome.la](http://philome.la). Give the username of the creator and the
game's name (you can see it in the URL on the site) and you'll get a promise for
a parsed game (see below for format).

## Parsed game format

```
{
    passages: [
        {
            pid: 1,
            name: "the first passage",
            text: "This is the bit where the wordy text is. [[Go forward|the next passage]]",
            rawLinks: [
                "[[Go forward|the next passage]]
            ],
            links: [
                {
                    text: "Go forward",
                    destination: {
                        name: "the next passage",
                        pid: 2
                    }
                }
            ]
        },
        {
            pid: 2,
            name: "the next passage",
            // ...
        },
        // ...
    ]
}
```
