import { useState } from 'react';
import { NovaPoshtaModal } from '../NovaPoshtaModal/NovaPoshtaModal';
import type { WarehouseType } from '../../../types/NovaPoshtaTypes/WareHouseType';

export const DeliveryOptionsSection = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<
    'pickup' | 'novaposhta' | null
  >(null);

  const [selectedDepartment, setSelectedDepartment] =
    useState<WarehouseType | null>(null);
  const onDepartmentSelect = (department: WarehouseType) => {
    setSelectedDepartment(department);
  };

  const [isNovaPoshtaModalOpen, setIsNovaPoshtaModalOpen] =
    useState<boolean>(false);
  const onCloseNovaPoshtaModal = () => {
    setIsNovaPoshtaModalOpen(false);
  };

  return (
    <>
      {/* pickup from store */}
      <div
        className={`border p-4 rounded-lg mb-6 cursor-pointer transition-all duration-300
          ${
            selectedDelivery === 'pickup' ?
              'border-[var(--color-accent)]/20 bg-[var(--color-accent)]/40 shadow-sm/20'
            : 'border-[var(--color-secondary)]/20 inset-shadow-xs hover:bg-[var(--color-accent)]/10'
          }
          `}
        onClick={() => setSelectedDelivery('pickup')}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span
              className={
                selectedDelivery === 'pickup' ?
                  'text-purple-400 mr-2'
                : 'text-[var(--color-primary)] mr-2'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <h4 className="font-[Mont-SemiBold] text-[var(--color-primary)]">
              Pickup from store
            </h4>
          </div>
          <span
            className={
              selectedDelivery === 'pickup' ?
                'text-[var(--color-accent)] font-[Mont-Regular] text-sm'
              : 'text-[var(--color-primary)] font-[Mont-Regular] text-sm'
            }
          >
            Free
          </span>
        </div>
        <p className="text-sm font-[Mont-Regular] text-[var(--color-secondary)] mb-2">
          Today
        </p>
        {selectedDelivery === 'pickup' && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h5 className="font-[Mont-SemiBold] text-[var(--color-primary)]">
                Nice Gadgets Store
              </h5>
              <p className="text-sm font-[Mont-Regular] text-[var(--color-secondary)]">
                Zhylianska St, 75, Kyiv
              </p>
            </div>
          </div>
        )}
      </div>

      {/* novaposhta delivery option */}
      <div
        className={`flex flex-col justify-between p-4 rounded-lg border mb-4 transition-all duration-300 cursor-pointer ${
          selectedDelivery === 'novaposhta' ?
            'border-[var(--color-accent)]/20 bg-[var(--color-accent)]/40 shadow-sm/20'
          : 'border-[var(--color-secondary)]/20 inset-shadow-xs hover:bg-[var(--color-accent)]/10'
        }`}
        onClick={() => setSelectedDelivery('novaposhta')}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <img
              src="/gadgets/img/Nova_Poshta.svg"
              alt="Nova Poshta"
              className="h-6 w-6 mr-2"
            />
            <span className="text-[var(--color-primary)] font-[Mont-SemiBold]">
              To Nova Poshta branch
            </span>
          </div>

          <span className="text-[var(--color-primary)] font-[Mont-Regular]">
            100₴
          </span>
        </div>

        {selectedDelivery === 'novaposhta' && (
          <>
            {selectedDepartment ?
              <>
                <div className="mt-2 p-2">
                  <div className="font-[Mont-SemiBold] text-[var(--color-primary)] text-sm">
                    {selectedDepartment.Description}
                  </div>
                  <div className="text-xs text-[var(--color-primary)]/85 font-[Mont-Regular]">
                    {selectedDepartment.ShortAddress}
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-[var(--color-accent)]/50 shadow-sm text-[var(--color-primary)] rounded font-[Mont-Regular] text-[15px] hover:bg-[var(--color-accent)]/80"
                  onClick={() => setIsNovaPoshtaModalOpen(true)}
                >
                  Choose another Nova Poshta department
                </button>
              </>
            : <button
                type="button"
                className="mt-4 px-4 py-2 bg-[var(--color-accent)]/50 shadow-sm text-[var(--color-primary)] rounded font-[Mont-Regular] text-[15px] hover:bg-[var(--color-accent)]/80"
                onClick={() => setIsNovaPoshtaModalOpen(true)}
              >
                Choose a Nova Poshta department
              </button>
            }
            {/* <button
              type="button"
              className="mt-4 px-4 py-2 bg-[var(--color-accent)]/50 shadow-sm text-[var(--color-primary)] rounded font-[Mont-Regular] text-[15px] hover:bg-[var(--color-accent)]/80"
              onClick={() => setIsNovaPoshtaModalOpen(true)}
            >
              Choose a Nova Poshta department
            </button> */}
          </>
        )}

        {isNovaPoshtaModalOpen && (
          <NovaPoshtaModal
            onClose={onCloseNovaPoshtaModal}
            onDepartmentSelect={onDepartmentSelect}
          />
        )}
      </div>
    </>
  );
};
