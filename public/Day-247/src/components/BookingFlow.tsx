import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Lock,
  CheckCircle,
  ArrowLeft,
  IndianRupee,
  Calendar,
  Train,
  MapPin,
} from 'lucide-react';
import { Train as TrainType, Passenger, generatePNR, getStationName } from '../utils/mockData';

interface BookingFlowProps {
  train: TrainType;
  selectedClass: string;
  onBack: () => void;
  onComplete: (pnr: string) => void;
}

export function BookingFlow({ train, selectedClass, onBack, onComplete }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 0, gender: 'Male', berth: 'Lower' },
  ]);
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [payment, setPayment] = useState({ cardNumber: '', cvv: '', expiry: '' });
  const [processing, setProcessing] = useState(false);

  const totalAmount = train.classes[selectedClass].price * passengers.length;
  const gst = Math.round(totalAmount * 0.05);
  const finalAmount = totalAmount + gst;

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { name: '', age: 0, gender: 'Male', berth: 'Lower' }]);
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const isPassengerValid = (passenger: Passenger) => {
    return passenger.name.length >= 3 && passenger.age > 0 && passenger.age < 120;
  };

  const canProceedToPayment = () => {
    return (
      passengers.every(isPassengerValid) &&
      contact.email.includes('@') &&
      contact.phone.length === 10
    );
  };

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const pnr = generatePNR();
      setStep(4);
      setProcessing(false);
      setTimeout(() => {
        onComplete(pnr);
      }, 3000);
    }, 2500);
  };

  const progressValue = (step / 4) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Booking Progress</h3>
              <span className="text-sm text-gray-600">Step {step} of 4</span>
            </div>
            <Progress value={progressValue} className="h-2" />
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className={`text-center ${step >= 1 ? 'text-[#0058A3] font-semibold' : 'text-gray-400'}`}>
                Review
              </div>
              <div className={`text-center ${step >= 2 ? 'text-[#0058A3] font-semibold' : 'text-gray-400'}`}>
                Passengers
              </div>
              <div className={`text-center ${step >= 3 ? 'text-[#0058A3] font-semibold' : 'text-gray-400'}`}>
                Payment
              </div>
              <div className={`text-center ${step >= 4 ? 'text-[#0058A3] font-semibold' : 'text-gray-400'}`}>
                Confirmation
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Review Booking */}
      {step === 1 && (
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-[#0058A3] to-[#003d73] text-white">
            <CardTitle className="flex items-center text-2xl">
              <Train className="mr-3 h-6 w-6" />
              Review Your Booking
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600 mb-2 block">Train Details</Label>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-bold text-lg text-gray-900">{train.name}</p>
                  <p className="text-sm text-gray-600">#{train.number}</p>
                  <Badge className="mt-2">{selectedClass}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 mb-2 block">Journey</Label>
                <div className="p-4 bg-green-50 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{getStationName(train.from)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span className="text-sm">{getStationName(train.to)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{train.duration}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Base Fare (1 passenger)</span>
                <span className="font-semibold">₹{train.classes[selectedClass].price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">GST (5%)</span>
                <span className="font-semibold">₹{Math.round(train.classes[selectedClass].price * 0.05)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
              <Button onClick={() => setStep(2)} className="flex-1 bg-[#0058A3] hover:bg-[#004080]">
                Continue to Passengers
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Passenger Details */}
      {step === 2 && (
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center text-2xl">
              <User className="mr-3 h-6 w-6" />
              Passenger Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {passengers.map((passenger, index) => (
              <Card key={index} className="border-2 border-gray-200">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900">Passenger {index + 1}</h4>
                    {passengers.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removePassenger(index)}>
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        placeholder="As per ID proof"
                        value={passenger.name}
                        onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Age</Label>
                      <Input
                        type="number"
                        placeholder="Age"
                        value={passenger.age || ''}
                        onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Select
                        value={passenger.gender}
                        onValueChange={(value) => updatePassenger(index, 'gender', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Berth Preference</Label>
                      <Select
                        value={passenger.berth}
                        onValueChange={(value) => updatePassenger(index, 'berth', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lower">Lower</SelectItem>
                          <SelectItem value="Middle">Middle</SelectItem>
                          <SelectItem value="Upper">Upper</SelectItem>
                          <SelectItem value="Side Lower">Side Lower</SelectItem>
                          <SelectItem value="Side Upper">Side Upper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {passengers.length < 6 && (
              <Button variant="outline" onClick={addPassenger} className="w-full">
                + Add Another Passenger
              </Button>
            )}

            <Card className="border-2 border-blue-200">
              <CardContent className="p-4 space-y-4">
                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={contact.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) setContact({ ...contact, phone: value });
                        }}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Tickets ({passengers.length})</span>
                <span className="font-semibold">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">GST (5%)</span>
                <span className="font-semibold">₹{gst}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-lg text-[#0058A3]">₹{finalAmount}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedToPayment()}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Proceed to Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center text-2xl">
              <CreditCard className="mr-3 h-6 w-6" />
              Secure Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Your payment is secured with 256-bit encryption
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={payment.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 16) setPayment({ ...payment, cardNumber: value });
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expiry Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                          setPayment({ ...payment, expiry: formatted });
                        }
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>CVV</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="123"
                      value={payment.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 3) setPayment({ ...payment, cvv: value });
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-[#0058A3] to-[#003d73] text-white rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Amount to Pay</span>
                <span className="text-3xl font-bold flex items-center">
                  <IndianRupee className="h-6 w-6" />
                  {finalAmount}
                </span>
              </div>
              <div className="text-sm text-blue-100">
                {passengers.length} passenger{passengers.length > 1 ? 's' : ''} • {train.name} • {selectedClass}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1" disabled={processing}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handlePayment}
                disabled={processing || !payment.cardNumber || !payment.expiry || !payment.cvv}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay ₹{finalAmount}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <Card className="shadow-xl">
          <CardContent className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">Your train ticket has been successfully booked</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Your PNR Number</p>
              <p className="text-3xl font-bold text-[#0058A3]">{generatePNR()}</p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✅ Ticket sent to {contact.email}</p>
              <p>✅ SMS sent to +91 {contact.phone}</p>
              <p>✅ Payment successful</p>
            </div>
            <Button className="w-full bg-[#0058A3] hover:bg-[#004080]">Download Ticket</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
