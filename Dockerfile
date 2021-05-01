FROM python:3.9-alpine3.13

RUN sed -i "s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g" /etc/apk/repositories \
      && apk add --no-cache build-base musl-dev

COPY app.py \
requirements.txt \
/project/

WORKDIR /project/
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple  -r requirements.txt

ENTRYPOINT [ "python3", "app.py"]