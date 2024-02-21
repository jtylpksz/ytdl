'use server';

import { redirect } from 'next/navigation';

export const getDownloadList = async (formData: FormData) => {
  const urlInput = formData.get('url') as string;

  // parse urlInput and get id
  const id = urlInput?.split('v=')?.[1];
  redirect(`/download?id=${id}`);
};
