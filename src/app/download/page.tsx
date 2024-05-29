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
      <main className="max-w-3xl m-auto p-8 text-center min-h-screen">
        <h1 className="text-center text-3xl text-balance leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mb-3">
          Video not found
        </h1>
        <p className="opacity-80 mb-4">
          Something went wrong, please try again later
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold shadow whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Go back
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl m-auto p-8">
      <section className="flex flex-col gap-4 justify-center items-center mb-6">
        <Image
          src={
            video.thumbnail[2].url ||
            video.thumbnail[1].url ||
            video.thumbnail[0].url
          }
          width={
            video.thumbnail[2].width ||
            video.thumbnail[1].width ||
            video.thumbnail[0].width
          }
          height={
            video.thumbnail[2].height ||
            video.thumbnail[1].height ||
            video.thumbnail[0].height
          }
          className="rounded w-1/2 object-cover"
          alt={video.title}
        />
        <div>
          <h2 className="text-2xl font-bold">{video.title}</h2>
          <small className="text-pretty">{video.description}</small>
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
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold shadow whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Download
              </a>
            </CardContent>
          </Card>
        ))}

        <details>
          <summary className="outline-none">
            View other formats (only video / only audio)
          </summary>

          <section className="flex flex-col gap-4">
            {video.adaptiveFormats.map((format) => (
              <Card
                key={format.itag}
                className="flex justify-between items-center"
              >
                <CardHeader className="p-4 px-6">
                  <h3 className="font-bold text-2xl">{format.qualityLabel}</h3>
                  {format.audioQuality ? <h3 className="font-bold text-2xl">{format.audioQuality}</h3> : null}
                  <small>{format.mimeType}</small>
                </CardHeader>

                <CardContent className="p-0 px-6">
                  <a
                    href={format.url}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold shadow whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                    download
                  >
                    Download
                  </a>
                </CardContent>
              </Card>
            ))}
          </section>
        </details>
      </section>
    </main>
  );
}
