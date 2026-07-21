FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1 \
  PIP_NO_CACHE_DIR=1

WORKDIR /srv/tts

RUN groupadd --system --gid 1001 piper \
  && useradd --system --uid 1001 --gid piper piper

COPY tts-service/requirements.txt ./requirements.txt
RUN python -m pip install --upgrade pip \
  && python -m pip install -r requirements.txt

COPY es_MX-claude-high.onnx es_MX-claude-high.onnx.json ./
COPY en_US-amy-medium.onnx en_US-amy-medium.onnx.json ./

RUN chown -R piper:piper /srv/tts

USER piper

EXPOSE 5050

CMD ["python", "-m", "piper.http_server", "--host", "0.0.0.0", "--port", "5050", "--model", "es_MX-claude-high.onnx", "--data-dir", "."]
