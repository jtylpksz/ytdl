'use client';

import { useFormStatus } from 'react-dom';

import { getDownloadList } from '@/actions/getDownloadList';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ReloadIcon } from '@radix-ui/react-icons';

export const Form = () => {
  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <>
        {pending ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Get Video</Button>
        )}
      </>
    );
  };

  return (
    <form action={getDownloadList} className="flex flex-col items-end gap-2">
      <Label className="w-full mt-4 flex flex-col gap-1">
        <span>Type here your URL</span>
        <Input
          type="url"
          name="url"
          placeholder="https://www.youtube.com/watch?v="
          className="mt-1 mb-3"
          required
        />
        <SubmitButton />
      </Label>
    </form>
  );
};
