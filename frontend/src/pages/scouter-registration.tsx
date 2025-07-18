import type React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  ArrowLeft,
  User,
  Wallet,
  CheckCircle,
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
import { LocationSearch } from "../components/LocationSearch";
import {
  useRegisterScoutWithoutGasConfig,
  useCheckIfScoutExists,
  useAccount,
  formatAddress,
} from "../services/contractService";
import { toast } from "sonner";

export default function ScouterRegistration() {
  const navigate = useNavigate();
  const { address: walletAddress, isConnected } = useAccount();

  // Smart contract hooks
  const registerScout = useRegisterScoutWithoutGasConfig();
  const { data: isScoutExists, isLoading: checkingScout } =
    useCheckIfScoutExists(walletAddress);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user is already registered as scout
  useEffect(() => {
    if (isConnected && walletAddress && !checkingScout && isScoutExists) {
      toast.info("You are already registered as a scout!");
      navigate("/scouter-dashboard");
    }
  }, [isConnected, walletAddress, checkingScout, isScoutExists, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
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
      await registerScout(
        formData.displayName,
        formData.email,
        formData.location
      );

      toast.success("Scout registration successful!");
      navigate("/scouter-dashboard");
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
              Please connect your wallet to register as a scout.
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

  if (checkingScout) {
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
              Scout Registration
            </h1>
            <p className="text-slate-300 mt-1">
              Join our platform to find trusted security professionals
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
              Scout Profile
            </CardTitle>
            <CardDescription className="text-slate-300">
              Complete your profile to start posting jobs and finding agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-white">
                  Display Name *
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    handleInputChange("displayName", e.target.value)
                  }
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="Enter your display name"
                  required
                />
                {errors.displayName && (
                  <p className="text-red-400 text-sm">{errors.displayName}</p>
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

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Location *
                </Label>
                <LocationSearch
                  value={formData.location}
                  onChange={(location) =>
                    handleInputChange("location", location)
                  }
                  placeholder="Search for your location..."
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
                    Register as Scout
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
