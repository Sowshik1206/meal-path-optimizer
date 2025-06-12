
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

const ClientOnboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Demographics
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    
    // Goals
    primaryGoal: "",
    targetWeight: "",
    timeframe: "",
    
    // Dietary Info
    dietaryRestrictions: [],
    allergies: "",
    foodDislikes: "",
    cuisinePreferences: [],
    
    // Lifestyle
    budget: "",
    cookingSkill: "",
    mealPrepTime: "",
    mealsPerDay: "",
    
    // Health
    medicalConditions: [],
    medications: "",
    supplements: "",
    
    // Preferences
    workoutSchedule: "",
    sleepSchedule: "",
    stressLevel: "",
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (field, item, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], item]
        : prev[field].filter(i => i !== item)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  placeholder="25"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)}
                  placeholder="170"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Current Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                  placeholder="70"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={formData.activityLevel} onValueChange={(value) => updateFormData("activityLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (desk job, no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week exercise)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week exercise)</SelectItem>
                    <SelectItem value="high">High (6-7 days/week exercise)</SelectItem>
                    <SelectItem value="extreme">Extreme (2x/day or physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Health Goals</h3>
              <p className="text-gray-600">What would you like to achieve?</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Primary Goal</Label>
                <Select value={formData.primaryGoal} onValueChange={(value) => updateFormData("primaryGoal", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Weight Maintenance</SelectItem>
                    <SelectItem value="athletic-performance">Athletic Performance</SelectItem>
                    <SelectItem value="general-health">General Health Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    value={formData.targetWeight}
                    onChange={(e) => updateFormData("targetWeight", e.target.value)}
                    placeholder="65"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Timeframe</Label>
                  <Select value={formData.timeframe} onValueChange={(value) => updateFormData("timeframe", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Dietary Preferences</h3>
              <p className="text-gray-600">Tell us about your dietary needs and preferences</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Dietary Restrictions (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Vegetarian", "Vegan", "Keto", "Paleo", "Gluten-Free", "Dairy-Free", "Low-Carb", "Mediterranean"].map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox
                        id={diet}
                        checked={formData.dietaryRestrictions.includes(diet)}
                        onCheckedChange={(checked) => handleArrayUpdate("dietaryRestrictions", diet, checked)}
                      />
                      <Label htmlFor={diet}>{diet}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allergies">Food Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => updateFormData("allergies", e.target.value)}
                  placeholder="List any food allergies (e.g., nuts, shellfish, eggs)"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="foodDislikes">Foods You Dislike</Label>
                <Textarea
                  id="foodDislikes"
                  value={formData.foodDislikes}
                  onChange={(e) => updateFormData("foodDislikes", e.target.value)}
                  placeholder="List foods you prefer to avoid"
                  rows={3}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Cuisine Preferences (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Italian", "Asian", "Mexican", "Mediterranean", "Indian", "American", "Middle Eastern", "French"].map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={formData.cuisinePreferences.includes(cuisine)}
                        onCheckedChange={(checked) => handleArrayUpdate("cuisinePreferences", cuisine, checked)}
                      />
                      <Label htmlFor={cuisine}>{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Lifestyle & Cooking</h3>
              <p className="text-gray-600">Help us understand your daily routine</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Weekly Food Budget</Label>
                <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">$50-100/week</SelectItem>
                    <SelectItem value="medium">$100-200/week</SelectItem>
                    <SelectItem value="high">$200+/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Cooking Skill Level</Label>
                <Select value={formData.cookingSkill} onValueChange={(value) => updateFormData("cookingSkill", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Available Meal Prep Time</Label>
                <Select value={formData.mealPrepTime} onValueChange={(value) => updateFormData("mealPrepTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Less than 30 min/day</SelectItem>
                    <SelectItem value="moderate">30-60 min/day</SelectItem>
                    <SelectItem value="extensive">1+ hours/day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Meals Per Day</Label>
                <Select value={formData.mealsPerDay} onValueChange={(value) => updateFormData("mealsPerDay", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 meals</SelectItem>
                    <SelectItem value="4">3 meals + 1 snack</SelectItem>
                    <SelectItem value="5">3 meals + 2 snacks</SelectItem>
                    <SelectItem value="6">6 small meals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Health Information</h3>
              <p className="text-gray-600">Important medical and health details</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Medical Conditions (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Diabetes", "Hypertension", "High Cholesterol", "Heart Disease", "Thyroid Issues", "PCOS", "Food Sensitivities", "Digestive Issues"].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={formData.medicalConditions.includes(condition)}
                        onCheckedChange={(checked) => handleArrayUpdate("medicalConditions", condition, checked)}
                      />
                      <Label htmlFor={condition}>{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => updateFormData("medications", e.target.value)}
                  placeholder="List any medications you're currently taking"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplements">Current Supplements</Label>
                <Textarea
                  id="supplements"
                  value={formData.supplements}
                  onChange={(e) => updateFormData("supplements", e.target.value)}
                  placeholder="List any supplements you're currently taking"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Final Details</h3>
              <p className="text-gray-600">Last few questions to personalize your plan</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Workout Schedule</Label>
                <Select value={formData.workoutSchedule} onValueChange={(value) => updateFormData("workoutSchedule", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6-9 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12-3 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible/Varies</SelectItem>
                    <SelectItem value="none">No regular workouts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Sleep Schedule</Label>
                <Select value={formData.sleepSchedule} onValueChange={(value) => updateFormData("sleepSchedule", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sleep pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early">Early (9-10 PM to 5-6 AM)</SelectItem>
                    <SelectItem value="normal">Normal (10-11 PM to 6-7 AM)</SelectItem>
                    <SelectItem value="late">Late (11+ PM to 7+ AM)</SelectItem>
                    <SelectItem value="irregular">Irregular/Shift work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Current Stress Level</Label>
                <Select value={formData.stressLevel} onValueChange={(value) => updateFormData("stressLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stress level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="very-high">Very High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nutrition Assessment</h2>
          <Progress value={progress} className="max-w-md mx-auto mb-4" />
          <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            {renderStep()}
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center space-x-2"
              >
                <span>{currentStep === totalSteps ? "Complete Assessment" : "Next"}</span>
                {currentStep === totalSteps ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientOnboarding;
