import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { APIResponse } from '@/types';

export const metadata: Metadata = {
  title: 'Download Video',
  robots: {
    index: false,
    follow: false,
  },
};

const getFormatList = async (id: string) => {
  const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY ?? '',
      'X-RapidAPI-Host': process.env.API_HOST ?? '',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

export default async function Download({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const video: APIResponse = await getFormatList(searchParams.id);

  if (video.error) {
    return (
      <main className="max-w-86 m-auto p-8">
        <h1 className="text-3xl font-bold">Video not found</h1>
        <p className="opacity-80 mb-2">
          Something went wrong, please try again later
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        >
          Go back
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-86 m-auto p-8">
      <section className="flex gap-2 justify-between mb-6">
        <Image
          src={video.thumbnail[0].url}
          width={video.thumbnail[0].width}
          height={video.thumbnail[0].height}
          className="rounded w-1/2 object-cover"
          alt={video.title}
        />
        <div>
          <h2 className="text-3xl font-bold">{video.title}</h2>
          <p>{video.description}</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        {video.formats.map((format) => (
          <Card key={format.itag} className="flex justify-between items-center">
            <CardHeader className="p-4 px-6">
              <h3 className="font-bold text-2xl">{format.qualityLabel}</h3>
            </CardHeader>

            <CardContent className="p-0 px-6">
              <a
                href={format.url}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                Download
              </a>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
