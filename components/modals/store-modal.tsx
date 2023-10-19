"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="새로운 스토어 추가하기"
      desc="새 스토어를 만들고, 상품과 카테고리를 등록 하세요"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      폼이 들어갈 자리
    </Modal>
  );
};
