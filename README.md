# URA

Tell GPT, "ur a ..." and let it act like one.

Works really well with HTTP. I haven't pushed hard on other protocols.

## Usage

```bash
npm install
OPENAI_API_KEY=<your own key> npm start
```

Other environment variables:

- `WHAT`: what you want the server to be
- `PORT`: port to listen on

## Example

```bash
OPENAI_API_KEY=sk-... WHAT="HTTP server that serves pages in dark mode" npm start
```

<img width="893" alt="image" src="https://github.com/atesgoral/ura/assets/50832/985c2f67-cecb-4e49-a295-67adfbaa1737">
