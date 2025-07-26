import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: number;
  deliveryTime: string;
  phone: string;
  specialties: string[];
  priceRange: "₹" | "₹₹" | "₹₹₹";
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Fresh Valley Vegetables",
    category: "Vegetables & Fruits",
    rating: 4.8,
    distance: 1.2,
    deliveryTime: "30-45 min",
    phone: "+91 98765 43210",
    specialties: ["Potatoes", "Onions", "Tomatoes", "Green Peas"],
    priceRange: "₹₹"
  },
  {
    id: "2", 
    name: "Grain Masters",
    category: "Grains & Pulses",
    rating: 4.6,
    distance: 2.1,
    deliveryTime: "45-60 min",
    phone: "+91 98765 43211",
    specialties: ["Rice", "Urad Dal", "Chickpeas", "Maida Flour"],
    priceRange: "₹"
  },
  {
    id: "3",
    name: "Spice Garden",
    category: "Spices & Condiments", 
    rating: 4.9,
    distance: 0.8,
    deliveryTime: "20-30 min",
    phone: "+91 98765 43212",
    specialties: ["Garam Masala", "Cumin Seeds", "Black Salt", "Chutneys"],
    priceRange: "₹₹₹"
  },
  {
    id: "4",
    name: "Golden Oil Suppliers",
    category: "Oil & Dairy",
    rating: 4.5,
    distance: 1.8,
    deliveryTime: "40-50 min", 
    phone: "+91 98765 43213",
    specialties: ["Cooking Oil", "Ghee", "Butter"],
    priceRange: "₹₹"
  },
  {
    id: "5",
    name: "City Bakery Wholesale",
    category: "Bakery Items",
    rating: 4.7,
    distance: 1.5,
    deliveryTime: "35-45 min",
    phone: "+91 98765 43214", 
    specialties: ["Pav Bread", "Puri Shells", "Buns"],
    priceRange: "₹"
  }
];

const SupplierList = () => {
  const categoryColors = {
    "Vegetables & Fruits": "fresh",
    "Grains & Pulses": "spice",
    "Spices & Condiments": "primary", 
    "Oil & Dairy": "warm",
    "Bakery Items": "accent"
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-gradient-card">
        <CardTitle className="text-foreground flex items-center gap-2">
          🏪 Nearby Suppliers
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {mockSuppliers.map(supplier => (
            <div 
              key={supplier.id}
              className="border border-warm/30 rounded-lg p-4 bg-warm/10 hover:bg-warm/20 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{supplier.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary"
                      className={`bg-${categoryColors[supplier.category as keyof typeof categoryColors]}/10 text-${categoryColors[supplier.category as keyof typeof categoryColors]} border-${categoryColors[supplier.category as keyof typeof categoryColors]}/20`}
                    >
                      {supplier.category}
                    </Badge>
                    <span className="text-muted-foreground">{supplier.priceRange}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-spice/30 hover:bg-spice hover:text-white">
                  Order Now
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-spice fill-current" />
                  <span className="font-medium">{supplier.rating}</span>
                  <span className="text-muted-foreground">rating</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-fresh" />
                  <span className="font-medium">{supplier.distance} km</span>
                  <span className="text-muted-foreground">away</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-warm" />
                  <span className="font-medium">{supplier.deliveryTime}</span>
                  <span className="text-muted-foreground">delivery</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.specialties.map(specialty => (
                    <Badge key={specialty} variant="outline" className="text-xs border-spice/30">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{supplier.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierList;