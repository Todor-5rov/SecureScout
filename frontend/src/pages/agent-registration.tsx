import type React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  ArrowLeft,
  User,
  Wallet,
  CheckCircle,
  MapPin,
  DollarSign,
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
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { LocationSearch } from "../components/LocationSearch";
import {
  useRegisterAgentWithoutGasConfig,
  useCheckUserRegistrationStatus,
  useAccount,
  formatAddress,
} from "../services/contractService";
import { toast } from "sonner";

// Service types from smart contract
const SERVICE_TYPES = [
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

export default function AgentRegistration() {
  const navigate = useNavigate();
  const { address: walletAddress, isConnected } = useAccount();

  // Smart contract hooks
  const registerAgent = useRegisterAgentWithoutGasConfig();
  const {
    isAgent,
    isScout,
    isRegistered,
    isLoading: checkingRegistration,
  } = useCheckUserRegistrationStatus(walletAddress);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    priceInPAS: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user is already registered as agent
  useEffect(() => {
    if (isConnected && walletAddress && !checkingRegistration) {
      if (isAgent) {
        toast.info("You are already registered as an agent!");
        navigate("/agent-dashboard");
      } else if (isScout) {
        toast.error(
          "You are already registered as a scout. You cannot register as both an agent and scout."
        );
        navigate("/scouter-dashboard");
      }
    }
  }, [
    isConnected,
    walletAddress,
    checkingRegistration,
    isAgent,
    isScout,
    navigate,
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.service) {
      newErrors.service = "Service type is required";
    }

    if (!formData.priceInPAS.trim()) {
      newErrors.priceInPAS = "Price is required";
    } else if (
      isNaN(Number(formData.priceInPAS)) ||
      Number(formData.priceInPAS) <= 0
    ) {
      newErrors.priceInPAS = "Please enter a valid price";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerAgent(
        formData.name,
        formData.email,
        formData.service,
        formData.priceInPAS,
        formData.location
      );

      toast.success("Agent registration successful!");
      navigate("/agent-dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Wallet Not Connected</CardTitle>
            <CardDescription className="text-slate-300">
              Please connect your wallet to register as an agent.
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

  if (checkingRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardContent className="flex items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-white">
              Checking registration status...
            </span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/role-selection")}
            className="text-white hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-white">
              Agent Registration
            </h1>
            <p className="text-slate-300 mt-1">
              Join our network of trusted security professionals
            </p>
          </div>
        </div>

        {/* Wallet Info */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-300">Connected Wallet</p>
                <p className="text-white font-mono text-sm">
                  {walletAddress
                    ? formatAddress(walletAddress)
                    : "Not connected"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="h-6 w-6 mr-2 text-blue-500" />
              Agent Profile
            </CardTitle>
            <CardDescription className="text-slate-300">
              Complete your profile to start receiving job requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Enter your email address"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Service Type */}
              <div className="space-y-2">
                <Label htmlFor="service" className="text-white">
                  Service Type *
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleInputChange("service", value)}
                  required
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select your main service" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {SERVICE_TYPES.map((service) => (
                      <SelectItem
                        key={service}
                        value={service}
                        className="text-white hover:bg-slate-700"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-red-400 text-sm">{errors.service}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">
                  Price per Job (PAS) *
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.priceInPAS}
                    onChange={(e) =>
                      handleInputChange("priceInPAS", e.target.value)
                    }
                    className="bg-slate-700/50 border-slate-600 text-white pl-10"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                {errors.priceInPAS && (
                  <p className="text-red-400 text-sm">{errors.priceInPAS}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Service Location *
                </Label>
                <LocationSearch
                  value={formData.location}
                  onChange={(location) =>
                    handleInputChange("location", location)
                  }
                  placeholder="Search for your service location..."
                  className="w-full"
                />
                {errors.location && (
                  <p className="text-red-400 text-sm">{errors.location}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Register as Agent
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
