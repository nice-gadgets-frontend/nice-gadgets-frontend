import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRecipientStore } from '../../../services/useStore/useRecipientStore';
import type { RecipientType } from '../../../types/RecipientType';

type RecipientsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipient: RecipientType) => void;
};

export const RecipientModal = ({
  isOpen,
  onClose,
  onSave,
}: RecipientsModalProps) => {
  const recipient: RecipientType = useRecipientStore(
    (state) => state.recipient,
  );
  const setRecipient = useRecipientStore((state) => state.setRecipient);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    surname?: string;
    phone?: string;
  }>({});

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && recipient) {
      setName(recipient.name || '');
      setSurname(recipient.surname || '');
      setPatronymic(recipient.patronymic || '');
      setPhone(recipient.phone || '');
      setErrors({});
    }
  }, [isOpen, recipient]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!surname.trim()) newErrors.surname = 'Surname is required';
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?\d[\d\s\-()]{8,}$/.test(phone.trim())) {
      newErrors.phone = 'Phone must contain only numbers';
    }
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const updatedRecipient: RecipientType = {
      name,
      surname,
      patronymic,
      phone,
    };
    setRecipient(updatedRecipient); // update zustand store
    onSave(updatedRecipient); // call parent handler if needed
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-[var(--color-icons)] rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up"
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-[var(--color-primary)] text-xl font-[Mont-Semibold]">
            Change recipient details
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/50 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* inputs */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="surname"
              className="block text-sm font-[Mont-Regular] text-[var(--color-primary)] mb-1"
            >
              Surname <span className="text-[var(--color-red)]/70">*</span>
            </label>
            <input
              type="text"
              id="surname"
              className={`w-full text-[var(--color-primary)]/80 font-[Mont-Regular] text-sm p-2 bg-[var(--color-surface-1)]/50 border rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] ${
                errors.surname ? 'border-[var(--color-red)]' : 'border-[var(--color-primary)]/30'
              }`}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Smith"
            />
            {errors.surname && (
              <p className="text-[var(--color-red)] text-xs mt-1">{errors.surname}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-[Mont-Regular] text-[var(--color-primary)] text-[var(--color-primary)] mb-1"
            >
              Name <span className="text-[var(--color-red)]/70">*</span>
            </label>
            <input
              type="text"
              id="name"
              className={`w-full text-[var(--color-primary)]/80 font-[Mont-Regular] text-sm p-2 border bg-[var(--color-surface-1)]/50 rounded-md focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] ${
                errors.name ? 'border-[var(--color-red)]' : 'border-[var(--color-primary)]/30'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John"
            />
            {errors.name && (
              <p className="text-[var(--color-red)] text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="patronymic"
              className="block text-sm font-[Mont-Regular] text-[var(--color-primary)] mb-1"
            >
              Patronymic
            </label>
            <input
              type="text"
              id="patronymic"
              className="w-full p-2 border text-[var(--color-primary)]/80 font-[Mont-Regular] text-sm bg-[var(--color-surface-1)]/50 border-[var(--color-primary)]/30 rounded-md focus:ring-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
              placeholder="Tarasovych"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-[Mont-Regular] text-[var(--color-primary)] mb-1"
            >
              Phone number <span className="text-[var(--color-red)]/70">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className={`w-full p-2 text-[var(--color-primary)]/80 font-[Mont-Regular] text-sm border bg-[var(--color-surface-1)]/50 rounded-md focus:ring-[var(--color-primary)] focus:ring-[var(--color-primary)] ${
                errors.phone ? 'border-[var(--color-red)]' : 'border-[var(--color-primary)]/30'
              }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+38 (XXX) XXX-XX-XX"
            />
            {errors.phone && (
              <p className="text-[var(--color-red)] text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border bg-[var(--color-primary)]/30 border-[var(--color-primary)]/5 rounded-md text-[var(--color-primary)] font-[Mont-Regular] hover:bg-[var(--color-primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          >
            Скасувати
          </button>
          <button
            onClick={handleSave}
            className="px-4 font-[Mont-Regular] py-2 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-accent)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            Зберегти зміни
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
