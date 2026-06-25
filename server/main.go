package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"trackd/server/logger"
)

// Define CORS middleware
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow any origin for development, particularly the extension's origin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Trackd API is running",
	})
}

func main() {
	mux := http.NewServeMux()

	// Routes
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Only handle exactly the root route
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "ok",
			"message": "Welcome to the Trackd API!",
		})
	})
	mux.HandleFunc("/health", healthCheckHandler)

	// Ingestion route
	mux.HandleFunc("/api/v1/jobs/scrape", func(w http.ResponseWriter, r *http.Request) {
		logger.Info("Received request at /api/v1/jobs/scrape")

		if r.Method != "POST" {
			logger.Warn("Method not allowed: %s", r.Method)
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var reqBody struct {
			SourceType string `json:"sourceType"`
			Payload    string `json:"payload"`
			JobLink    string `json:"jobLink"`
		}

		if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
			logger.Error("Failed to decode JSON body: %v", err)
			http.Error(w, "Invalid JSON body", http.StatusBadRequest)
			return
		}

		logger.Info("Decoded payload for JobLink: %s", reqBody.JobLink)

		// Open data.txt in append mode, create if it doesn't exist
		f, err := os.OpenFile("data.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			logger.Error("Failed to open data file: %v", err)
			http.Error(w, "Failed to open data file", http.StatusInternalServerError)
			return
		}
		defer f.Close()

		// Write payload and separate by 2 new lines
		record := fmt.Sprintf("\n\n\n\n\n=======================================================================\n\nSOURCE: %s\n\n=======================================================================\nPayload: \n=======================================================================\n%s\n\n\n========================================================================================== \nEND SOURCE\n==========================================================================================\n==========================================================================================\n\n\n\n\n\n\n", reqBody.JobLink, reqBody.Payload)
		if _, err := f.WriteString(record); err != nil {
			logger.Error("Failed to write data to file: %v", err)
			http.Error(w, "Failed to write data", http.StatusInternalServerError)
			return
		}

		logger.Success("Successfully saved scraped data from %s", reqBody.JobLink)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "success",
			"message": "Data ingested successfully",
		})
	})

	// Wrap mux with CORS middleware
	handler := corsMiddleware(mux)

	port := "8080"
	logger.Info("Server is starting on http://localhost:%s\n", port)

	if err := http.ListenAndServe(":"+port, handler); err != nil {
		logger.Error("Server failed to start: %v", err)
		log.Fatalf("Server failed to start: %v", err)
	}
}
