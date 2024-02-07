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

	/* Prepare data for download */
	downloadData := DownloadData{
		Data: results,
	}

	/* Print data for download */
	output, err := json.MarshalIndent(downloadData, "", "    ")
	if err != nil {
		log.Println(err)
	} else {
		fmt.Fprintf(w, "%s", output)
	}
}
