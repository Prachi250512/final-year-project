package com.sidhivinayak.bhakti_hub.entity;

public class CartItem {

    private Product product;
    private int quantity;
    private double subtotal;

    public CartItem(Product product, int quantity, double subtotal) {
        this.product = product;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    public Product getProduct() { return product; }
    public int getQuantity() { return quantity; }
    public double getSubtotal() { return subtotal; }
}
