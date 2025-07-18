import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Briefcase,
  DollarSign,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Play,
  Pause,
  Settings,
  Wallet,
  Loader2,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  useGetAgent,
  useGetAgentJobs,
  useGetJobRequest,
  useUpdateJobProgress,
  useStartJob,
  useSubmitJobCompletion,
  useGetAgentEarnings,
  useWithdrawEarnings,
  useSetAgentAvailability,
  useUpdateAgentPrice,
  useAccount,
  formatAddress,
  formatPAS,
  getJobStatusText,
  getJobStatusColor,
  Agent,
  JobRequest,
} from "../services/contractService";
import { toast } from "sonner";
import { Input } from "../components/ui/input";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const { address: walletAddress, isConnected } = useAccount();

  // Smart contract hooks
  const { data: agentData, isLoading: loadingAgent } =
    useGetAgent(walletAddress);
  const { data: agentJobs, isLoading: loadingJobs } =
    useGetAgentJobs(walletAddress);
  const { data: agentEarnings, isLoading: loadingEarnings } =
    useGetAgentEarnings(walletAddress);

  // Contract write functions
  const updateJobProgress = useUpdateJobProgress();
  const startJob = useStartJob();
  const submitJobCompletion = useSubmitJobCompletion();
  const withdrawEarnings = useWithdrawEarnings();
  const setAgentAvailability = useSetAgentAvailability();
  const updateAgentPrice = useUpdateAgentPrice();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobRequest | null>(null);
  const [newPrice, setNewPrice] = useState("");

  // Handle job progress update
  const handleUpdateProgress = async (
    jobId: bigint,
    progress: number,
    message: string
  ) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await updateJobProgress(jobId, progress, message);
      toast.success("Job progress updated successfully!");
    } catch (error: any) {
      console.error("Error updating progress:", error);
      toast.error(error?.message || "Failed to update progress");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle starting a job
  const handleStartJob = async (jobId: bigint) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await startJob(jobId);
      toast.success("Job started successfully!");
    } catch (error: any) {
      console.error("Error starting job:", error);
      toast.error(error?.message || "Failed to start job");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle job completion
  const handleCompleteJob = async (
    jobId: bigint,
    deliverables: string,
    proofUrls: string[]
  ) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await submitJobCompletion(jobId, deliverables, proofUrls);
      toast.success("Job completion submitted successfully!");
    } catch (error: any) {
      console.error("Error completing job:", error);
      toast.error(error?.message || "Failed to complete job");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle withdrawing earnings
  const handleWithdrawEarnings = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await withdrawEarnings();
      toast.success("Earnings withdrawn successfully!");
    } catch (error: any) {
      console.error("Error withdrawing earnings:", error);
      toast.error(error?.message || "Failed to withdraw earnings");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle availability toggle
  const handleToggleAvailability = async () => {
    if (!isConnected || !agentData) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await setAgentAvailability(!agentData.isAvailable);
      toast.success(
        `You are now ${!agentData.isAvailable ? "available" : "unavailable"} for jobs`
      );
    } catch (error: any) {
      console.error("Error updating availability:", error);
      toast.error(error?.message || "Failed to update availability");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle price update
  const handleUpdatePrice = async () => {
    if (!isConnected || !newPrice.trim()) {
      toast.error("Please enter a valid price");
      return;
    }

    setIsLoading(true);
    try {
      await updateAgentPrice(newPrice);
      toast.success("Price updated successfully!");
      setNewPrice("");
    } catch (error: any) {
      console.error("Error updating price:", error);
      toast.error(error?.message || "Failed to update price");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Wallet Not Connected</CardTitle>
            <CardDescription className="text-slate-300">
              Please connect your wallet to access the agent dashboard.
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

  if (loadingAgent) {
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

  if (!agentData || !agentData.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Not Registered</CardTitle>
            <CardDescription className="text-slate-300">
              You need to register as an agent to access this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate("/agent-registration")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Register as Agent
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
            Welcome back, {agentData.name}!
          </h1>
          <p className="text-slate-300">Manage your jobs and earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Completed Jobs</p>
                  <p className="text-2xl font-bold text-white">
                    {agentData.completedJobs
                      ? Number(agentData.completedJobs)
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
                  <p className="text-sm text-slate-300">Total Earnings</p>
                  <p className="text-2xl font-bold text-white">
                    {agentData.totalEarnings
                      ? formatPAS(agentData.totalEarnings)
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
                    {agentData.averageRating
                      ? Number(agentData.averageRating) / 10
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
                  <p className="text-sm text-slate-300">Service Area</p>
                  <p className="text-lg font-semibold text-white truncate">
                    {agentData.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleToggleAvailability}
                  disabled={isLoading}
                  variant={agentData.isAvailable ? "default" : "secondary"}
                  className={
                    agentData.isAvailable
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }
                >
                  {agentData.isAvailable ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Set Unavailable
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Set Available
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  placeholder="New price in PAS"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <Button
                  onClick={handleUpdatePrice}
                  disabled={isLoading || !newPrice.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Price
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleWithdrawEarnings}
                  disabled={
                    isLoading || !agentEarnings || Number(agentEarnings) === 0
                  }
                  className="bg-green-600 hover:bg-green-700"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Withdraw Earnings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Jobs */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Current Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingJobs ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="ml-2 text-white">Loading jobs...</span>
              </div>
            ) : agentJobs && agentJobs.length > 0 ? (
              <div className="space-y-4">
                {agentJobs.map((job: JobRequest) => (
                  <Card
                    key={job.jobId.toString()}
                    className="bg-slate-700/50 border-slate-600"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white font-semibold">
                            {job.title}
                          </h3>
                          <p className="text-slate-300 text-sm">
                            {job.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-slate-400">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {formatPAS(job.budget)} PAS
                            </span>
                            <Badge className={getJobStatusColor(job.status)}>
                              {getJobStatusText(job.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {job.status === 1 && ( // In Progress
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm text-slate-300 mb-1">
                              <span>Progress</span>
                              <span>{job.progress}%</span>
                            </div>
                            <Progress value={job.progress} className="h-2" />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() =>
                                handleUpdateProgress(
                                  job.jobId,
                                  Math.min(job.progress + 25, 100),
                                  "Progress update"
                                )
                              }
                              disabled={isLoading}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Update Progress
                            </Button>
                            <Button
                              onClick={() =>
                                handleCompleteJob(job.jobId, "Job completed", [
                                  "proof1",
                                  "proof2",
                                ])
                              }
                              disabled={isLoading}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Complete Job
                            </Button>
                          </div>
                        </div>
                      )}

                      {job.status === 0 && ( // Open/Assigned
                        <Button
                          onClick={() => handleStartJob(job.jobId)}
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Job
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">
                  No active jobs
                </h3>
                <p className="text-slate-300">
                  You don't have any active jobs at the moment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service Information */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Service Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-4">
                  Service Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Service Type:</span>
                    <span className="text-white">{agentData.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Price per Job:</span>
                    <span className="text-white">
                      {formatPAS(agentData.priceInPAS)} PAS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Status:</span>
                    <Badge
                      className={
                        agentData.isAvailable ? "bg-green-600" : "bg-gray-600"
                      }
                    >
                      {agentData.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">
                  Performance Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Reviews:</span>
                    <span className="text-white">
                      {agentData.totalRatings
                        ? Number(agentData.totalRatings)
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Success Rate:</span>
                    <span className="text-white">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Response Time:</span>
                    <span className="text-white">~2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
