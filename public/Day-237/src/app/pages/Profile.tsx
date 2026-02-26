import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, Edit2, Save } from "lucide-react";

const mockTransactions = [
  { id: 1, amount: 1500, date: "2026-02-10", reference: "TRF-001-240210", status: "Completed", turf: "Green Valley Sports" },
  { id: 2, amount: 2000, date: "2026-02-08", reference: "TRF-002-240208", status: "Completed", turf: "Champions Arena" },
  { id: 3, amount: 1200, date: "2026-02-05", reference: "TRF-003-240205", status: "Pending", turf: "Victory Ground" },
  { id: 4, amount: 1800, date: "2026-02-01", reference: "TRF-004-240201", status: "Completed", turf: "Elite Turf Club" },
];

export function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: ""
  });

  useEffect(() => {
    const user = localStorage.getItem("turfbook_user");
    if (user) {
      const parsed = JSON.parse(user);
      setUserData({
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        dob: parsed.dob || ""
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem("turfbook_user", JSON.stringify(userData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("turfbook_user");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1E1E1E] border-b border-[#1B5E20] backdrop-blur-custom">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="text-white hover:text-[#00E676]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">
              <span className="text-[#00E676]">My</span>
              <span className="text-white"> Profile</span>
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#00E676] text-[#00E676] hover:bg-[#00E676] hover:text-[#121212]"
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Information */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 mb-6 card-elevation">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Profile Details</h2>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#BDBDBD]">Full Name</Label>
              {isEditing ? (
                <Input
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="bg-[#121212] border-[#1B5E20] text-white"
                />
              ) : (
                <p className="text-white text-lg">{userData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#BDBDBD]">Email</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="bg-[#121212] border-[#1B5E20] text-white"
                />
              ) : (
                <p className="text-white text-lg">{userData.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#BDBDBD]">Phone Number</Label>
              {isEditing ? (
                <Input
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="bg-[#121212] border-[#1B5E20] text-white"
                />
              ) : (
                <p className="text-white text-lg">{userData.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[#BDBDBD]">Date of Birth</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                  className="bg-[#121212] border-[#1B5E20] text-white"
                />
              ) : (
                <p className="text-white text-lg">{userData.dob || "Not provided"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#1E1E1E] rounded-[14px] p-6 card-elevation">
          <h2 className="text-xl font-semibold text-white mb-6">Transaction History</h2>
          
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-[#121212] rounded-[14px] p-4 border border-[#1B5E20] hover:border-[#00E676] transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold">{transaction.turf}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === "Completed"
                            ? "bg-[#00E676]/20 text-[#00E676]"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <p className="text-[#BDBDBD] text-sm">Reference: {transaction.reference}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-[#BDBDBD] text-sm">Date</p>
                      <p className="text-white">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#BDBDBD] text-sm">Amount</p>
                      <p className="text-[#00E676] font-bold text-lg">₹{transaction.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}