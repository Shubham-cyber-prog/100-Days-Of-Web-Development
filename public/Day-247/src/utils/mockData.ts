// Mock data for trains, stations, and bookings

export interface Station {
  code: string;
  name: string;
  city: string;
}

export interface Train {
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  daysOfWeek: string[];
  classes: {
    [key: string]: {
      available: number;
      price: number;
      waitlist?: number;
    };
  };
}

export interface Passenger {
  name: string;
  age: number;
  gender: string;
  berth: string;
}

export interface Booking {
  pnr: string;
  train: Train;
  passengers: Passenger[];
  status: string;
  bookingDate: string;
  journeyDate: string;
  totalAmount: number;
  class: string;
}

export const stations: Station[] = [
  { code: 'NDLS', name: 'New Delhi', city: 'Delhi' },
  { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai' },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
  { code: 'MAS', name: 'Chennai Central', city: 'Chennai' },
  { code: 'SBC', name: 'Bangalore City', city: 'Bangalore' },
  { code: 'AGC', name: 'Agra Cantt', city: 'Agra' },
  { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur' },
  { code: 'LKO', name: 'Lucknow', city: 'Lucknow' },
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna' },
  { code: 'BBS', name: 'Bhubaneswar', city: 'Bhubaneswar' },
  { code: 'JAT', name: 'Jammu Tawi', city: 'Jammu' },
  { code: 'CDG', name: 'Chandigarh', city: 'Chandigarh' },
  { code: 'AMR', name: 'Amritsar Junction', city: 'Amritsar' },
  { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad' },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune' },
  { code: 'HYB', name: 'Hyderabad Deccan', city: 'Hyderabad' },
  { code: 'TVC', name: 'Trivandrum Central', city: 'Trivandrum' },
  { code: 'ERS', name: 'Ernakulam Junction', city: 'Kochi' },
  { code: 'GHY', name: 'Guwahati', city: 'Guwahati' },
  { code: 'RNC', name: 'Ranchi Junction', city: 'Ranchi' },
];

export const mockTrains: Train[] = [
  {
    number: '12301',
    name: 'Rajdhani Express',
    from: 'NDLS',
    to: 'HWH',
    departure: '16:55',
    arrival: '10:05',
    duration: '17h 10m',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: {
      AC1: { available: 45, price: 3500 },
      AC2: { available: 78, price: 2100 },
      AC3: { available: 120, price: 1450 },
    },
  },
  {
    number: '12951',
    name: 'Mumbai Rajdhani',
    from: 'NDLS',
    to: 'BCT',
    departure: '16:35',
    arrival: '08:35',
    duration: '16h 00m',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: {
      AC1: { available: 23, price: 4200 },
      AC2: { available: 54, price: 2600 },
      AC3: { available: 89, price: 1800 },
    },
  },
  {
    number: '12430',
    name: 'Lucknow AC SF',
    from: 'NDLS',
    to: 'LKO',
    departure: '22:15',
    arrival: '06:30',
    duration: '8h 15m',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: {
      AC1: { available: 18, price: 1850 },
      AC2: { available: 67, price: 1200 },
      AC3: { available: 145, price: 850 },
      SL: { available: 234, price: 450 },
    },
  },
  {
    number: '12002',
    name: 'Bhopal Shatabdi',
    from: 'NDLS',
    to: 'HWH',
    departure: '06:00',
    arrival: '21:45',
    duration: '15h 45m',
    daysOfWeek: ['Mon', 'Wed', 'Fri', 'Sun'],
    classes: {
      CC: { available: 156, price: 1250 },
      AC2: { available: 45, price: 1850 },
    },
  },
  {
    number: '22691',
    name: 'Rajdhani SF',
    from: 'NDLS',
    to: 'MAS',
    departure: '15:50',
    arrival: '07:30',
    duration: '27h 40m',
    daysOfWeek: ['Tue', 'Thu', 'Sat'],
    classes: {
      AC1: { available: 12, price: 5800 },
      AC2: { available: 34, price: 3400 },
      AC3: { available: 67, price: 2300 },
    },
  },
  {
    number: '12259',
    name: 'Duronto Express',
    from: 'NDLS',
    to: 'SBC',
    departure: '21:40',
    arrival: '05:30',
    duration: '33h 50m',
    daysOfWeek: ['Mon', 'Wed', 'Fri'],
    classes: {
      AC2: { available: 0, price: 3800, waitlist: 45 },
      AC3: { available: 23, price: 2600 },
      SL: { available: 156, price: 1200 },
    },
  },
  {
    number: '12431',
    name: 'Trivandrum Rajdhani',
    from: 'NDLS',
    to: 'TVC',
    departure: '11:00',
    arrival: '07:00',
    duration: '44h 00m',
    daysOfWeek: ['Mon', 'Tue', 'Fri', 'Sat'],
    classes: {
      AC1: { available: 8, price: 7200 },
      AC2: { available: 28, price: 4500 },
      AC3: { available: 56, price: 3100 },
    },
  },
  {
    number: '12650',
    name: 'Karnataka Sampark Kranti',
    from: 'NDLS',
    to: 'SBC',
    departure: '17:05',
    arrival: '05:55',
    duration: '36h 50m',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: {
      AC2: { available: 45, price: 3200 },
      AC3: { available: 89, price: 2200 },
      SL: { available: 234, price: 950 },
      '2S': { available: 456, price: 450 },
    },
  },
];

export function searchTrains(from: string, to: string, date: string): Train[] {
  // In a real app, this would make an API call
  // For now, we'll filter mock trains based on from/to stations
  
  if (!from || !to) return [];
  
  const fromStation = stations.find(
    (s) => s.name.toLowerCase().includes(from.toLowerCase()) || 
           s.code.toLowerCase() === from.toLowerCase()
  );
  
  const toStation = stations.find(
    (s) => s.name.toLowerCase().includes(to.toLowerCase()) || 
           s.code.toLowerCase() === to.toLowerCase()
  );
  
  if (!fromStation || !toStation) return mockTrains.slice(0, 5);
  
  // Filter trains that match the route (simplified)
  return mockTrains.filter(
    (train) => train.from === fromStation.code && train.to === toStation.code
  ).length > 0 
    ? mockTrains.filter((train) => train.from === fromStation.code && train.to === toStation.code)
    : mockTrains.slice(0, 5); // Return sample trains if no exact match
}

export function generatePNR(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export function getStationName(code: string): string {
  const station = stations.find((s) => s.code === code);
  return station ? station.name : code;
}

export function searchStations(query: string): Station[] {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  return stations.filter(
    (station) =>
      station.name.toLowerCase().includes(lowerQuery) ||
      station.city.toLowerCase().includes(lowerQuery) ||
      station.code.toLowerCase().includes(lowerQuery)
  ).slice(0, 8);
}

// Mock PNR status data
export function getPNRStatus(pnr: string): Booking | null {
  if (pnr.length !== 10) return null;
  
  const randomTrain = mockTrains[Math.floor(Math.random() * mockTrains.length)];
  const statuses = ['CNF', 'RAC', 'WL'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    pnr,
    train: randomTrain,
    passengers: [
      { name: 'Passenger 1', age: 35, gender: 'Male', berth: 'Lower' },
      { name: 'Passenger 2', age: 32, gender: 'Female', berth: 'Upper' },
    ],
    status: randomStatus,
    bookingDate: '2025-01-20',
    journeyDate: '2025-02-28',
    totalAmount: 2500,
    class: 'AC3',
  };
}

// Mock live train tracking data
export interface TrainStatus {
  trainNumber: string;
  trainName: string;
  currentStation: string;
  nextStation: string;
  delay: number;
  platform: string;
  status: 'On Time' | 'Delayed' | 'Cancelled';
  lastUpdated: string;
}

export function getLiveTrainStatus(trainNumber: string): TrainStatus | null {
  const train = mockTrains.find((t) => t.number === trainNumber);
  if (!train) return null;
  
  const delays = [0, 15, 30, 45, 60];
  const randomDelay = delays[Math.floor(Math.random() * delays.length)];
  
  return {
    trainNumber: train.number,
    trainName: train.name,
    currentStation: getStationName(train.from),
    nextStation: 'En Route',
    delay: randomDelay,
    platform: Math.floor(Math.random() * 10 + 1).toString(),
    status: randomDelay === 0 ? 'On Time' : 'Delayed',
    lastUpdated: new Date().toLocaleTimeString(),
  };
}
