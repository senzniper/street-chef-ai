import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

interface Dish {
  id: string;
  name: string;
  quantity: number;
}

interface DishPlannerProps {
  onDishesChange: (dishes: Dish[]) => void;
}

const commonDishes = [
  "Samosa", "Dosa", "Vada Pav", "Chole Bhature", "Pani Puri", 
  "Bhel Puri", "Aloo Tikki", "Paratha", "Idli", "Uttapam"
];

const DishPlanner = ({ onDishesChange }: DishPlannerProps) => {
  const [dishes, setDishes] = useState<Dish[]>([
    { id: "1", name: "", quantity: 0 }
  ]);

  const addDish = () => {
    const newDish = {
      id: Date.now().toString(),
      name: "",
      quantity: 0
    };
    const updatedDishes = [...dishes, newDish];
    setDishes(updatedDishes);
    onDishesChange(updatedDishes);
  };

  const removeDish = (id: string) => {
    const updatedDishes = dishes.filter(dish => dish.id !== id);
    setDishes(updatedDishes);
    onDishesChange(updatedDishes);
  };

  const updateDish = (id: string, field: keyof Dish, value: string | number) => {
    const updatedDishes = dishes.map(dish => 
      dish.id === id ? { ...dish, [field]: value } : dish
    );
    setDishes(updatedDishes);
    onDishesChange(updatedDishes);
  };

  const selectCommonDish = (dishName: string, dishId: string) => {
    updateDish(dishId, "name", dishName);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-gradient-card">
        <CardTitle className="text-foreground flex items-center gap-2">
          🍽️ Plan Your Menu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {dishes.map((dish, index) => (
          <div key={dish.id} className="flex gap-3 items-end">
            <div className="flex-1">
              <Label htmlFor={`dish-${dish.id}`}>Dish Name</Label>
              <Input
                id={`dish-${dish.id}`}
                placeholder="Enter dish name"
                value={dish.name}
                onChange={(e) => updateDish(dish.id, "name", e.target.value)}
                className="border-warm"
              />
              {!dish.name && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {commonDishes.map((commonDish) => (
                    <Button
                      key={commonDish}
                      variant="outline"
                      size="sm"
                      onClick={() => selectCommonDish(commonDish, dish.id)}
                      className="text-xs h-7 border-spice/30 hover:bg-spice hover:text-white"
                    >
                      {commonDish}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="w-24">
              <Label htmlFor={`quantity-${dish.id}`}>Quantity</Label>
              <Input
                id={`quantity-${dish.id}`}
                type="number"
                placeholder="0"
                value={dish.quantity || ""}
                onChange={(e) => updateDish(dish.id, "quantity", parseInt(e.target.value) || 0)}
                className="border-warm"
              />
            </div>
            {dishes.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeDish(dish.id)}
                className="border-destructive/30 hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        <Button 
          onClick={addDish} 
          variant="outline" 
          className="w-full border-spice/30 hover:bg-spice hover:text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Dish
        </Button>
      </CardContent>
    </Card>
  );
};

export default DishPlanner;