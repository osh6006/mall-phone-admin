"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="정말로 삭제 하시겠습니까?"
      desc="삭제하시면 스토어를 되돌릴 수 없습니다."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full pt-6 space-x-2 flex items-center justify-end">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          취소
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          확인
        </Button>
      </div>
    </Modal>
  );
};
