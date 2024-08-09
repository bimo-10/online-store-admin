"use client";

import React, { useState } from "react";
import axios from "axios";
import Modal from "../ui/modal";
import { useStoreModal } from "~/hooks/use-store-modal-store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
});

export default function StoreModal() {
  const storeModal = useStoreModal();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/store", values);
      toast({
        title: "Success",
        description: "Store created successfully",
        className: "bg-green-600 text-white",
      });

      // window.location.assign(`/${response.data.id}`);
      redirect(`/${response.data.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create store",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Buat Store"
      description="Tambahkan store untuk membuat produk atau kategori"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="name toko"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
