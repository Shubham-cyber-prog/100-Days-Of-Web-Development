import { Packet, NetworkNode, Protocol } from '../types/packet';

const protocols: Protocol[] = ['TCP', 'UDP', 'HTTP', 'DNS', 'ICMP'];
const sourceIps = ['192.168.1.100', '192.168.1.101', '10.0.0.5'];
const destIps = ['8.8.8.8', '142.250.185.46', '13.107.42.14', '172.217.14.206', '1.1.1.1'];

const statuses: ('success' | 'warning' | 'error')[] = ['success', 'success', 'success', 'warning', 'error'];

export const generateMockPacket = (): Packet => {
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const sourceIp = sourceIps[Math.floor(Math.random() * sourceIps.length)];
  const destIp = destIps[Math.floor(Math.random() * destIps.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  const now = new Date();
  const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp,
    sourceIp,
    destinationIp: destIp,
    protocol,
    port: Math.floor(Math.random() * 65535),
    size: Math.floor(Math.random() * 1500) + 64,
    status,
    data: {
      ethernet: {
        'Source MAC': '00:1A:2B:3C:4D:5E',
        'Destination MAC': 'FF:FF:FF:FF:FF:FF',
        'EtherType': '0x0800',
      },
      ip: {
        'Version': '4',
        'Header Length': '20 bytes',
        'TTL': '64',
        'Protocol': protocol,
        'Source IP': sourceIp,
        'Destination IP': destIp,
      },
      transport: {
        'Source Port': Math.floor(Math.random() * 65535).toString(),
        'Destination Port': Math.floor(Math.random() * 65535).toString(),
        'Sequence': Math.floor(Math.random() * 1000000).toString(),
        'Acknowledgment': Math.floor(Math.random() * 1000000).toString(),
      },
      application: {
        'Protocol': protocol,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      raw: Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
      ).join(' '),
    },
  };
};

export const networkNodes: NetworkNode[] = [
  { id: 'computer', label: 'Your Computer', type: 'computer', x: 100, y: 200, ip: '192.168.1.100' },
  { id: 'router', label: 'Router', type: 'router', x: 300, y: 200, ip: '192.168.1.1' },
  { id: 'server1', label: 'Google DNS', type: 'server', x: 500, y: 100, ip: '8.8.8.8' },
  { id: 'server2', label: 'Web Server', type: 'server', x: 500, y: 200, ip: '142.250.185.46' },
  { id: 'cloud', label: 'Cloud Services', type: 'cloud', x: 500, y: 300, ip: '13.107.42.14' },
];

export const getProtocolColor = (protocol: Protocol): string => {
  switch (protocol) {
    case 'TCP': return 'rgb(59, 130, 246)'; // blue
    case 'UDP': return 'rgb(34, 197, 94)'; // green
    case 'HTTP': return 'rgb(249, 115, 22)'; // orange
    case 'DNS': return 'rgb(168, 85, 247)'; // purple
    case 'ICMP': return 'rgb(239, 68, 68)'; // red
    default: return 'rgb(156, 163, 175)'; // gray
  }
};
