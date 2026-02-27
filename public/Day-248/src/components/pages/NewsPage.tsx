import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter,
  ArrowRight,
  Newspaper,
  Video,
  FileText
} from "lucide-react";
import { Page } from "../Router";

interface NewsPageProps {
  setCurrentPage: (page: Page) => void;
}

export function NewsPage({ setCurrentPage }: NewsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All News" },
    { value: "diplomatic", label: "Diplomatic Relations" },
    { value: "consular", label: "Consular Services" },
    { value: "trade", label: "Trade & Commerce" },
    { value: "cultural", label: "Cultural Exchange" },
    { value: "announcements", label: "Announcements" }
  ];

  const newsArticles = [
    {
      id: 1,
      title: "India-ASEAN Summit 2025: Strengthening Regional Partnerships",
      excerpt: "Prime Minister participates in the annual summit focusing on trade, security, and cultural cooperation between India and ASEAN nations. The summit addresses key regional challenges and opportunities.",
      category: "diplomatic",
      categoryLabel: "Diplomatic Relations",
      date: "2025-01-28",
      time: "2 hours ago",
      author: "MEA Press Division",
      image: "https://images.unsplash.com/photo-1713930517076-18a9fd284cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBsb21hdGljJTIwbWVldGluZyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzU2NDYzNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true,
      type: "article"
    },
    {
      id: 2,
      title: "New Digital Platform for Enhanced Consular Services",
      excerpt: "Ministry launches comprehensive digital platform offering streamlined passport, visa, and attestation services with improved user experience and faster processing times.",
      category: "consular",
      categoryLabel: "Consular Services",
      date: "2025-01-27",
      time: "1 day ago",
      author: "Digital Services Team",
      type: "announcement"
    },
    {
      id: 3,
      title: "External Affairs Minister's Productive Visit to Middle East",
      excerpt: "Successful diplomatic engagement with key Middle Eastern partners results in new bilateral agreements on energy, technology, and cultural cooperation.",
      category: "diplomatic",
      categoryLabel: "Diplomatic Relations",
      date: "2025-01-26",
      time: "2 days ago",
      author: "MEA Spokesperson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      type: "article"
    },
    {
      id: 4,
      title: "Cultural Exchange Program with Latin America Announced",
      excerpt: "New initiative promotes educational and cultural ties with Latin American countries through student exchanges, artistic collaborations, and language programs.",
      category: "cultural",
      categoryLabel: "Cultural Exchange",
      date: "2025-01-25",
      time: "3 days ago",
      author: "Cultural Division",
      type: "announcement"
    },
    {
      id: 5,
      title: "India's Trade Relations Show Remarkable Growth in 2024",
      excerpt: "Ministry reports significant increase in bilateral trade partnerships and successful completion of multiple free trade agreement negotiations.",
      category: "trade",
      categoryLabel: "Trade & Commerce",
      date: "2025-01-24",
      time: "4 days ago",
      author: "Economic Division",
      type: "report"
    },
    {
      id: 6,
      title: "Emergency Travel Guidelines Updated for Indian Nationals",
      excerpt: "Important updates to emergency travel procedures and documentation requirements for Indian citizens abroad, including new health protocols.",
      category: "consular",
      categoryLabel: "Consular Services",
      date: "2025-01-23",
      time: "5 days ago",
      author: "Consular Division",
      type: "alert"
    }
  ];

  const pressReleases = [
    {
      title: "Joint Statement on India-France Strategic Partnership",
      date: "2025-01-28",
      type: "Joint Statement"
    },
    {
      title: "External Affairs Minister's Statement on Global Climate Action",
      date: "2025-01-26",
      type: "Statement"
    },
    {
      title: "Bilateral Trade Agreement with Nordic Countries",
      date: "2025-01-24",
      type: "Agreement"
    },
    {
      title: "India's Participation in UN Security Council Session",
      date: "2025-01-22",
      type: "Report"
    }
  ];

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "report":
        return <FileText className="h-4 w-4" />;
      default:
        return <Newspaper className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-100 text-red-800";
      case "announcement":
        return "bg-blue-100 text-blue-800";
      case "report":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => setCurrentPage('home')}
                  className="cursor-pointer hover:text-primary"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>News & Media</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4">Latest Updates</Badge>
            <h1 className="text-4xl font-bold mb-6">News & Media Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay informed about India's diplomatic activities, foreign policy developments, and international engagements through our comprehensive news coverage.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main News Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {filteredNews.length > 0 && filteredNews[0].featured && (
              <Card className="overflow-hidden shadow-lg">
                <div className="relative">
                  <ImageWithFallback
                    src={filteredNews[0].image || "https://images.unsplash.com/photo-1713930517076-18a9fd284cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBsb21hdGljJTIwbWVldGluZyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzU2NDYzNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080"}
                    alt={filteredNews[0].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-red-600 hover:bg-red-700">Featured</Badge>
                    <Badge variant="outline" className="bg-white">{filteredNews[0].categoryLabel}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {filteredNews[0].date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {filteredNews[0].time}
                    </span>
                    <span>By {filteredNews[0].author}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{filteredNews[0].title}</h2>
                  <p className="text-muted-foreground mb-6">{filteredNews[0].excerpt}</p>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setCurrentPage('news-detail')}
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* News List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Latest News</h2>
              {filteredNews.slice(filteredNews[0]?.featured ? 1 : 0).map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {article.image && (
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge 
                            variant="outline" 
                            className={getTypeBadgeColor(article.type)}
                          >
                            <span className="mr-1">{getTypeIcon(article.type)}</span>
                            {article.categoryLabel}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{article.time}</span>
                        </div>
                        <h3 
                          className="font-semibold mb-2 hover:text-primary cursor-pointer transition-colors"
                          onClick={() => setCurrentPage('news-detail')}
                        >
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">By {article.author}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCurrentPage('news-detail')}
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Press Releases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Press Releases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pressReleases.map((release, index) => (
                  <div key={index} className="pb-4 border-b last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-sm mb-2 hover:text-primary cursor-pointer transition-colors">
                      {release.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {release.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{release.date}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Press Releases
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <Button
                      key={category.value}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 text-left hover:bg-secondary"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{category.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscribe */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-3">Stay Updated</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Get the latest news and updates from the Ministry of External Affairs
                </p>
                <Button variant="secondary" className="w-full">
                  Subscribe to Newsletter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}