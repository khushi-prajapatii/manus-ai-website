import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Users, Flame, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import recipesData from "../recipes-data.json";

/**
 * Design Philosophy: Warm Spice Market
 * - Detailed recipe view with beautiful imagery
 * - Clear hierarchy for ingredients and instructions
 * - Warm color accents and typography
 */

interface Recipe {
  id: number;
  name: string;
  category: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  spiceLevel: string;
  description: string;
  image: string;
  ingredients: Array<{
    item: string;
    amount: string;
    unit: string;
  }>;
  instructions: string[];
  tips: string;
  nutritionPerServing: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = recipesData.recipes.find((r) => r.id === parseInt(id!)) as Recipe | undefined;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] to-[#FFFFFF] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#3D3D3D]">Recipe Not Found</h1>
          <p className="text-lg text-[#6B6B6B]">The recipe you're looking for doesn't exist.</p>
          <Link href="/">
            <a>
              <Button className="bg-[#C85A3A] hover:bg-[#A84830] text-white">Back to Recipes</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const getTotalTime = recipe.prepTime + recipe.cookTime;

  const getSpiceLevelColor = (level: string) => {
    switch (level) {
      case "Mild":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hot":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-blue-100 text-blue-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] to-[#FFFFFF]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8D7C3] shadow-sm">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/">
            <a>
              <Button variant="ghost" size="icon" className="hover:bg-[#C85A3A]/10">
                <ArrowLeft className="h-5 w-5 text-[#C85A3A]" />
              </Button>
            </a>
          </Link>
          <h1 className="text-2xl font-bold text-[#C85A3A]">Veg Recipes</h1>
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{recipe.name}</h1>
          <p className="text-lg md:text-xl text-[#E8D7C3] max-w-2xl">{recipe.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Ingredients & Instructions */}
          <div className="md:col-span-2 space-y-12">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 border-0 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-[#C85A3A]" />
                  <span className="text-sm font-semibold text-[#6B6B6B]">Total Time</span>
                </div>
                <p className="text-2xl font-bold text-[#3D3D3D]">{getTotalTime} min</p>
              </Card>

              <Card className="p-4 border-0 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-[#C85A3A]" />
                  <span className="text-sm font-semibold text-[#6B6B6B]">Servings</span>
                </div>
                <p className="text-2xl font-bold text-[#3D3D3D]">{recipe.servings}</p>
              </Card>

              <Card className="p-4 border-0 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-5 w-5 text-[#C85A3A]" />
                  <span className="text-sm font-semibold text-[#6B6B6B]">Difficulty</span>
                </div>
                <p className="text-lg font-bold text-[#3D3D3D]">{recipe.difficulty}</p>
              </Card>

              <Card className="p-4 border-0 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-[#C85A3A]" />
                  <span className="text-sm font-semibold text-[#6B6B6B]">Spice Level</span>
                </div>
                <p className="text-lg font-bold text-[#3D3D3D]">{recipe.spiceLevel}</p>
              </Card>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-[#C85A3A]">
              <h2 className="text-3xl font-bold text-[#3D3D3D] mb-6">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#3D3D3D]">
                    <div className="w-6 h-6 rounded-full bg-[#F4A460] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{ingredient.item}</span>
                      <span className="text-[#6B6B6B] ml-2">
                        — {ingredient.amount} {ingredient.unit}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-[#6B8E6F]">
              <h2 className="text-3xl font-bold text-[#3D3D3D] mb-6">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#6B8E6F] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-[#3D3D3D] leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            <div className="bg-[#F5E6D3] rounded-lg p-8 border-2 border-[#D4AF37]">
              <h3 className="text-2xl font-bold text-[#3D3D3D] mb-3">💡 Chef's Tips</h3>
              <p className="text-[#3D3D3D] leading-relaxed">{recipe.tips}</p>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            {/* Recipe Info Card */}
            <Card className="p-6 border-0 bg-white shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-[#3D3D3D] mb-4">Recipe Info</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#6B6B6B] font-semibold mb-1">Category</p>
                  <Badge className="bg-[#F4A460] text-[#3D3D3D]">{recipe.category}</Badge>
                </div>

                <div>
                  <p className="text-sm text-[#6B6B6B] font-semibold mb-1">Cuisine</p>
                  <Badge className="bg-[#6B8E6F] text-white">{recipe.cuisine}</Badge>
                </div>

                <div>
                  <p className="text-sm text-[#6B6B6B] font-semibold mb-1">Difficulty</p>
                  <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                </div>

                <div>
                  <p className="text-sm text-[#6B6B6B] font-semibold mb-1">Spice Level</p>
                  <Badge className={getSpiceLevelColor(recipe.spiceLevel)}>{recipe.spiceLevel}</Badge>
                </div>
              </div>

              <div className="border-t border-[#E8D7C3] mt-6 pt-6">
                <h4 className="text-lg font-bold text-[#3D3D3D] mb-4">Nutrition per Serving</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Calories</span>
                    <span className="font-semibold text-[#C85A3A]">{recipe.nutritionPerServing.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Protein</span>
                    <span className="font-semibold text-[#C85A3A]">{recipe.nutritionPerServing.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Carbs</span>
                    <span className="font-semibold text-[#C85A3A]">{recipe.nutritionPerServing.carbs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6B6B]">Fat</span>
                    <span className="font-semibold text-[#C85A3A]">{recipe.nutritionPerServing.fat}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-[#C85A3A] hover:bg-[#A84830] text-white py-3 rounded-lg font-semibold">
                Save Recipe
              </Button>
            </Card>

            {/* Related Recipes */}
            <Card className="p-6 border-0 bg-white shadow-lg">
              <h3 className="text-xl font-bold text-[#3D3D3D] mb-4">Similar Recipes</h3>
              <div className="space-y-3">
                {recipesData.recipes
                  .filter((r) => r.category === recipe.category && r.id !== recipe.id)
                  .slice(0, 3)
                  .map((relatedRecipe) => (
                    <Link key={relatedRecipe.id} href={`/recipe/${relatedRecipe.id}`}>
                      <a className="block p-3 rounded-lg hover:bg-[#F5E6D3] transition-colors border border-[#E8D7C3]">
                        <p className="font-semibold text-[#3D3D3D] hover:text-[#C85A3A]">{relatedRecipe.name}</p>
                        <p className="text-xs text-[#6B6B6B]">{relatedRecipe.cuisine}</p>
                      </a>
                    </Link>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3D3D3D] text-white py-8 mt-16">
        <div className="container text-center">
          <p className="text-[#E8D7C3]">
            © 2024 Vegetarian Indian Recipes. Celebrating the richness of Indian cuisine.
          </p>
        </div>
      </footer>
    </div>
  );
}
