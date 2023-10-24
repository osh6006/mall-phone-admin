"use client";

import * as z from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";

import toast from "react-hot-toast";

import { Serise } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(2, { message: "2글자 이상 입력해 주세요." }),
  modelNum: z.string().min(8, { message: "8글자 이상 입력해 주세요." }),
});

type SeriseFormValue = z.infer<typeof formSchema>;

interface SeriseFormProps {
  initialData: Serise | null;
}

export const SeriseForm: React.FC<SeriseFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "시리즈 수정" : "시리즈 생성";
  const description = initialData
    ? "시리즈 수정해 보세요"
    : "새 시리즈를 생성해 보세요";
  const toastMessage = initialData
    ? "시리즈를 업데이트 하였습니다."
    : "시리즈를 생성 하였습니다.";
  const action = initialData ? "수정" : "생성";

  const form = useForm<SeriseFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      modelNum: "",
    },
  });

  const onSubmit = async (data: SeriseFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/serises/${params.seriseId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/serises`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/serises`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("서버 오류가 발생 하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/serises/${params.seriseId}`);
      router.refresh();
      router.push(`/${params.storeId}/serises`);
      toast.success("시리즈가 삭제 되었습니다.");
    } catch (error) {
      toast.error("서버 오류가 발생하였습니다.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="w-full flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>시리즈 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="시리즈 이름을 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>모델 번호</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="모델 번호를 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            variant={"main"}
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
