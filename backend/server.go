package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

func main() {
	/* Set up database connection */
	log.Println("Connecting to the database...")

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("MONGODB_URI is not set!")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	collection = client.Database("intactsys").Collection("userStudy")
	log.Println("Connected to database, setting up API routes...")

	/* Set up API routing */
	r := mux.NewRouter()
	r.HandleFunc("/uploadData", upload).Methods("POST")
	r.HandleFunc("/downloadData", download).Methods("GET")

	/* Start HTTP server */
	err = http.ListenAndServe(":8080", r)
	log.Println("API server is ready.")
	if err != nil {
		log.Fatalf("Server failed: %s", err)
	}
}
