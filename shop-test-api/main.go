package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
	"shop-test-api/src/models"
	"shop-test-api/src/routes"
)

func main() {
	r := gin.Default()

	// Connect to database
	models.ConnectDatabase()
	initProducts()
	routes.Routes()
	// Run the server
	r.Run()
}

func initProducts() {
	fmt.Println("-----------------------------------------")
	var products []models.Product
	if err := models.DB.Find(&products).Error; err != nil {
		fmt.Println("Can't find products in database:", err)
		return
	}

	if len(products) <= 0 {
		// read data from JSON
		fmt.Println("---------------MOCK--------------------------")
		file, err := os.Open("mock.json")
		if err != nil {
			fmt.Println("Error when open file JSON:", err)
			return
		}
		defer file.Close()
		decoder := json.NewDecoder(file)
		err = decoder.Decode(&products)

		if err != nil {
			fmt.Println("Error when convert JSON:", err)
			return
		}

		for _, product := range products {
			models.DB.Create(&product)
		}
	}
}
