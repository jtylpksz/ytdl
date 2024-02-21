import { Form } from '@/components/form';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <main className="max-w-3xl m-auto p-8">
      <nav className="flex justify-end">
        <ModeToggle />
      </nav>

      <h1 className="text-center text-3xl text-balance leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mb-3">
        YouTube Downloader
      </h1>

      <Form />
    </main>
  );
}
