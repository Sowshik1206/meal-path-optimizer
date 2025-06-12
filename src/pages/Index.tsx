
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Target, TrendingUp, Users, Zap, Shield } from "lucide-react";
import ClientOnboarding from "@/components/ClientOnboarding";
import Dashboard from "@/components/Dashboard";
import MealPlanGenerator from "@/components/MealPlanGenerator";

const Index = () => {
  const [currentView, setCurrentView] = useState("landing");
  const [clientData, setClientData] = useState(null);

  const handleOnboardingComplete = (data) => {
    setClientData(data);
    setCurrentView("dashboard");
  };

  if (currentView === "onboarding") {
    return <ClientOnboarding onComplete={handleOnboardingComplete} />;
  }

  if (currentView === "dashboard") {
    return <Dashboard clientData={clientData} onNavigate={setCurrentView} />;
  }

  if (currentView === "meal-planner") {
    return <MealPlanGenerator clientData={clientData} onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              NutriPlan AI
            </h1>
          </div>
          <Button 
            onClick={() => setCurrentView("onboarding")}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
          >
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200">
            AI-Powered Nutrition Planning
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Personalized Nutrition Plans That Actually Work
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create evidence-based, customized meal plans for your clients using advanced AI. 
            Track progress, achieve goals, and transform lives with precision nutrition planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setCurrentView("onboarding")}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
            >
              Start Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-green-200 hover:bg-green-50 px-8 py-3 text-lg"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">
            Everything You Need for Successful Nutrition Planning
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From initial assessment to goal achievement, our platform provides comprehensive tools for nutrition professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Client Assessment</CardTitle>
              <CardDescription>
                Comprehensive intake forms that capture demographics, goals, restrictions, and lifestyle factors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Health goals & activity levels</li>
                <li>• Dietary restrictions & allergies</li>
                <li>• Budget & cooking preferences</li>
                <li>• Medical conditions tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Advanced Nutrition Engine</CardTitle>
              <CardDescription>
                Precise caloric and macronutrient calculations using multiple validated formulas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Harris-Benedict & Mifflin-St Jeor</li>
                <li>• Optimal macro ratios</li>
                <li>• Micronutrient requirements</li>
                <li>• Workout nutrition timing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">AI Meal Planning</CardTitle>
              <CardDescription>
                Generate weekly meal plans with recipes, shopping lists, and meal prep guidance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Weekly meal plans</li>
                <li>• Recipe recommendations</li>
                <li>• Shopping list generation</li>
                <li>• Meal prep guidance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Progress Tracking</CardTitle>
              <CardDescription>
                Monitor client progress with comprehensive analytics and visual reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Weight & measurement tracking</li>
                <li>• Photo progress documentation</li>
                <li>• Nutritional analysis</li>
                <li>• Habit formation metrics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Professional Grade</CardTitle>
              <CardDescription>
                Built for nutrition professionals with enterprise-level security and compliance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• HIPAA-compliant data handling</li>
                <li>• Professional dashboards</li>
                <li>• Export & reporting tools</li>
                <li>• Third-party integrations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Goal Achievement</CardTitle>
              <CardDescription>
                Evidence-based approach that delivers measurable results for every client.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Adherence rate optimization</li>
                <li>• Measurable health outcomes</li>
                <li>• Client engagement tools</li>
                <li>• Success tracking metrics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Nutrition Practice?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of nutrition professionals creating better outcomes for their clients.
            </p>
            <Button 
              size="lg"
              onClick={() => setCurrentView("onboarding")}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Start Your Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-2xl font-bold">NutriPlan AI</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering nutrition professionals with AI-driven personalized meal planning.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 NutriPlan AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
