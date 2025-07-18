import { useNavigate } from "react-router-dom";
import { Shield, Search, Users, ArrowLeft, Wallet } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function RoleSelection() {
  const navigate = useNavigate();
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
                className="text-gray-300 hover:text-white p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">
                  SecureScout
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Wallet className="w-4 h-4" />
              <span className="text-sm">Wallet Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Role Selection Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Are you looking to hire services or provide them? Select your role
              to get started with SecureScout.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Scouter Card */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 cursor-pointer group">
              <CardHeader className="text-center pb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-white text-3xl mb-4">
                  I'm a Scouter
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  I need services performed remotely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Post service requests</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Browse and hire verified agents</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Secure payments via smart contracts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Get real-time updates and proof</span>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/scouter-registration")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-3 text-lg mt-6"
                >
                  Continue as Scouter
                </Button>
              </CardContent>
            </Card>

            {/* Agent Card */}
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 cursor-pointer group">
              <CardHeader className="text-center pb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-white text-3xl mb-4">
                  I'm an Agent
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  I want to provide services and earn crypto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Browse available service requests</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Build your reputation and ratings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Earn crypto for completed tasks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Instant payments via blockchain</span>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/agent-registration")}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 py-3 text-lg mt-6"
                >
                  Continue as Agent
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400">
              Don't worry, you can always switch roles later or create multiple
              accounts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
