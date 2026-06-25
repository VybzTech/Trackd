package logger

import (
	"log"
	"os"
)

var (
	infoLogger    = log.New(os.Stdout, "[\033[36mINFO\033[0m] ", log.Ldate|log.Ltime)
	successLogger = log.New(os.Stdout, "[\033[32mGOOD\033[0m] ", log.Ldate|log.Ltime)
	warnLogger    = log.New(os.Stdout, "[\033[33mWARN\033[0m] ", log.Ldate|log.Ltime|log.Lshortfile)
	errorLogger   = log.New(os.Stderr, "[\033[31mALERT\033[0m] ", log.Ldate|log.Ltime|log.Lshortfile)
)

func Info(format string, v ...interface{}) {
	infoLogger.Printf(format, v...)
}

func Success(format string, v ...interface{}) {
	successLogger.Printf(format, v...)
}

func Warn(format string, v ...interface{}) {
	warnLogger.Printf(format, v...)
}

func Error(format string, v ...interface{}) {
	errorLogger.Printf(format, v...)
}
