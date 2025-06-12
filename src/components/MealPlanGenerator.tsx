
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, RefreshCw, Clock, Users, ChefHat } from "lucide-react";
import NutritionCalculator from "@/components/NutritionCalculator";

const MealPlanGenerator = ({ clientData, onBack }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const nutritionNeeds = NutritionCalculator.calculateDailyNeeds(clientData);
  const mealDistribution = NutritionCalculator.calculateMealDistribution(nutritionNeeds.calories, clientData.mealsPerDay || "3");

  // Mock meal plan data
  const mealPlan = {
    monday: {
      breakfast: {
        name: "Protein Oatmeal with Berries",
        calories: mealDistribution.breakfast || 500,
        protein: 25,
        carbs: 45,
        fat: 12,
        prepTime: 10,
        ingredients: ["1 cup oats", "1 scoop protein powder", "1/2 cup mixed berries", "1 tbsp almond butter"],
        instructions: "Cook oats with water, stir in protein powder, top with berries and almond butter."
      },
      lunch: {
        name: "Grilled Chicken Quinoa Bowl",
        calories: mealDistribution.lunch || 650,
        protein: 45,
        carbs: 55,
        fat: 18,
        prepTime: 25,
        ingredients: ["150g chicken breast", "1 cup cooked quinoa", "Mixed vegetables", "2 tbsp olive oil"],
        instructions: "Grill chicken, serve over quinoa with roasted vegetables drizzled with olive oil."
      },
      dinner: {
        name: "Salmon with Sweet Potato",
        calories: mealDistribution.dinner || 750,
        protein: 40,
        carbs: 60,
        fat: 25,
        prepTime: 30,
        ingredients: ["200g salmon fillet", "1 medium sweet potato", "Green beans", "1 tbsp olive oil"],
        instructions: "Bake salmon and sweet potato, steam green beans, season all with herbs and olive oil."
      }
    },
    tuesday: {
      breakfast: {
        name: "Greek Yogurt Parfait",
        calories: mealDistribution.breakfast || 480,
        protein: 30,
        carbs: 40,
        fat: 15,
        prepTime: 5,
        ingredients: ["200g Greek yogurt", "1/4 cup granola", "1/2 cup berries", "1 tbsp honey"],
        instructions: "Layer yogurt with granola and berries, drizzle with honey."
      },
      lunch: {
        name: "Turkey and Avocado Wrap",
        calories: mealDistribution.lunch || 600,
        protein: 35,
        carbs: 45,
        fat: 22,
        prepTime: 15,
        ingredients: ["1 large whole wheat tortilla", "120g sliced turkey", "1/2 avocado", "Mixed greens"],
        instructions: "Layer turkey, avocado, and greens in tortilla, roll tightly and slice."
      },
      dinner: {
        name: "Lean Beef Stir-fry",
        calories: mealDistribution.dinner || 700,
        protein: 42,
        carbs: 55,
        fat: 20,
        prepTime: 20,
        ingredients: ["150g lean beef strips", "2 cups mixed vegetables", "1 cup brown rice", "2 tbsp sesame oil"],
        instructions: "Stir-fry beef and vegetables in sesame oil, serve over brown rice."
      }
    }
  };

  const shoppingList = [
    "Proteins: Chicken breast (450g), Salmon (400g), Turkey slices (240g), Lean beef (300g), Greek yogurt (400g), Protein powder",
    "Grains: Oats (200g), Quinoa (200g), Brown rice (200g), Whole wheat tortillas (2)",
    "Vegetables: Mixed berries (300g), Sweet potato (2 medium), Green beans (200g), Mixed stir-fry vegetables (400g), Mixed greens (200g)",
    "Healthy Fats: Almond butter, Avocados (2), Olive oil, Sesame oil",
    "Pantry: Honey, Granola, Herbs and spices"
  ];

  const handleGenerateNewPlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would generate a new meal plan
    }, 2000);
  };

  const handleExportPlan = () => {
    // In a real app, this would export to PDF
    console.log("Exporting meal plan...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Meal Plan Generator</h1>
                <p className="text-gray-600">Personalized nutrition plan for {clientData.name}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={handleGenerateNewPlan}
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating...' : 'New Plan'}</span>
              </Button>
              <Button 
                onClick={handleExportPlan}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Nutrition Summary */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 mb-8">
          <CardHeader>
            <CardTitle>Daily Nutrition Targets</CardTitle>
            <CardDescription>Your personalized daily goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{nutritionNeeds.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{nutritionNeeds.protein}g</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{nutritionNeeds.carbs}g</div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{nutritionNeeds.fat}g</div>
                <div className="text-sm text-gray-600">Fat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{Math.round(nutritionNeeds.water/1000*10)/10}L</div>
                <div className="text-sm text-gray-600">Water</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="meal-plan" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="shopping">Shopping List</TabsTrigger>
          </TabsList>

          <TabsContent value="meal-plan" className="space-y-6">
            {/* Week Navigation */}
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4].map((week) => (
                <Button
                  key={week}
                  variant={currentWeek === week ? "default" : "outline"}
                  onClick={() => setCurrentWeek(week)}
                  className={currentWeek === week ? "bg-gradient-to-r from-green-500 to-blue-500" : ""}
                >
                  Week {week}
                </Button>
              ))}
            </div>

            {/* Daily Meal Plans */}
            <div className="grid gap-6">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, dayIndex) => {
                const dayKey = day.toLowerCase();
                const dayMeals = mealPlan[dayKey] || mealPlan.monday; // Fallback to Monday data
                
                return (
                  <Card key={day} className="bg-white/80 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{day}</span>
                        <Badge variant="outline">
                          {Object.values(dayMeals).reduce((total, meal) => total + (meal.calories || 0), 0)} cal
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {Object.entries(dayMeals).map(([mealType, meal]) => (
                          <div key={mealType} className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <ChefHat className="w-4 h-4 text-gray-500" />
                              <h4 className="font-semibold capitalize">{mealType}</h4>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                              <h5 className="font-medium">{meal.name}</h5>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>{meal.calories} cal</span>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{meal.prepTime}m</span>
                                </div>
                              </div>
                              <div className="flex space-x-4 text-xs">
                                <span>P: {meal.protein}g</span>
                                <span>C: {meal.carbs}g</span>
                                <span>F: {meal.fat}g</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {Object.entries(mealPlan.monday).map(([mealType, meal]) => (
                <Card key={mealType} className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{meal.name}</span>
                      <Badge variant="outline">{meal.calories} cal</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{meal.prepTime} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>1 serving</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="font-bold text-blue-600">{meal.protein}g</div>
                        <div className="text-xs text-gray-600">Protein</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="font-bold text-purple-600">{meal.carbs}g</div>
                        <div className="text-xs text-gray-600">Carbs</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="font-bold text-orange-600">{meal.fat}g</div>
                        <div className="text-xs text-gray-600">Fat</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Ingredients</h4>
                      <ul className="space-y-1 text-sm">
                        {meal.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Instructions</h4>
                      <p className="text-sm text-gray-700">{meal.instructions}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shopping" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Weekly Shopping List</CardTitle>
                <CardDescription>Everything you need for Week {currentWeek}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shoppingList.map((category, index) => {
                    const [categoryName, items] = category.split(": ");
                    return (
                      <div key={index} className="space-y-2">
                        <h4 className="font-semibold text-gray-800">{categoryName}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {items.split(", ").map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Estimated Budget</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Weekly grocery cost:</span>
                    <span className="font-bold text-green-800">$85 - $120</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Prices may vary by location and brand choices
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlanGenerator;
