package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	controllers2 "shop-test-api/src/controllers"
)

// Routes function to serve endpoints
func Routes() {
	route := gin.Default()
	route.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
		AllowHeaders: []string{"Content-Type,access-control-allow-origin, access-control-allow-headers"},
	}))

	// Routes
	route.GET("/products", controllers2.FindProducts)
	route.POST("/products", controllers2.CreateProduct)

	route.GET("/cart", controllers2.FindCarts)
	route.POST("/cart", controllers2.CreateCart)
	route.PATCH("/cart/:id", controllers2.UpdateCart)
	route.DELETE("/cart/:id", controllers2.DeleteCart)

	// Run route whenever triggered
	route.Run()
}
