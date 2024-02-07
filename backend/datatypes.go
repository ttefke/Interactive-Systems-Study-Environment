package main

/* Main data type used for holding data */
type DownloadData struct {
	Data []Data `json:"data"`
}

type Data struct {
	UserId                int64  `json:"userId"`
	DefaultRequiredTime   int64  `json:"defaultRequiredTime"`
	DefaultAttempts       int64  `json:"defaultAttempts"`
	DefaultScrollDistance string `json:"defaultScrollDistance"`
	EnhancedLetters       int64  `json:"enhancedLetters"`
	EnhancedRequiredTime  int64  `json:"enhancedRequiredTime"`
	EnhancedAttempts      int64  `json:"enhancedAttempts"`
}

/* Data type to message if data upload was successful and return the user ID */
type UploadSuccessful struct {
	Success bool  `json:"success"`
	UserId  int64 `json:"userId"`
}
