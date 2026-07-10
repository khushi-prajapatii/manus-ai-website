import { useState, useMemo } from "react";
import { Search, Clock, Users, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import recipesData from "../recipes-data.json";

/**
 * Design Philosophy: Warm Spice Market
 * - Warm earth tones (terracotta, saffron, sage)
 * - Asymmetric layouts with generous whitespace
 * - Hand-drawn spice illustrations as accents
 * - Playfair Display for headings, Lato for body
 * - Gentle animations on hover and scroll
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
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const recipes: Recipe[] = recipesData.recipes;

  // Extract unique categories, cuisines, and difficulties
  const categories = Array.from(new Set(recipes.map((r) => r.category)));
  const cuisines = Array.from(new Set(recipes.map((r) => r.cuisine)));
  const difficulties = Array.from(new Set(recipes.map((r) => r.difficulty)));

  // Filter recipes based on search and filters
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
      const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine;
      const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesCuisine && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedCuisine, selectedDifficulty]);

  const getTotalTime = (prep: number, cook: number) => prep + cook;

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
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/logo-mark_51ad6819.png" alt="Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-[#C85A3A]">Veg Recipes</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-[#3D3D3D] hover:text-[#C85A3A] transition-colors font-medium">
              Recipes
            </a>
            <a href="#" className="text-[#3D3D3D] hover:text-[#C85A3A] transition-colors font-medium">
              Categories
            </a>
            <a href="#" className="text-[#3D3D3D] hover:text-[#C85A3A] transition-colors font-medium">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-[#3D3D3D] leading-tight">
              Discover Authentic <span className="text-[#C85A3A]">Vegetarian</span> Indian Recipes
            </h1>
            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              Explore a curated collection of the best vegetarian Indian recipes. From classic curries to quick weeknight dinners, find your next favorite dish.
            </p>
            <div className="flex gap-4 pt-4">
              <Button className="bg-[#C85A3A] hover:bg-[#A84830] text-white px-8 py-6 text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105">
                Explore Recipes
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#C85A3A] text-[#C85A3A] hover:bg-[#C85A3A]/5 px-8 py-6 text-lg rounded-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative h-96 md:h-full rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/manus-storage/hero-spices_42239d08.png"
              alt="Colorful Indian spices"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#C85A3A]/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="container py-12 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-4 text-[#C85A3A] h-5 w-5" />
          <Input
            type="text"
            placeholder="Search recipes by name or ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 text-lg border-2 border-[#E8D7C3] rounded-lg focus:border-[#C85A3A] focus:ring-2 focus:ring-[#C85A3A]/20"
          />
        </div>

        {/* Filter Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#3D3D3D]">Filter by:</h3>

          {/* Category Filter */}
          <div>
            <p className="text-sm font-medium text-[#6B6B6B] mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full ${
                  selectedCategory === null
                    ? "bg-[#C85A3A] text-white"
                    : "border-[#E8D7C3] text-[#3D3D3D] hover:border-[#C85A3A]"
                }`}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full ${
                    selectedCategory === cat
                      ? "bg-[#C85A3A] text-white"
                      : "border-[#E8D7C3] text-[#3D3D3D] hover:border-[#C85A3A]"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Cuisine Filter */}
          <div>
            <p className="text-sm font-medium text-[#6B6B6B] mb-2">Cuisine</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCuisine === null ? "default" : "outline"}
                onClick={() => setSelectedCuisine(null)}
                className={`rounded-full ${
                  selectedCuisine === null
                    ? "bg-[#C85A3A] text-white"
                    : "border-[#E8D7C3] text-[#3D3D3D] hover:border-[#C85A3A]"
                }`}
              >
                All
              </Button>
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`rounded-full ${
                    selectedCuisine === cuisine
                      ? "bg-[#C85A3A] text-white"
                      : "border-[#E8D7C3] text-[#3D3D3D] hover:border-[#C85A3A]"
                  }`}
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <p className="text-sm font-medium text-[#6B6B6B] mb-2">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedDifficulty === null ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(null)}
                className={`rounded-full ${
                  selectedDifficulty === null
                    ? "bg-[#C85A3A] text-white"
                    : "border-[#E8D7C3] text-[#3D3D3D] hover:border-[#C85A3A]"
                }`}
              >
                All
              </Button>
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`rounded-full ${
                    selectedDifficulty === diff
                      ? "bg-[#C85A3A] text-white"
                      : "border-[#E8D7C3] text-[#3D3D3D] hover:border-[#C85A3A]"
                  }`}
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="container mb-8">
        <p className="text-[#6B6B6B] font-medium">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      </section>

      {/* Recipe Grid */}
      <section className="container pb-16">
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                <a className="group">
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col border-0 bg-white">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-[#E8D7C3]">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow space-y-3">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-[#3D3D3D] group-hover:text-[#C85A3A] transition-colors">
                        {recipe.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#6B6B6B] line-clamp-2">{recipe.description}</p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getDifficultyColor(recipe.difficulty)} text-xs font-semibold`}>
                          {recipe.difficulty}
                        </Badge>
                        <Badge className={`${getSpiceLevelColor(recipe.spiceLevel)} text-xs font-semibold`}>
                          {recipe.spiceLevel}
                        </Badge>
                      </div>

                      {/* Meta Info */}
                      <div className="flex gap-4 text-sm text-[#6B6B6B] pt-2 border-t border-[#E8D7C3]">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-[#C85A3A]" />
                          <span>{getTotalTime(recipe.prepTime, recipe.cookTime)} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-[#C85A3A]" />
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-[#6B6B6B] mb-4">No recipes found matching your filters.</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
                setSelectedCuisine(null);
                setSelectedDifficulty(null);
              }}
              className="bg-[#C85A3A] hover:bg-[#A84830] text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

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
