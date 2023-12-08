# Use general-purpose golang container for building the backend
FROM golang:1.21-alpine as backend-builder

# Initialize modules
WORKDIR /usr/src/app
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copy data
COPY . .

# Build application
RUN go build -v -o backend ./...

# Copy to and run in alpine
FROM alpine:latest
COPY --from=backend-builder /usr/src/app/backend /usr/local/bin
EXPOSE 8080
CMD ["/usr/local/bin/backend"]