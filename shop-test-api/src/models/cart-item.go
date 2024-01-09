package models

type Cart struct {
	ProductId int `json:"product_id"`
	Quantity  int `json:"quantity"`
}
