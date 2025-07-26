import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Dish {
  id: string;
  name: string;
  quantity: number;
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

interface IngredientCalculatorProps {
  dishes: Dish[];
}

// Recipe data for common street food items
const recipes: Record<string, Ingredient[]> = {
  "Samosa": [
    { name: "Potatoes", quantity: 0.2, unit: "kg", category: "Vegetables" },
    { name: "Green Peas", quantity: 0.05, unit: "kg", category: "Vegetables" },
    { name: "Maida Flour", quantity: 0.04, unit: "kg", category: "Grains" },
    { name: "Oil", quantity: 0.03, unit: "L", category: "Oil & Fats" },
    { name: "Cumin Seeds", quantity: 0.002, unit: "kg", category: "Spices" },
    { name: "Garam Masala", quantity: 0.001, unit: "kg", category: "Spices" }
  ],
  "Dosa": [
    { name: "Rice", quantity: 0.08, unit: "kg", category: "Grains" },
    { name: "Urad Dal", quantity: 0.02, unit: "kg", category: "Grains" },
    { name: "Oil", quantity: 0.005, unit: "L", category: "Oil & Fats" },
    { name: "Salt", quantity: 0.001, unit: "kg", category: "Spices" }
  ],
  "Vada Pav": [
    { name: "Potatoes", quantity: 0.15, unit: "kg", category: "Vegetables" },
    { name: "Pav Bread", quantity: 1, unit: "pcs", category: "Bakery" },
    { name: "Besan Flour", quantity: 0.03, unit: "kg", category: "Grains" },
    { name: "Oil", quantity: 0.02, unit: "L", category: "Oil & Fats" },
    { name: "Green Chutney", quantity: 0.01, unit: "kg", category: "Condiments" },
    { name: "Tamarind Chutney", quantity: 0.01, unit: "kg", category: "Condiments" }
  ],
  "Chole Bhature": [
    { name: "Chickpeas", quantity: 0.1, unit: "kg", category: "Grains" },
    { name: "Maida Flour", quantity: 0.08, unit: "kg", category: "Grains" },
    { name: "Onions", quantity: 0.05, unit: "kg", category: "Vegetables" },
    { name: "Tomatoes", quantity: 0.05, unit: "kg", category: "Vegetables" },
    { name: "Oil", quantity: 0.02, unit: "L", category: "Oil & Fats" },
    { name: "Garam Masala", quantity: 0.002, unit: "kg", category: "Spices" }
  ],
  "Pani Puri": [
    { name: "Puri Shells", quantity: 8, unit: "pcs", category: "Bakery" },
    { name: "Tamarind", quantity: 0.02, unit: "kg", category: "Fruits" },
    { name: "Mint Leaves", quantity: 0.01, unit: "kg", category: "Vegetables" },
    { name: "Chickpeas", quantity: 0.03, unit: "kg", category: "Grains" },
    { name: "Potatoes", quantity: 0.05, unit: "kg", category: "Vegetables" },
    { name: "Black Salt", quantity: 0.001, unit: "kg", category: "Spices" }
  ]
};

const IngredientCalculator = ({ dishes }: IngredientCalculatorProps) => {
  const calculateIngredients = (): Record<string, { total: number; unit: string; category: string }> => {
    const ingredientMap: Record<string, { total: number; unit: string; category: string }> = {};

    dishes.forEach(dish => {
      if (dish.name && dish.quantity > 0 && recipes[dish.name]) {
        recipes[dish.name].forEach(ingredient => {
          const key = ingredient.name;
          const totalQuantity = ingredient.quantity * dish.quantity;

          if (ingredientMap[key]) {
            ingredientMap[key].total += totalQuantity;
          } else {
            ingredientMap[key] = {
              total: totalQuantity,
              unit: ingredient.unit,
              category: ingredient.category
            };
          }
        });
      }
    });

    return ingredientMap;
  };

  const ingredients = calculateIngredients();
  const hasValidDishes = dishes.some(dish => dish.name && dish.quantity > 0);

  // Group ingredients by category
  const groupedIngredients = Object.entries(ingredients).reduce((acc, [name, data]) => {
    if (!acc[data.category]) {
      acc[data.category] = [];
    }
    acc[data.category].push({ name, ...data });
    return acc;
  }, {} as Record<string, Array<{ name: string; total: number; unit: string; category: string }>>);

  const categoryColors = {
    "Vegetables": "fresh",
    "Grains": "spice", 
    "Oil & Fats": "warm",
    "Spices": "primary",
    "Fruits": "secondary",
    "Bakery": "accent",
    "Condiments": "muted"
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-gradient-card">
        <CardTitle className="text-foreground flex items-center gap-2">
          📊 Ingredient Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!hasValidDishes ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">🥘</div>
            <p>Add dishes above to see ingredient requirements</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedIngredients).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`bg-${categoryColors[category as keyof typeof categoryColors]}/10 text-${categoryColors[category as keyof typeof categoryColors]} border-${categoryColors[category as keyof typeof categoryColors]}/20`}
                  >
                    {category}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ml-4">
                  {items.map(ingredient => (
                    <div 
                      key={ingredient.name}
                      className="flex justify-between items-center p-3 bg-warm/20 rounded-lg border border-warm/30"
                    >
                      <span className="font-medium text-foreground">{ingredient.name}</span>
                      <span className="text-spice font-semibold">
                        {ingredient.total % 1 === 0 ? ingredient.total : ingredient.total.toFixed(2)} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IngredientCalculator;