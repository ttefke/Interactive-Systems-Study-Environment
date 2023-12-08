package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/schema"
	"go.mongodb.org/mongo-driver/bson"
)

func upload(w http.ResponseWriter, r *http.Request) {
	/* Set http header */
	w.Header().Set("Content-Type", "text/json")

	/* Decode received data */
	err := r.ParseForm()
	if err != nil {
		log.Println("Error parsing form:", err)
	}

	var data Data
	decoder := schema.NewDecoder()

	err = decoder.Decode(&data, r.PostForm)
	if err != nil {
		log.Println("Error decoding parsed data: ", err)
	}

	/* Generate a user ID */
	count, err := collection.CountDocuments(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	data.UserId = count

	/* Show success message or log error */
	_, err = collection.InsertOne(context.TODO(), data)
	if err != nil {
		log.Println("Could not store document: ", err)
	} else {
		message := UploadSuccessful{true, count}
		binaryMessage, _ := json.Marshal(message)
		w.Write(binaryMessage)
	}
}
