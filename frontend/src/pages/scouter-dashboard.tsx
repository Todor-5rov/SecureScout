import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Search,
  MapPin,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  Star,
  MessageSquare,
  Plus,
  Filter,
  Wallet,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { LocationSearch } from "../components/LocationSearch";
import { MapboxMap } from "../components/MapboxMap";
import {
  useGetScout,
  useGetAllAgents,
  useGetAgentsByLocation,
  useGetAgentsByService,
  useAccount,
  formatAddress,
  formatPAS,
  Agent,
} from "../services/contractService";
import { toast } from "sonner";

export default function ScouterDashboard() {
  const navigate = useNavigate();
  const { address: walletAddress, isConnected } = useAccount();

  // Smart contract hooks
  const { data: scoutData, isLoading: loadingScout } =
    useGetScout(walletAddress);
  const { data: allAgents, isLoading: loadingAgents } = useGetAllAgents();
  const { data: agentsByLocation, isLoading: loadingLocationAgents } =
    useGetAgentsByLocation();

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Service types for filtering
  const serviceTypes = [
    "Vehicle Inspections",
    "Property Inspections",
    "Security Assessments",
    "Quality Control",
    "Compliance Audits",
    "Technical Reviews",
    "Safety Inspections",
    "Environmental Assessments",
    "Documentation Reviews",
    "Other",
  ];

  // Filter agents based on search, location, and service
  useEffect(() => {
    if (!allAgents) return;

    let filtered = allAgents.filter((agent: Agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        !selectedLocation ||
        agent.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesService =
        !selectedService || agent.serviceType === selectedService;

      return matchesSearch && matchesLocation && matchesService;
    });

    setFilteredAgents(filtered);
  }, [allAgents, searchQuery, selectedLocation, selectedService]);

  // Handle agent contact
  const handleContactAgent = async (agentAddress: string) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    // For now, just show a toast - in a real app, this would open a chat or contact form
    toast.info(`Contacting agent ${formatAddress(agentAddress)}`);
  };

  // Handle job posting
  const handlePostJob = () => {
    navigate("/post-job"); // This route would need to be implemented
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Wallet Not Connected</CardTitle>
            <CardDescription className="text-slate-300">
              Please connect your wallet to access the scout dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate("/")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loadingScout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardContent className="flex items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-white">Loading your profile...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!scoutData || !scoutData.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Not Registered</CardTitle>
            <CardDescription className="text-slate-300">
              You need to register as a scout to access this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate("/scouter-registration")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Register as Scout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-white hover:bg-slate-800"
              >
                <Shield className="h-6 w-6 mr-2" />
                SecureScout
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-mono">
                  {walletAddress ? formatAddress(walletAddress) : "Connected"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {scoutData.displayName}!
          </h1>
          <p className="text-slate-300">
            Find trusted agents for your security needs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Total Jobs Posted</p>
                  <p className="text-2xl font-bold text-white">
                    {scoutData.totalJobsPosted
                      ? Number(scoutData.totalJobsPosted)
                      : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-600 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Total Spent</p>
                  <p className="text-2xl font-bold text-white">
                    {scoutData.totalSpent
                      ? formatPAS(scoutData.totalSpent)
                      : "0"}{" "}
                    PAS
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-600 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Average Rating</p>
                  <p className="text-2xl font-bold text-white">
                    {scoutData.averageRating
                      ? Number(scoutData.averageRating) / 10
                      : 0}
                    /5
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Location</p>
                  <p className="text-lg font-semibold text-white truncate">
                    {scoutData.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Find Agents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Search
                </label>
                <Input
                  placeholder="Search agents by name or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Location
                </label>
                <LocationSearch
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  placeholder="Filter by location..."
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-md px-3 py-2"
                >
                  <option value="">All Services</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-300">
                {filteredAgents.length} agents found
              </p>
              <Button
                onClick={handlePostJob}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agents Grid */}
        {loadingAgents ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-white">Loading agents...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent: Agent) => (
              <Card
                key={agent.walletAddress}
                className="bg-slate-800/50 border-slate-700"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">{agent.name}</CardTitle>
                      <CardDescription className="text-slate-300">
                        {agent.serviceType}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={agent.isAvailable ? "default" : "secondary"}
                      className={
                        agent.isAvailable ? "bg-green-600" : "bg-gray-600"
                      }
                    >
                      {agent.isAvailable ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{agent.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-300">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">
                      {formatPAS(agent.priceInPAS)} PAS per job
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-300">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">
                      {agent.averageRating
                        ? Number(agent.averageRating) / 10
                        : 0}
                      /5 ({agent.totalRatings ? Number(agent.totalRatings) : 0}{" "}
                      reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-300">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">
                      {agent.completedJobs ? Number(agent.completedJobs) : 0}{" "}
                      jobs completed
                    </span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => handleContactAgent(agent.walletAddress)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button
                      onClick={() => navigate(`/agent/${agent.walletAddress}`)}
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-white hover:bg-slate-700"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loadingAgents && filteredAgents.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">
                No agents found
              </h3>
              <p className="text-slate-300">
                Try adjusting your search criteria or posting a job to attract
                agents.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
