
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Target, TrendingUp, User, Apple, Zap, Clock, Award } from "lucide-react";
import NutritionCalculator from "@/components/NutritionCalculator";

const Dashboard = ({ clientData, onNavigate }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate nutrition needs
  const nutritionNeeds = NutritionCalculator.calculateDailyNeeds(clientData);

  // Mock progress data
  const weightProgress = [
    { date: "Week 1", weight: parseInt(clientData.weight) },
    { date: "Week 2", weight: parseInt(clientData.weight) - 0.5 },
    { date: "Week 3", weight: parseInt(clientData.weight) - 1.2 },
    { date: "Week 4", weight: parseInt(clientData.weight) - 2.1 },
  ];

  const adherenceData = [
    { day: "Mon", adherence: 95 },
    { day: "Tue", adherence: 88 },
    { day: "Wed", adherence: 92 },
    { day: "Thu", adherence: 85 },
    { day: "Fri", adherence: 78 },
    { day: "Sat", adherence: 95 },
    { day: "Sun", adherence: 90 },
  ];

  const calculateWeightProgress = () => {
    const current = parseInt(clientData.weight);
    const target = parseInt(clientData.targetWeight);
    const progress = Math.abs(current - target) > 0 ? 
      ((Math.abs(current - (current - 2.1)) / Math.abs(current - target)) * 100) : 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {clientData.name}</h1>
                <p className="text-gray-600">Your personalized nutrition dashboard</p>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate("meal-planner")}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
            >
              Generate Meal Plan
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Daily Calories</p>
                      <p className="text-2xl font-bold">{nutritionNeeds.calories}</p>
                    </div>
                    <Zap className="w-8 h-8 text-green-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Weight Progress</p>
                      <p className="text-2xl font-bold">{calculateWeightProgress().toFixed(0)}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Adherence Rate</p>
                      <p className="text-2xl font-bold">89%</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-100" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-400 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Days Active</p>
                      <p className="text-2xl font-bold">28</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-100" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Your weight journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Weekly Adherence</CardTitle>
                  <CardDescription>How well you're following your plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={adherenceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="adherence" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => onNavigate("meal-planner")}
                  >
                    <Apple className="w-6 h-6" />
                    <span>Meal Plan</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Target className="w-6 h-6" />
                    <span>Log Weight</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Clock className="w-6 h-6" />
                    <span>Food Log</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <TrendingUp className="w-6 h-6" />
                    <span>Progress Photos</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Daily Nutrition Targets</CardTitle>
                    <CardDescription>Your personalized macro and calorie goals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Calories</span>
                          <span>{nutritionNeeds.calories} kcal</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Protein</span>
                          <span>{nutritionNeeds.protein}g</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Carbohydrates</span>
                          <span>{nutritionNeeds.carbs}g</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Fat</span>
                          <span>{nutritionNeeds.fat}g</span>
                        </div>
                        <Progress value={71} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Micronutrient Recommendations</CardTitle>
                    <CardDescription>Essential vitamins and minerals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span>Vitamin D</span>
                        <span>600 IU</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vitamin B12</span>
                        <span>2.4 μg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Iron</span>
                        <span>{clientData.gender === "female" ? "18 mg" : "8 mg"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calcium</span>
                        <span>1000 mg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Magnesium</span>
                        <span>{clientData.gender === "female" ? "310 mg" : "400 mg"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Zinc</span>
                        <span>{clientData.gender === "female" ? "8 mg" : "11 mg"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Meal Timing</CardTitle>
                    <CardDescription>Optimal nutrition timing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Breakfast</span>
                        <Badge variant="outline">25% calories</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Lunch</span>
                        <Badge variant="outline">35% calories</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Dinner</span>
                        <Badge variant="outline">30% calories</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Snacks</span>
                        <Badge variant="outline">10% calories</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0">
                  <CardHeader>
                    <CardTitle>Hydration Goal</CardTitle>
                    <CardDescription>Daily water intake</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {Math.round((parseInt(clientData.weight) * 35) / 1000 * 10) / 10}L
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on your body weight and activity level
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Body Measurements</CardTitle>
                  <CardDescription>Track your body composition changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{clientData.weight}kg</div>
                      <div className="text-sm text-gray-600">Current Weight</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{clientData.targetWeight}kg</div>
                      <div className="text-sm text-gray-600">Target Weight</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Progress to Goal</span>
                      <span className="font-semibold">{calculateWeightProgress().toFixed(1)}%</span>
                    </div>
                    <Progress value={calculateWeightProgress()} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                  <CardDescription>This week's performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Meal Plan Adherence</span>
                      <span className="font-semibold text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Workout Sessions</span>
                      <span className="font-semibold">4/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sleep Quality</span>
                      <span className="font-semibold text-blue-600">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Energy Levels</span>
                      <span className="font-semibold text-purple-600">High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Progress Photos</CardTitle>
                <CardDescription>Visual tracking of your transformation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((week) => (
                    <div key={week} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="text-gray-400 mb-2">Week {week}</div>
                      <Button variant="outline" size="sm">Upload Photo</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <div className="font-semibold">{clientData.name}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Age:</span>
                      <div className="font-semibold">{clientData.age} years</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Gender:</span>
                      <div className="font-semibold capitalize">{clientData.gender}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Height:</span>
                      <div className="font-semibold">{clientData.height} cm</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Activity Level:</span>
                      <div className="font-semibold capitalize">{clientData.activityLevel}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Primary Goal:</span>
                      <div className="font-semibold capitalize">{clientData.primaryGoal?.replace("-", " ")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>Your dietary restrictions and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-gray-600 text-sm">Dietary Restrictions:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {clientData.dietaryRestrictions?.length > 0 ? (
                        clientData.dietaryRestrictions.map((restriction) => (
                          <Badge key={restriction} variant="secondary">{restriction}</Badge>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">None specified</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600 text-sm">Cuisine Preferences:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {clientData.cuisinePreferences?.length > 0 ? (
                        clientData.cuisinePreferences.map((cuisine) => (
                          <Badge key={cuisine} variant="outline">{cuisine}</Badge>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">None specified</span>
                      )}
                    </div>
                  </div>
                  
                  {clientData.allergies && (
                    <div>
                      <span className="text-gray-600 text-sm">Allergies:</span>
                      <div className="mt-1 text-sm">{clientData.allergies}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>Medical conditions and current status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-gray-600 text-sm">Medical Conditions:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {clientData.medicalConditions?.length > 0 ? (
                      clientData.medicalConditions.map((condition) => (
                        <Badge key={condition} variant="destructive">{condition}</Badge>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">None reported</span>
                    )}
                  </div>
                </div>
                
                {clientData.medications && (
                  <div>
                    <span className="text-gray-600 text-sm">Current Medications:</span>
                    <div className="mt-1 text-sm">{clientData.medications}</div>
                  </div>
                )}
                
                {clientData.supplements && (
                  <div>
                    <span className="text-gray-600 text-sm">Current Supplements:</span>
                    <div className="mt-1 text-sm">{clientData.supplements}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
