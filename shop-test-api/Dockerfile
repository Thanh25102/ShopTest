# backend/Dockerfile
FROM golang:alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache git
RUN go mod download

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]
