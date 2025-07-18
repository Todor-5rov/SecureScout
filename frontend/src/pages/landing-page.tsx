import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Wallet,
  Globe,
  Lock,
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
import { useConnect, useAccount } from "wagmi";
import {
  useGetAgent,
  useGetScout,
  formatAddress,
} from "../services/contractService";
import { toast } from "sonner";

export default function LandingPage() {
  const navigate = useNavigate();
  const { connect, connectors, isPending } = useConnect();
  const { address: walletAddress, isConnected } = useAccount();

  // Smart contract hooks for checking user registration
  const { data: agentData, isLoading: loadingAgent } =
    useGetAgent(walletAddress);
  const { data: scoutData, isLoading: loadingScout } =
    useGetScout(walletAddress);

  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);

  // Handle wallet connection
  const handleConnectWallet = () => {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  // Check user registration status and redirect accordingly
  useEffect(() => {
    if (isConnected && walletAddress && !loadingAgent && !loadingScout) {
      setIsCheckingRegistration(true);

      // Check if user is registered as agent or scout
      if (agentData && agentData.isActive) {
        toast.info("Welcome back! Redirecting to your agent dashboard.");
        navigate("/agent-dashboard");
      } else if (scoutData && scoutData.isActive) {
        toast.info("Welcome back! Redirecting to your scout dashboard.");
        navigate("/scouter-dashboard");
      }

      setIsCheckingRegistration(false);
    }
  }, [
    isConnected,
    walletAddress,
    loadingAgent,
    loadingScout,
    agentData,
    scoutData,
    navigate,
  ]);

  const handleGetStarted = () => {
    if (!isConnected) {
      handleConnectWallet();
    } else {
      navigate("/role-selection");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SecureScout</span>
            </div>
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-2 text-green-400">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-mono">
                    {walletAddress ? formatAddress(walletAddress) : "Connected"}
                  </span>
                </div>
              ) : (
                <Button
                  onClick={handleConnectWallet}
                  disabled={isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Loading State */}
      {isCheckingRegistration && (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
            <CardContent className="flex items-center justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-white">
                Checking your registration...
              </span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      {!isCheckingRegistration && (
        <>
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Secure
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {" "}
                  Scout
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The decentralized platform connecting trusted security
                professionals with clients worldwide through blockchain-powered
                escrow and smart contracts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4"
                >
                  {isConnected ? "Get Started" : "Connect Wallet"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {isConnected && (
                  <Button
                    onClick={() => navigate("/role-selection")}
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4"
                  >
                    Choose Role
                  </Button>
                )}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-16">
                Why Choose SecureScout?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Secure Escrow</CardTitle>
                    <CardDescription className="text-gray-300">
                      All payments are held in smart contract escrow until job
                      completion, ensuring both parties are protected.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">
                      Verified Professionals
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      All agents are verified and rated, with transparent
                      reputation systems built on the blockchain.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">Global Network</CardTitle>
                    <CardDescription className="text-gray-300">
                      Access security professionals worldwide with
                      location-based matching and instant communication.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-16">
                How It Works
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Connect Wallet
                  </h3>
                  <p className="text-gray-300">
                    Connect your Web3 wallet to access the platform securely.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Choose Role</h3>
                  <p className="text-gray-300">
                    Register as a Scout to post jobs or as an Agent to provide
                    services.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Find & Connect
                  </h3>
                  <p className="text-gray-300">
                    Browse available agents or post job requests with secure
                    escrow payments.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Complete & Earn
                  </h3>
                  <p className="text-gray-300">
                    Complete jobs, get rated, and receive payments automatically
                    through smart contracts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="py-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Get Started?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Join thousands of security professionals and clients already
                    using SecureScout.
                  </p>
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4"
                  >
                    {isConnected ? "Choose Your Role" : "Connect Wallet"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
