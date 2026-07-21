# TTS Service

This service uses the HTTP server bundled with `piper-tts`.

The Next.js app calls `TTS_SERVICE_URL` and defaults to `http://localhost:5050`. The Piper HTTP server exposes a compatible `POST /` endpoint that accepts JSON with `text`, `voice`, and `length_scale`, then returns WAV audio.

## Setup

Run these commands from the repository root. Verify that `pwd` points to the `ai-pdf-reader` directory first:

```bash
pwd
python3 -m venv ./tts-service/venv
./tts-service/venv/bin/python -m pip install -r ./tts-service/requirements.txt
```

## Start

Run from the repository root so `--data-dir .` can find both voice models:

```bash
./tts-service/venv/bin/python -m piper.http_server \
  --host 0.0.0.0 \
  --port 5050 \
  --model es_MX-claude-high.onnx \
  --data-dir .
```

The default Spanish model is `es_MX-claude-high`. The server can also load `en_US-amy-medium` when the Next.js app sends it in the request body.

If Bash reports `/tts-service/venv/bin/python: No such file or directory`, the command was run with a leading `/`. Use `./tts-service/venv/bin/python` from the repository root, or recreate the virtualenv with the setup commands above.

## Docker

Build the image from the repository root. The build context must be the root directory because the Piper voice models are stored beside the application code:

```bash
docker build -f tts-service/Dockerfile -t ai-pdf-reader-tts:local .
```

Run the service locally:

```bash
docker run --rm -p 5050:5050 ai-pdf-reader-tts:local
```

## Quick Check

```bash
curl -X POST http://localhost:5050 \
  -H 'Content-Type: application/json' \
  -d '{"text":"Hola, esta es una prueba.","voice":"es_MX-claude-high"}' \
  --output /tmp/tts-test.wav
```
