# Ollama Service

This service uses the official `ollama/ollama` Docker image.

The Next.js app calls `OLLAMA_URL` and defaults to `http://localhost:11434`. In Docker Compose, use the service name instead:

```env
OLLAMA_URL="http://ollama:11434"
OLLAMA_MODEL="phi3"
```

## Docker

Create a persistent volume for downloaded models:

```bash
docker volume create ai-pdf-reader-ollama
```

Run Ollama for local testing:

```bash
docker run --rm \
  --name ai-pdf-reader-ollama \
  -p 127.0.0.1:11434:11434 \
  -v ai-pdf-reader-ollama:/root/.ollama \
  -e OLLAMA_HOST=0.0.0.0:11434 \
  ollama/ollama
```

The `127.0.0.1` bind keeps Ollama reachable only from the host machine during local testing. Do not expose port `11434` directly to the public internet.

## Pull The Model

After the container is running, pull the production model:

```bash
docker exec -it ai-pdf-reader-ollama ollama pull phi3
```

You can list installed models with:

```bash
curl http://localhost:11434/api/tags
```

## Production Notes

In the final Compose setup, Ollama should be on the private Docker network and should not publish port `11434` publicly. The application container should reach it with `http://ollama:11434`.
