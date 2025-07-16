import { useEffect, useState, useRef } from 'react';
import type { SearchSettlementsResponseType } from '../../../types/NovaPoshtaTypes/SearchSettlementsResponseType';
import { searchSettlements } from '../../../services/NovaPoshtaService';
import type { AddressType } from '../../../types/NovaPoshtaTypes/AddressType';
import { useRecipientStore } from '../../../services/useStore/useRecipientStore';
import { RecipientModal } from '../RecipientModal/RecipientModal';
import type { RecipientType } from '../../../types/RecipientType';
import { DeliveryOptionsSection } from '../DeliveryOptionsSection/DeliveryOptionsSection';

export const DeliveryInfoSection = () => {
  const selectedCity = useRecipientStore((state) => state.selectedCity);
  const setSelectedCity = useRecipientStore((state) => state.setSelectedCity);

  const [searchQueryValue, setSearchQueryValue] = useState(
    selectedCity.MainDescription,
  );
  const [searchCityResults, setSearchCityResults] = useState<AddressType[]>([]);

  const [isCityEditing, setIsCityEditing] = useState<boolean>(false);
  const [cityExists, setCityExists] = useState<boolean>(true);

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const recipient = useRecipientStore((state) => state.recipient);
  const setRecipient = useRecipientStore((state) => state.setRecipient);

  const [isRecipientModalOpen, setIsRecipientModalOpen] =
    useState<boolean>(false);

  const isRecipientEmpty =
    !recipient ||
    (!recipient.name &&
      !recipient.surname &&
      !recipient.patronymic &&
      !recipient.phone);

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQueryValue(event.target.value);
    const response = await searchSettlements(event.target.value);

    const data: SearchSettlementsResponseType = await response.json();

    if (
      data.data.length <= 0 ||
      data.data[0].TotalCount <= 0 ||
      data.data[0].Addresses.length <= 0
    ) {
      setSearchCityResults([]);
      setCityExists(false);
      return;
    }

    setCityExists(true);

    setSearchCityResults(data.data[0].Addresses);
  };

  const handleCitySelect = (address: AddressType) => {
    setSearchCityResults([]);
    setSearchQueryValue(address.MainDescription);
    setSelectedCity(address);
    setIsCityEditing(false);
  };

  const handleEditCityClick = async () => {
    setIsCityEditing(true);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isCityEditing &&
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setIsCityEditing(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCityEditing]);

  const handleOpenRecipientModal = () => {
    setIsRecipientModalOpen(true);
  };

  const handleCloseRecipientModal = () => {
    setIsRecipientModalOpen(false);
  };

  const handleSaveRecipient = (updatedRecipient: RecipientType) => {
    setRecipient(updatedRecipient);
    setIsRecipientModalOpen(false);
  };

  return (
    <section className="flex-1 p-6 rounded-2xl shadow-2xl inset-shadow-sm bg-[var(--color-surface-1)] border-[var(--color-secondary)] max-w-[1050px]">
      <h2 className="text-[23px] text-[var(--color-primary)] font-[Mont-SemiBold] mb-6">
        Fill in the delivery information
      </h2>

      {/* city selection */}
      <div
        className="mb-6 pb-4 border-b border-[var(--color-elements)]"
        ref={inputWrapperRef}
      >
        {isCityEditing ?
          <div className="relative w-full">
            <input
              id="name"
              name="name"
              value={searchQueryValue}
              className="mt-1 block w-full px-4 py-2 border border-var(--color-elements) rounded-md shadow-sm focus:ring-[var(--color-elements)] focus:border-[var(--color-elements)] sm:text-sm text-[var(--color-primary)] bg-[var(--color-surface-2)]"
              placeholder="Choose your city"
              onChange={onChangeHandler}
              autoFocus
              style={{ boxSizing: 'border-box' }}
            />
            <div className="w-full">
              {searchCityResults.length > 0 && (
                <ul
                  className="absolute left-0 right-0 z-10 w-full bg-[var(--color-surface-2)] border border-[var(--color-elements)] rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1"
                  style={{ boxSizing: 'border-box' }}
                >
                  {searchCityResults.map((res) => (
                    <li
                      key={res.Ref}
                      className="p-3 cursor-pointer hover:bg-[var(--color-primary)] flex justify-between items-center"
                      onClick={() => handleCitySelect(res)}
                    >
                      <span className="font-[Mont-SemiBold] text-[var(--color-primary)]">
                        {res.Present}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {!cityExists && (
                <ul
                  className="absolute left-0 right-0 z-10 w-full bg-[var(--color-surface-2)] border border-[var(--color-elements)] rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1"
                  style={{ boxSizing: 'border-box' }}
                >
                  <li className="p-3 flex justify-between items-center">
                    <p className="text-[var(--color-primary)] text-lg font-[Mont-SemiBold]">
                      No results
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        : <div>
            <p className="text-[var(--color-primary)] text-lg font-[Mont-SemiBold]">
              {selectedCity.MainDescription}
            </p>
            <p className="text-sm text-[var(--color-secondary)]">
              {selectedCity.Area} {selectedCity.ParentRegionTypes}
            </p>
            <button
              type="button"
              className="text-[var(--color-accent)] font-[Mont-SemiBold] mt-2 flex items-center group"
              onClick={handleEditCityClick}
            >
              Change
              <span className="ml-1 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        }
      </div>

      {/* recipients info */}
      {!isRecipientEmpty ?
        <div className="mb-6 pb-4 border-b border-[var(--color-elements)]">
          <h3 className="text-lg font-[Mont-SemiBold] mb-2 text-[var(--color-primary)]">
            Recipient
          </h3>
          <p className="text-[var(--color-secondary)]">
            {recipient.surname} {recipient.name} {recipient.patronymic}
          </p>
          <p className="text-[var(--color-secondary)]">{recipient.phone}</p>
          <button
            type="button"
            className="text-[var(--color-accent)] font-[Mont-SemiBold] mt-2 flex items-center group"
            onClick={handleOpenRecipientModal}
          >
            Edit
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      : <div className="mb-6 pb-4 border-b border-[var(--color-elements)]">
          <h3 className="text-lg font-[Mont-SemiBold] mb-2 text-[var(--color-primary)]">
            Recipient
          </h3>
          <button
            type="button"
            className="text-[var(--color-accent)] font-[Mont-SemiBold] mt-2 flex items-center group"
            onClick={handleOpenRecipientModal}
          >
            Add recipient information
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      }

      <DeliveryOptionsSection />

      {/* recipients modal */}
      {isRecipientModalOpen && (
        <RecipientModal
          isOpen={isRecipientModalOpen}
          onClose={handleCloseRecipientModal}
          onSave={handleSaveRecipient}
        />
      )}
    </section>
  );
};
