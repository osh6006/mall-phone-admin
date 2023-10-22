"use client";
import axios from "axios";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "2글자 이상 입력해 주세요." }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO : 스토어 만들기
    try {
      setLoading(true);
      const res = await axios.post("/api/stores", values);
      window.location.assign(`/${res.data.id}`);
    } catch (error) {
      toast.error("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="새로운 스토어 추가하기"
      desc="새 스토어를 만들고, 상품과 카테고리를 등록 하세요"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="스토어 이름"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-3 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={storeModal.onClose}
                >
                  취소
                </Button>
                <Button variant={"main"} disabled={loading} type="submit">
                  확인
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
