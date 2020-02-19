FROM nginx:alpine

ENV PORT=80
ENV HOSTNAME=localhost

COPY ["misc/nginx.conf", "/etc/nginx/conf.d/nginx.template"]
COPY ["dist/", "/usr/share/nginx/html/"]
HEALTHCHECK --interval=5s --timeout=4s --start-period=3s --retries=3 CMD wget localhost:${PORT} -q -O - > /dev/null 2>&1
CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/nginx.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
