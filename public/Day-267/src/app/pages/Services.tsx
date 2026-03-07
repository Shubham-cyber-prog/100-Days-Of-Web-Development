import { useSimulationStore } from '../store/simulationStore';
import { StatusCard } from '../components/StatusCard';
import { ServiceDetailPanel } from '../components/ServiceDetailPanel';

export default function Services() {
  const { services, selectedService, setSelectedService } = useSimulationStore();

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 overflow-auto bg-gray-900 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">Services</h2>
          <p className="text-gray-400">
            Manage and monitor all microservices in your architecture
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <StatusCard
              key={service.id}
              service={service}
              onClick={setSelectedService}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceDetailPanel
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
