
const NutritionCalculator = {
  // Calculate BMR using Mifflin-St Jeor equation
  calculateBMR: (weight, height, age, gender) => {
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);
    
    if (gender === "male") {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) + 5;
    } else {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) - 161;
    }
  },

  // Calculate BMR using Harris-Benedict equation
  calculateBMRHarrisBenedict: (weight, height, age, gender) => {
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);
    
    if (gender === "male") {
      return 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears);
    } else {
      return 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears);
    }
  },

  // Activity multipliers
  getActivityMultiplier: (activityLevel) => {
    const multipliers = {
      "sedentary": 1.2,
      "light": 1.375,
      "moderate": 1.55,
      "high": 1.725,
      "extreme": 1.9
    };
    return multipliers[activityLevel] || 1.2;
  },

  // Calculate daily calorie needs
  calculateDailyCalories: (clientData) => {
    const bmr = NutritionCalculator.calculateBMR(
      clientData.weight, 
      clientData.height, 
      clientData.age, 
      clientData.gender
    );
    
    const activityMultiplier = NutritionCalculator.getActivityMultiplier(clientData.activityLevel);
    const tdee = bmr * activityMultiplier;
    
    // Adjust based on goal
    let calorieAdjustment = 0;
    if (clientData.primaryGoal === "weight-loss") {
      calorieAdjustment = -500; // 500 calorie deficit for ~1lb/week loss
    } else if (clientData.primaryGoal === "muscle-gain") {
      calorieAdjustment = 300; // 300 calorie surplus for muscle gain
    } else if (clientData.primaryGoal === "athletic-performance") {
      calorieAdjustment = 200; // Slight surplus for performance
    }
    
    return Math.round(tdee + calorieAdjustment);
  },

  // Calculate macronutrient distribution
  calculateMacros: (calories, primaryGoal) => {
    let proteinRatio, carbRatio, fatRatio;
    
    switch (primaryGoal) {
      case "weight-loss":
        proteinRatio = 0.35; // High protein for satiety and muscle preservation
        fatRatio = 0.25;
        carbRatio = 0.40;
        break;
      case "muscle-gain":
        proteinRatio = 0.30; // High protein for muscle building
        fatRatio = 0.25;
        carbRatio = 0.45;
        break;
      case "athletic-performance":
        proteinRatio = 0.25;
        fatRatio = 0.25;
        carbRatio = 0.50; // Higher carbs for energy
        break;
      default:
        proteinRatio = 0.25;
        fatRatio = 0.30;
        carbRatio = 0.45;
    }
    
    return {
      protein: Math.round((calories * proteinRatio) / 4), // 4 calories per gram
      carbs: Math.round((calories * carbRatio) / 4), // 4 calories per gram
      fat: Math.round((calories * fatRatio) / 9), // 9 calories per gram
    };
  },

  // Calculate fiber needs
  calculateFiber: (age, gender) => {
    if (age < 50) {
      return gender === "male" ? 38 : 25;
    } else {
      return gender === "male" ? 30 : 21;
    }
  },

  // Calculate water needs (ml per day)
  calculateWaterNeeds: (weight, activityLevel) => {
    const baseWater = parseFloat(weight) * 35; // 35ml per kg body weight
    const activityBonus = activityLevel === "high" || activityLevel === "extreme" ? 500 : 0;
    return Math.round(baseWater + activityBonus);
  },

  // Main function to calculate all nutrition needs
  calculateDailyNeeds: (clientData) => {
    const calories = NutritionCalculator.calculateDailyCalories(clientData);
    const macros = NutritionCalculator.calculateMacros(calories, clientData.primaryGoal);
    const fiber = NutritionCalculator.calculateFiber(clientData.age, clientData.gender);
    const water = NutritionCalculator.calculateWaterNeeds(clientData.weight, clientData.activityLevel);
    
    return {
      calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      fiber,
      water,
      bmr: Math.round(NutritionCalculator.calculateBMR(
        clientData.weight, 
        clientData.height, 
        clientData.age, 
        clientData.gender
      ))
    };
  },

  // Calculate meal distribution
  calculateMealDistribution: (calories, mealsPerDay) => {
    const meals = parseInt(mealsPerDay);
    
    if (meals === 3) {
      return {
        breakfast: Math.round(calories * 0.25),
        lunch: Math.round(calories * 0.35),
        dinner: Math.round(calories * 0.40)
      };
    } else if (meals === 4) {
      return {
        breakfast: Math.round(calories * 0.25),
        lunch: Math.round(calories * 0.30),
        dinner: Math.round(calories * 0.35),
        snack: Math.round(calories * 0.10)
      };
    } else if (meals === 5) {
      return {
        breakfast: Math.round(calories * 0.25),
        lunch: Math.round(calories * 0.25),
        dinner: Math.round(calories * 0.30),
        snack1: Math.round(calories * 0.10),
        snack2: Math.round(calories * 0.10)
      };
    } else if (meals === 6) {
      return {
        meal1: Math.round(calories * 0.17),
        meal2: Math.round(calories * 0.17),
        meal3: Math.round(calories * 0.17),
        meal4: Math.round(calories * 0.17),
        meal5: Math.round(calories * 0.16),
        meal6: Math.round(calories * 0.16)
      };
    }
    
    return { breakfast: calories };
  }
};

export default NutritionCalculator;
