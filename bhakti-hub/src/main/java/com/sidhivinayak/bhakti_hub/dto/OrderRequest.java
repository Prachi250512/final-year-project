package com.sidhivinayak.bhakti_hub.dto;

import java.util.List;

public class OrderRequest {

    private List<OrderItemRequest> items;
    private String paymentMode;
    private String pickupTime;
    private String notes;

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }

    public String getPickupTime() { return pickupTime; }
    public void setPickupTime(String pickupTime) { this.pickupTime = pickupTime; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}