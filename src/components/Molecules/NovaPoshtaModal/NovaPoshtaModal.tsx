import { useEffect, useState } from 'react';
import { useRecipientStore } from '../../../services/useStore/useRecipientStore';
import { getWarehouses } from '../../../services/NovaPoshtaService';
import { X } from 'lucide-react';
import type { WarehouseType } from '../../../types/NovaPoshtaTypes/WarehouseType';

type NovaPoshtaModalProps = {
  onClose: () => void;
  onDepartmentSelect: (department: WarehouseType) => void;
};

export const NovaPoshtaModal = ({
  onClose,
  onDepartmentSelect,
}: NovaPoshtaModalProps) => {
  const [postOffices, setPostOffices] = useState<WarehouseType[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCity = useRecipientStore((state) => state.selectedCity);

  useEffect(() => {
    async function fetchPostOffices() {
      setLoading(true);
      const cityRef = selectedCity.DeliveryCity;

      if (!cityRef) {
        setPostOffices([]);
        setLoading(false);
        return;
      }

      const response = await getWarehouses(cityRef, '');
      const data = await response.json();
      setPostOffices(data.data || []);
      setLoading(false);
    }
    fetchPostOffices();
  }, [selectedCity]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-[var(--color-icons)] rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          type="button"
          className="absolute top-7 right-4"
          onClick={onClose}
        >
          <X
            color={'#F1F2F9'}
            size={20}
          />
        </button>
        <h3 className="text-[20px] font-[Mont-SemiBold] text-[var(--color-primary)] mb-4">
          Choose a Nova Poshta Post Office
        </h3>
        {loading ?
          <div className="text-[var(--color-primary)]/80 text-[15px] font-[Mont-Regular]">
            Loading Post Offices...
          </div>
        : <ul className="max-h-80 overflow-y-auto">
            {postOffices.map((dep) => (
              <li
                key={dep.SiteKey}
                className="mb-2"
              >
                <button
                  type="button"
                  className="w-full text-left p-3 rounded bg-[var(--color-secondary)] font-[Mont-Regular] text-[var(--color-primary)] hover:bg-[var(--color-elements)]/75"
                  onClick={() => {
                    onDepartmentSelect(dep);
                    onClose();
                  }}
                >
                  {dep.Description} <br />
                  <span className="text-xs text-[var(--color-primary)]/65 font-[Mont-Regular]">
                    {dep.ShortAddress}
                  </span>
                </button>
              </li>
            ))}
            {postOffices.length === 0 && (
              <li className="text-[var(--color-primary)]/80 text-[15px] font-[Mont-Regular]">
                No Post Offices found for this city.
              </li>
            )}
          </ul>
        }
      </div>
    </div>
  );
};
