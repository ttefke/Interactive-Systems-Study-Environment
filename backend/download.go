package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

func download(w http.ResponseWriter, r *http.Request) {
	/* Set http header */
	w.Header().Set("Content-Type", "text/json")

	/* Fetch documents */
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}

	/* Map documents to structures */
	var results []Data
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}

	/* Print results using http response writer */
	for i, result := range results {
		cursor.Decode(&result)
		output, err := json.MarshalIndent(result, "", "    ")
		if err != nil {
			log.Println(err)
		}

		if i > 0 {
			fmt.Fprintf(w, ",%s", output)
		} else {
			fmt.Fprintf(w, "%s", output)
		}
	}
}
