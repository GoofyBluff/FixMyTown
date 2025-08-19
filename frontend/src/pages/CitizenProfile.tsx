import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Edit,
} from "lucide-react";
import HeaderAfterAuth from "../components/HeaderAfterAuth";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { VITE_BACKEND_URL } from "../config/config";

interface Issues {
  _id: string;
  title: string;
  description: string;
  issueType: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: string;
  file?: string;
  status: string;
}

const CitizenProfile = () => {
  const { user, updateUserProfile, token, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [myIssues, setMyIssues] = useState<Issues[]>([]);
  const [loadingMyIssues, setLoadingMyIssues] = useState(true);

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        fullName: profile.fullName,
        email: profile.email,
        phonenumber: profile.phonenumber,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchMyIssues = async () => {
      try {
        setLoadingMyIssues(true);

        const response = await fetch(
          `${VITE_BACKEND_URL}/api/v1/citizen/issues`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          toast.error("Unauthorized! Please log in again.");
          return;
        }

        if (response.ok && Array.isArray(data.issues)) {
          setMyIssues(data.issues);
        } else {
          console.error("Failed to fetch issues:", data.message);
          toast.error(data.message || "Failed to load issues");
        }
      } catch (error) {
        console.error("Error fetching my issues:", error);
        toast.error("Error loading your issues");
      } finally {
        setLoadingMyIssues(false);
      }
    };

    fetchMyIssues();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Resolved":
        return "bg-green-100 text-green-700 border border-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f1f5f9] to-[#f8fafc]">
      {/* Navbar */}
      <HeaderAfterAuth />

      <div className="pt-20 container mx-auto my-9 max-w-5xl space-y-8 px-4">
        {/* Profile Header */}
        <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20 ring-4 ring-indigo-200">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg bg-indigo-100 text-indigo-700">
                    {profile.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-3xl font-bold text-slate-700">
                    {profile.fullName || "Citizen Profile"}
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Manage your profile and track reported issues
                  </CardDescription>
                </div>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all"
                onClick={
                  isEditing ? handleSaveProfile : () => setIsEditing(true)
                }
              >
                <Edit className="h-4 w-4 text-purple-700" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
                  <User className="h-4 w-4 text-blue-600" />
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile({ ...profile, fullName: e.target.value })
                      }
                    />
                  ) : (
                    <span className="text-gray-600">{profile.fullName}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
                  <Mail className="h-4 w-4 text-blue-600" />
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  ) : (
                    <span className="text-gray-600">{profile.email}</span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
                  <Phone className="h-4 w-4 text-blue-600" />
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phonenumber}
                      onChange={(e) =>
                        setProfile({ ...profile, phonenumber: e.target.value })
                      }
                    />
                  ) : (
                    <span className="text-gray-600">{profile.phonenumber}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Issues", value: myIssues.length },
            {
              label: "Resolved",
              value: myIssues.filter((i) => i.status === "Resolved").length,
              color: "text-green-600",
            },
            {
              label: "In Progress",
              value: myIssues.filter((i) => i.status === "In Progress").length,
              color: "text-blue-600",
            },
            {
              label: "Pending",
              value: myIssues.filter((i) => i.status === "Pending").length,
              color: "text-yellow-600",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="bg-white/80 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`text-3xl font-extrabold ${stat.color || "text-slate-700"}`}
                >
                  {stat.value}
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Issues */}
        <Card className="bg-white/80 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <FileText className="h-5 w-5 text-indigo-500" />
              My Reported Issues
            </CardTitle>
            <CardDescription>
              Track the progress of issues you’ve reported
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingMyIssues ? (
              <div className="text-center py-6 text-gray-500">
                Loading your issues...
              </div>
            ) : myIssues.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                You haven’t reported any issues yet.
              </div>
            ) : (
              <div className="space-y-6">
                {myIssues.map((issue) => (
                  <div
                    key={issue._id}
                    className="p-5 rounded-xl border bg-gradient-to-r from-yellow-50 to-white shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-slate-800">
                          {issue.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {issue.description}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(issue.status)} px-3`}>
                        {issue.status}
                      </Badge>
                    </div>

                    {issue.file && (
                      <img
                        src={issue.file}
                        alt="Issue"
                        className="w-full h-48 object-cover rounded-lg mt-3"
                      />
                    )}

                    <Separator className="my-3" />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>{issue.location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-pink-500" />
                        <span>
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <span>{issue.issueType}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenProfile;
