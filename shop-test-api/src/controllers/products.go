package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	models2 "shop-test-api/src/models"
)

type CreateProductInput struct {
	Name        string  `json:"name"`
	Image       string  `json:"image"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
	Color       string  `json:"color"`
}

// FindProducts GET /products
func FindProducts(c *gin.Context) {
	var products []models2.Product
	models2.DB.Find(&products)

	c.JSON(http.StatusOK, gin.H{"data": products})
}

// CreateProduct POST /products
func CreateProduct(c *gin.Context) {
	// Validate input
	var input CreateProductInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create product
	product := models2.Product{
		Name:        input.Name,
		Image:       input.Image,
		Description: input.Description,
		Price:       float32(input.Price),
		Color:       input.Color,
	}
	models2.DB.Create(&product)

	c.JSON(http.StatusOK, gin.H{"data": product})
}
