"use client";

import * as z from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import axios from "axios";

import toast from "react-hot-toast";

import { Storage } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StorageOptions } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(2, { message: "스토리지를 선택해 주세요" }),
});

type StorageFormValue = z.infer<typeof formSchema>;

interface StorageFormProps {
  initialData: Storage | null;
}

export const StorageForm: React.FC<StorageFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "스토리지 수정" : "스토리지 생성";
  const description = initialData
    ? "스토리지 수정해 보세요"
    : "새 스토리지를 생성해 보세요";
  const toastMessage = initialData
    ? "스토리지를 업데이트 하였습니다."
    : "스토리지를 생성 하였습니다.";
  const action = initialData ? "수정" : "생성";

  const form = useForm<StorageFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: StorageFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/storages/${params.storageId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/storages`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/storages`);
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
      await axios.delete(`/api/${params.storeId}/storages/${params.storageId}`);
      router.refresh();
      router.push(`/${params.storeId}/storages`);
      toast.success("스토리지가 삭제 되었습니다.");
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
                  <FormLabel>스토리지 용량</FormLabel>

                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="스토리지를 선택하세요"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {StorageOptions.map((storage) => (
                        <SelectItem key={storage.value} value={storage.value}>
                          {storage.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
