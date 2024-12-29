"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface UserNameFormProps {
  onSubmit: (userName: string) => void;
}

export function UserNameForm({ onSubmit }: UserNameFormProps) {
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    onSubmit(name.trim());
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </div>
  );
}