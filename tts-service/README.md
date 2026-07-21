# TTS Service

This service uses the HTTP server bundled with `piper-tts`.

The Next.js app calls `TTS_SERVICE_URL` and defaults to `http://localhost:5050`. The Piper HTTP server exposes a compatible `POST /` endpoint that accepts JSON with `text`, `voice`, and `length_scale`, then returns WAV audio.

## Setup

Run these commands from the repository root:

```bash
python3 -m venv tts-service/venv
tts-service/venv/bin/python -m pip install -r tts-service/requirements.txt
```

## Start

Run from the repository root so `--data-dir .` can find both voice models:

```bash
tts-service/venv/bin/python -m piper.http_server \
  --host 0.0.0.0 \
  --port 5050 \
  --model es_MX-claude-high.onnx \
  --data-dir .
```

The default Spanish model is `es_MX-claude-high`. The server can also load `en_US-amy-medium` when the Next.js app sends it in the request body.

## Quick Check

```bash
curl -X POST http://localhost:5050 \
  -H 'Content-Type: application/json' \
  -d '{"text":"Hola, esta es una prueba.","voice":"es_MX-claude-high"}' \
  --output /tmp/tts-test.wav
```
