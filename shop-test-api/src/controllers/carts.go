package controllers

import (
	"fmt"
	"net/http"
	models2 "shop-test-api/src/models"

	"github.com/gin-gonic/gin"
)

type CreateCartInput struct {
	ProductId int `json:"product_id" binding:"required"`
}

type UpdateCartInput struct {
	Quantity int `json:"quantity"`
}

// FindCarts GET /Cart
func FindCarts(c *gin.Context) {
	var Cart []models2.Cart
	models2.DB.Find(&Cart)

	c.JSON(http.StatusOK, gin.H{"data": Cart})
}

// CreateCart POST /Cart
func CreateCart(c *gin.Context) {
	// Validate input
	var input CreateCartInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create cart
	cart := models2.Cart{ProductId: input.ProductId}
	models2.DB.Create(&cart)

	c.JSON(http.StatusOK, gin.H{"data": cart})
}

// UpdateCart PATCH /Cart/:id
func UpdateCart(c *gin.Context) {
	var cart models2.Cart
	var input UpdateCartInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := models2.DB.Model(&cart).Where("product_id = ?", c.Param("id")).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cart})
}

// DeleteCart DELETE /Cart/:id
func DeleteCart(c *gin.Context) {
	// Get model if exist
	var cart models2.Cart
	if err := models2.DB.Where("product_id = ?", c.Param("id")).First(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}
	if err := models2.DB.Delete(&cart, "product_id = ?", c.Param("id")).Error; err != nil {
		fmt.Println("Delete error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": true})
}
