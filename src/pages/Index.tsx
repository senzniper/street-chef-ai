import { useState } from "react";
import DishPlanner from "@/components/DishPlanner";
import IngredientCalculator from "@/components/IngredientCalculator";
import SupplierList from "@/components/SupplierList";

interface Dish {
  id: string;
  name: string;
  quantity: number;
}

const Index = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-6 shadow-warm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🤖 AI Raw Material Planner
          </h1>
          <p className="text-lg opacity-90">
            Smart ingredient planning for street food vendors
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <DishPlanner onDishesChange={setDishes} />
            <IngredientCalculator dishes={dishes} />
          </div>

          {/* Right Column */}
          <div>
            <SupplierList />
          </div>
        </div>

        {/* Summary Card */}
        {dishes.some(dish => dish.name && dish.quantity > 0) && (
          <div className="mt-8 bg-gradient-card rounded-lg p-6 border border-warm/30 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 text-foreground">📋 Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-spice">
                  {dishes.filter(dish => dish.name && dish.quantity > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">Dish Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-fresh">
                  {dishes.reduce((sum, dish) => sum + (dish.quantity || 0), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  Est. ₹2,500
                </div>
                <div className="text-sm text-muted-foreground">Total Cost</div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button className="bg-spice text-white px-6 py-2 rounded-lg hover:bg-spice/90 transition-colors font-medium shadow-warm">
                🛒 Place Orders
              </button>
              <button className="bg-fresh text-white px-6 py-2 rounded-lg hover:bg-fresh/90 transition-colors font-medium">
                💾 Save Plan
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 AI Raw Material Planner - Empowering Street Food Vendors</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;