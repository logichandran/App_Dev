# logistics/models.py
from django.db import models

class Vehicle(models.Model):
    registration_number = models.CharField(max_length=100)
    driver_name = models.CharField(max_length=100)
    capacity = models.DecimalField(max_digits=10, decimal_places=2)
    availability_status = models.BooleanField(default=True)

class Shipment(models.Model):
    shipment_id = models.CharField(max_length=100)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField(null=True, blank=True)
