package models

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Image       string  `json:"image"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
	Color       string  `json:"color"`
}
