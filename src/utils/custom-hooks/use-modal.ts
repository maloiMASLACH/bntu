import { useState } from 'react';

export const useModal = (initialValue: boolean): [value: boolean, toggle: () => void] => {
  const [modalOpen, setModalOpen] = useState<boolean>(initialValue);

  const toggle = () => setModalOpen((previous) => !previous);

  return [modalOpen, toggle];
};
